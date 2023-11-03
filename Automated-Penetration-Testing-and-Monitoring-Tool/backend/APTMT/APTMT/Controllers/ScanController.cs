using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace APTMT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScanController : ControllerBase
    {
        private SimplePointAndClickScanner _scanner;

        public ScanController(SimplePointAndClickScanner scanner)
        {
            _scanner = scanner;
        }

        [HttpGet]
        [Produces("application/json")]
        public IActionResult Scan([FromQuery] string target)
        {
            return Ok(_scanner.GetScanJsonResults(target));
        }
    }
}
