using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Antila.Core;
using Antila.Data;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        //private readonly InMemoryTestData _inMemoryTestData;

        //public TestController(InMemoryTestData inMemoryTestData)
        //{
        //    _inMemoryTestData = inMemoryTestData;
        //}
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Everyting is Good");
        }
    }
}