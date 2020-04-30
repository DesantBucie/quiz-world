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
    [Produces("application/json")]
    public class TestController : ControllerBase
    {
        private readonly InMemoryTestData _inMemoryTestData;

        public TestController(InMemoryTestData inMemoryTestData)
        {
            _inMemoryTestData = inMemoryTestData;
        }
        [HttpGet]
        public IEnumerable<Test> GetTests()
        {
            return _inMemoryTestData.tests;
        }

    }
}