import React from 'react';
// import { Component } from 'react';
import HomeToScanBtn from './components/HomeToScanBtn';
import PieGraph from './components/PieGraph';
import AlertAccordion from './components/AlertAccordion';
import BarGraph from './components/BarGraph';

//initializing the array of vulnerability names 
const vulnerabilityNames = [];

const Site = ({ sites, riskNums, vName, vCount, alrtDta }) =>( 
    <div>
        <div className='card-title'>{sites}</div>
        <div><PieGraph riskArray={riskNums}/></div>
        <div><BarGraph vNameArray={vName} vCountArray={vCount}/></div>
        <div><AlertAccordion alertData={alrtDta}/></div>
    </div>
)

export default class Resultstest extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
            error: null,
            scanning: true,
            data: []

        };
    }

    async componentDidMount(){
        const backendBaseURL = "http://localhost:5000/api";
       var inputURL = localStorage.getItem('input');

        await fetch( `${backendBaseURL}/Scan?target=${inputURL}`)
            .then( response => response.json())
            .then( (result) => {
                this.setState({
                    scanning: false,
                    data: [result], 
                })     
            },
              
            (error) => {
                this.setState({
                    scanning: false,
                    error
                })
            },
        )
    }
    
    displayResults({item}){
        const siteList=[];

        var urlNames = "";
        urlNames = this.displayScannedSites({item});

        const rskNm = this.getRiskArray({item});

        //I need an array of counts for those vulnerability names
        var siteCount = item.site.length;
        const vulnCounts = this.getVulnerabilityCount({item}, siteCount );
        
        //I need an array of the actaul vulnerability names 
        const vulnNames = vulnerabilityNames;

        const alertAccordionData = this.getAlertAccordionData({item});

        siteList.push(<Site sites={urlNames} riskNums={rskNm} vName={vulnNames} vCount={vulnCounts} alrtDta={alertAccordionData}/>);        
        return siteList;
    }

    //this function puts all the site names into an array called "urlNames" and returns the array.
    displayScannedSites({item}) {
        let siteCount = item.site.length;
        let urlNames = "Scanned: ";
        if(siteCount == 1) {
            urlNames += item.site[0]['@name'];
        }
        else if(siteCount > 1) {
            for( let i = 0; i < siteCount; i++ ){

                if((i+1) == siteCount) {
                    urlNames += item.site[i]['@name'];
                }
                else {
                    urlNames += item.site[i]['@name'] + ", ";
                }
            }
        }
        //case for no sites
        return urlNames;
    }

    getAlertCount({item}, siteCount, riskCode, alertCount) {
        for(var k = 0; k < siteCount; k++) {
            //if the OWASP ZAP JSON report is populated with alerts in the kth index of site:
            if(item.site[k].alerts) {
                for(var i = 0; i < item.site[k].alerts.length; i++) {
                    if(item.site[k].alerts[i].riskcode == riskCode) {
                        alertCount++;
                    }
                }
            }
        }
        return alertCount;
    }

    getRiskArray({item}) {
        const risks = [];
        var i = 0;
        var r = 3;
        while(i < 4) {
            risks[i] = this.getAlertCount({item}, item.site.length, r, 0);
            r--;
            i++;
        }
        return risks;
    }

    setVulnerabilityNames({item}, siteIndex, alertIndex, arrCountIndex ){
        vulnerabilityNames[arrCountIndex] = item.site[siteIndex].alerts[alertIndex].name;       
    }
 
    getVulnerabilityCount({item}, siteCount) {
       const arrCount = []; //limiting to 5 entries (for now) we can change this later if we want to 
        var counter = 0;


        var vulnerabilityCount = 0;
        var smallestVal = 0;
        var smallestValIndex = 0;

        for( var k = 0; k < siteCount; k++ ){
            if(item.site[k].alerts){
                
                for(var i = 0; i < item.site[k].alerts.length; i++) {
                
                   var stringCount = item.site[k].alerts[i].count;
                   //converting the string to a number
                   vulnerabilityCount = parseInt(stringCount);
                
                   //if the array is full then we compare entries 
                   if( counter > 4 ){
                 //we want to find the smallest value in the array
                   for( var j = 1; j < arrCount.length; i++ ){
                    //init the smallest to first element
                     smallestVal = arrCount[0];
                     smallestValIndex = 0;
                     //if smallest is > than current arr value
                    if( smallestVal > arrCount[j] ){
                        //replace
                        smallestVal = arrCount[j];
                        smallestValIndex = j;
                    }
                } 
                //if the current vulnerability count occurs more than array entry
                if( vulnerabilityCount > arrCount[smallestValIndex]){
                    //replace
                    arrCount[smallestValIndex] = vulnerabilityCount;
                    //set the name
                    this.setVulnerabilityNames({item}, k, i, smallestValIndex );
                } 

                //if the array is not full then we just store it right away
            } else{
                   arrCount[counter] = vulnerabilityCount;
                   this.setVulnerabilityNames({item}, k, i, counter );
                   counter++;
                
                }
          
               }

            }
        } 

        return arrCount;
       
    }  

    getAlertAccordionData({item}) {
        //const data = [{name: "alert 1", desc: "desc 1", soln: "soln 1"}, 
        //{name: "alert 2", desc: "desc 2", soln: "soln 2"}, 
        //{name: "alert 3", desc: "desc 3", soln: "soln 3"}, 
        //{name: "alert 4", desc: "desc 4", soln: "soln 4"}];
        const data = [];
        var riskCode = 3;
        var dataIndex = 0;

        var nme = "";
        var dsc = "";
        var sln = "";
        var clr = "";
        var rsk = 0;

        while(riskCode >= 0) {
            for(var k = 0; k < item.site.length; k++) {
                //if the OWASP ZAP JSON report is populated with alerts in the kth index of site:
                if(item.site[k].alerts) {
                    for(var i = 0; i < item.site[k].alerts.length; i++) {
                        if(item.site[k].alerts[i].riskcode == riskCode) {

                            if(riskCode == 3) {
                                nme = "High Risk: " + item.site[k].alerts[i].name;
                                clr = "acc-high-toggle";
                            }
                            else if(riskCode == 2) {
                                nme = "Medium Risk: " + item.site[k].alerts[i].name;
                                clr = "acc-med-toggle";
                            }
                            else if (riskCode == 1) {
                                nme = "Low Risk: " + item.site[k].alerts[i].name;
                                clr = "acc-low-toggle";
                            }
                            else if(riskCode == 0) {
                                nme = "Informational: " + item.site[k].alerts[i].name;
                                clr = "acc-info-toggle";
                            }

                            dsc = item.site[k].alerts[i].desc.replace(/(<([^>]+)>)/gi, "");
                            sln = item.site[k].alerts[i].solution.replace(/(<([^>]+)>)/gi, "");
    
                            data[dataIndex] = {name: nme, desc: dsc, soln: sln, color: clr};
                            dataIndex++;
                        }
                    }
                }
            }
            riskCode--;
        }
        
        return data;
    }

    render(){        
        var {  scanning, data, error } = this.state;
        if( scanning ){
            return <div> <h1>
            Scanning...
            </h1> </div>;
        } else if ( error ){
            return <div> <h1>
            Results Not Found! Please Return to the Scan Page.    
            </h1>  <HomeToScanBtn/> </div>
        } 
        /*
        we'll handle the case if there is something wrong with the data here too
        if( !data ){
            then something ...
        }
        */
       const items = this.state.data;
        return ( 
            <div>
                <h1>Result Summary</h1>
                {items.map(item => (
                    <span>
                        {this.displayResults({item})}
                    </span> 
                ))}
            </div>
        );
    }
}