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
using AntilaWebApp.Filters;
using Microsoft.AspNetCore.Authorization;

namespace AntilaWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]

   // [HandleException] czy to coś robi? 
    public class TestController : ControllerBase
    {
        private readonly ITestData _testData;
        private readonly IAnswerService _answerService;
        private readonly ILogger<TestController> _logger;

        public IEnumerable<TestModel> Test { get; set; }

        public TestController(ITestData testData, IAnswerService answerService, 
            ILogger<TestController> logger)
        {
            this._testData = testData;
            this._answerService = answerService;
            this._logger = logger;
        }

        [HttpGet("{category?}")]
        public IEnumerable<TestModel> GetTests([FromRoute] string category)
        {
            Test = _testData.GetTest(category);

            _answerService.ResetCount();
            _answerService.QuestionsCount(Test.ToList());

            if(Test == null)
            {
                _logger.LogWarning("Couldn't load any tests.");
            }
            else
            {
                _logger.LogInformation("Loaded {TestCount} tests.", Test.Count());
            }  

            return Test;
        }

        //?????? Care
        [HttpPost]
        public IActionResult PostTests(Test test)
        {
            _answerService.CalculateNumberOfPoints(test.Id,
                                        test.Question.Answers.Select(x => x.Id).FirstOrDefault());
            return Ok();
        }

        [HttpGet("summary")]
        public List<int> GetSummary()
        { 
            return _answerService.PointsCount();
        }

        [Authorize]
        [HttpPost("AddTest")]
        public IActionResult PostTest(Test test)
        {
            _testData.AddTest(test);

            return Ok();
        }

    }
}