using Antila.Core;
using Antila.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Antila.Data
{
    public class SqlTestData : ITestData
    {
        private readonly AntilaDbContext db;
        private readonly static Random rng = new Random();
        private List<TestModel> testModels;
        
        public SqlTestData(AntilaDbContext db)
        {
            this.db = db;
        }

        //Map data model to avoid exposing database's model
        public void MapModel()
        {
            
            testModels = db.Tests.Select(s => new TestModel()
            {
                Id = s.Id,
                Category = s.Category,
                Question = new QuestionModel()
                {
                    Content = s.Question.Content,
                    Answers = s.Question.Answers.Select(a => new AnswerModel()
                    {
                        Id = a.Id,
                        Content = a.Content
                    })
                }
            }).ToList();
        }

        //Return random set of tests from choosen category
        public IEnumerable<TestModel> GetTest(string category)
        {
            
            if (category != null)
            {
                //Delete "-" form URL address
                string normalised = Regex.Replace(category, @"\-", " ");

                var shuffledTests = testModels.Where(t => t.Category.Equals(normalised, StringComparison.OrdinalIgnoreCase)).
                OrderBy(a => rng.Next()).ToList();
                return shuffledTests;
            }
            else
            {
                var shuffledTests = testModels.OrderBy(a => rng.Next()).ToList();
                return shuffledTests;
            }
            
        }

        public Test AddTest(Test test)
        {
            db.Tests.Add(test);
            db.SaveChanges();
            return test;
        }

    }
}
