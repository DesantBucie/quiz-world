using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using Antila.Core;
using Antila.Data;
using Antila.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TestController : ControllerBase
    {
        private readonly ITestData testData;
      
        public IEnumerable<TestModel> Test { get; set; }

        public TestController(ITestData testData)
        {
            this.testData = testData;
        }

        [HttpGet("{category?}")]
        public IEnumerable<TestModel> GetTests([FromRoute] string category)
        {
            testData.MapModel();
            return Test = testData.GetTest(category);
        }

        [HttpPost]
        public void PostTests( Test test)
        {
            testData.CalculateNumberOfPoints(test.Id,
                                        test.Question.Answers.Select(x => x.Id).FirstOrDefault());
        }

        [HttpGet("summary")]
        public List<int> GetSummary()
        { 
            var pointsCount = testData.PointsCount();
            return pointsCount;
        }

        [HttpPost("category")]
        public void Category(string category)
        {
            string s = category;
        }
    }
}