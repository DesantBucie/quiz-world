﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Antila.Core;
using Antila.Data;
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
        public IEnumerable<Test> Test { get; set; }

        public TestController(ITestData testData)
        {
            this.testData = testData;
        }

        [HttpGet]
        public IEnumerable<Test> GetTests()
        {
            return Test = testData.GetTest();
        }

        [HttpPost]
        public bool PostTests([FromBody] Test test)
        {

            if (testData.CheckAnswer(test.Id, test.Question.Answers.Select(x => x.Id).FirstOrDefault()))
            {
                return true;
            }
            else
                return false;
        }

        [HttpGet("summary")]
        public string GetSummary()
        {
            string i = "In Poland we don't say 'We don't need your name'. We Say 'nie pytaja cię o imię'";
                        
            return i;
        }
    }
}