using Newtonsoft.Json;
using OWASPZAPDotNetAPI;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;

namespace APTMT
{
    public class SimplePointAndClickScanner
    {
        private static string _target = "";
        private static ClientApi _api = new ClientApi("host.docker.internal", 8080, "");
        private static IApiResponse _apiResponse;

        public dynamic GetScanJsonResults(string target)
        {
            _target = target;
            return SimplePointAndClickScan();
        }

        public dynamic SimplePointAndClickScan()
        {
            CheckIfZAPHasStartedByPollingTheAPI(1);
            LoadTargetUrlToSitesTree();
            string spiderScanId = StartSpidering();
            PollTheSpiderTillCompletion(spiderScanId);

            StartAjaxSpidering();
            PollTheAjaxSpiderTillCompletion();

            string activeScanId = StartActiveScanning();
            PollTheActiveScannerTillCompletion(activeScanId);

            PrintAlertsToConsole();

            string s = Encoding.ASCII.GetString(_api.core.jsonreport());
            dynamic dynamicObject = JsonConvert.DeserializeObject<dynamic>(s);

            return dynamicObject;
            //ShutdownZAP();
        }

        private static string StartSpidering()
        {
            Console.WriteLine("Spider: " + _target);
            _apiResponse = _api.spider.scan(_target, "", "", "", "");
            string scanid = ((ApiResponseElement)_apiResponse).Value;
            return scanid;
        }

        private static void PollTheSpiderTillCompletion(string scanid)
        {
            int spiderProgress;
            while (true)
            {
                Sleep(1000);
                spiderProgress = int.Parse(((ApiResponseElement)_api.spider.status(scanid)).Value);
                Console.WriteLine("Spider progress: {0}%", spiderProgress);
                if (spiderProgress >= 100)
                    break;
            }

            Console.WriteLine("Spider complete");
            Sleep(10000);
        }

        private static void StartAjaxSpidering()
        {
            Console.WriteLine("Ajax Spider: " + _target);
            _apiResponse = _api.ajaxspider.scan(_target, "", "", "");

            if ("OK" == ((ApiResponseElement)_apiResponse).Value)
                Console.WriteLine("Ajax Spider started for " + _target);
        }

        private static void Sleep(int milliseconds)
        {
            do
            {
                Thread.Sleep(milliseconds);
                Console.WriteLine("...zz" + Environment.NewLine);
                milliseconds = milliseconds - 2000;
            } while (milliseconds > 2000);
        }

        private static void PollTheAjaxSpiderTillCompletion()
        {
            while (true)
            {
                Sleep(1000);
                string ajaxSpiderStatusText = string.Empty;
                ajaxSpiderStatusText = Convert.ToString(((ApiResponseElement)_api.ajaxspider.status()).Value);
                if (ajaxSpiderStatusText.IndexOf("running", StringComparison.InvariantCultureIgnoreCase) > -1)
                    Console.WriteLine("Ajax Spider running");
                else
                    break;
            }

            Console.WriteLine("Ajax Spider complete");
            Sleep(10000);
        }

        private static string StartActiveScanning()
        {
            Console.WriteLine("Active Scanner: " + _target);
            _apiResponse = _api.ascan.scan(_target, "", "", "", "", "", "");

            string activeScanId = ((ApiResponseElement)_apiResponse).Value;
            return activeScanId;
        }

        private static void PollTheActiveScannerTillCompletion(string activeScanId)
        {
            int activeScannerprogress;
            while (true)
            {
                Sleep(5000);
                activeScannerprogress = int.Parse(((ApiResponseElement)_api.ascan.status(activeScanId)).Value);
                Console.WriteLine("Active scanner progress: {0}%", activeScannerprogress);
                if (activeScannerprogress >= 100)
                    break;
            }
            Console.WriteLine("Active scanner complete");
        }
        private static void WriteHtmlReport(string reportFileName)
        {
            File.WriteAllBytes(reportFileName + ".html", _api.core.htmlreport());
        }

        private static void PrintAlertsToConsole()
        {
            List<Alert> alerts = _api.GetAlerts(_target, 0, 0, string.Empty);
            foreach (var alert in alerts)
            {
                Console.WriteLine(alert.AlertMessage
                    + Environment.NewLine
                    + alert.CWEId
                    + Environment.NewLine
                    + alert.Url
                    + Environment.NewLine
                    + alert.WASCId
                    + Environment.NewLine
                    + alert.Evidence
                    + Environment.NewLine
                    + alert.Parameter
                    + Environment.NewLine
                );
            }
        }

        private static void LoadTargetUrlToSitesTree()
        {
            try
            {
                _api.AccessUrl(_target);
            }
            catch (WebException e)
            {
                if (e.Status == WebExceptionStatus.ProtocolError)
                {
                    WebResponse resp = e.Response;
                    using (StreamReader sr = new StreamReader(resp.GetResponseStream()))
                    {
                        Console.WriteLine(sr.ReadToEnd());
                    }
                }
            }
        }

        public static void CheckIfZAPHasStartedByPollingTheAPI(int minutesToWait)
        {
            WebClient webClient = new WebClient();
            Stopwatch watch = new Stopwatch();
            watch.Start();
            int millisecondsToWait = minutesToWait * 60 * 1000;
            string zapUrlToDownload = "http://host.docker.internal:8080";

            while (millisecondsToWait > watch.ElapsedMilliseconds)
            {
                try
                {
                    Console.WriteLine("Trying to check if ZAP has started by accessing the ZAP API at {0}", zapUrlToDownload);
                    string responseString = webClient.DownloadString(zapUrlToDownload);
                    Console.WriteLine(Environment.NewLine + responseString + Environment.NewLine);
                    Console.WriteLine("Obtained a response from the ZAP API at {0} {1}Hence assuming that ZAP started successfully", zapUrlToDownload, Environment.NewLine);
                    return;
                }
                catch (WebException webException)
                {
                    Console.WriteLine("Seems like ZAP did not start yet");
                    Console.WriteLine(webException.Message + Environment.NewLine);
                    Console.WriteLine("Sleeping for 2 seconds");
                    Thread.Sleep(2000);
                }
            }

            throw new Exception(string.Format("Waited for {0} minute(s), however could not access the API successfully, hence could not verify if ZAP started successfully or not", minutesToWait));
        }

    }
}
