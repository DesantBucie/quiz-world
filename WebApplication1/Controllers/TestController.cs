using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Antila.AnswerService;
using Antila.Core;
using Antila.Data;
using Antila.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TestController : ControllerBase
    {
        private readonly ITestData testData;
        private readonly IAnswerService answerService;

        public IEnumerable<TestModel> Test { get; set; }

        public TestController(ITestData testData, IAnswerService answerService)
        {
            this.testData = testData;
            this.answerService = answerService;
        }

        [HttpGet("{category?}")]
        public IEnumerable<TestModel> GetTests([FromRoute] string category)
        {
            //testData.MapModel();
            Test = testData.GetTest(category);

            answerService.ResetCount();
            answerService.QuestionsCount(Test.ToList());

            return Test;
        }

        //?????? Care
        [HttpPost]
        public IActionResult PostTests(Test test)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            
            answerService.CalculateNumberOfPoints(test.Id,
                                        test.Question.Answers.Select(x => x.Id).FirstOrDefault());
            return Ok();
        }

        [HttpGet("summary")]
        public List<int> GetSummary()
        { 
            return answerService.PointsCount();
        }

        [HttpPost("AddTest")]
        public void PostTest(Test test)
        {
             testData.AddTest(test);
        }

    }
}