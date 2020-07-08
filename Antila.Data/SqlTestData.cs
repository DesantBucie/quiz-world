using Antila.Core;
using Antila.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.Linq;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.WindowsRuntime;
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
        
        public SqlTestData(AntilaDbContext db)
        {
            this.db = db;
        }

        //Map data model to avoid exposing database's model
        public void MapModel()
        {

            //testModels = db.Tests.Select(s => new TestModel()
            //{
            //    Id = s.Id,
            //    Category = s.Category,
            //    Question = new QuestionModel()
            //    {
            //        Content = s.Question.Content,
            //        Answers = s.Question.Answers.Select(a => new AnswerModel()
            //        {
            //            Id = a.Id,
            //            Content = a.Content
            //        })
            //    }
            //}).ToList();
            throw new NotImplementedException();
        }

        //Return random set of tests from choosen category
        public IEnumerable<TestModel> GetTest(string category)
        {
            
            if (category != null)
            {
                //Delete "-" form URL address
                string normalised = Regex.Replace(category, @"\-", " ");

                //var shuffledTests = testModels.Where(t => t.Category.Equals(normalised, StringComparison.OrdinalIgnoreCase)).
                //OrderBy(a => rng.Next()).ToList();

                var tests = ModelMapping(normalised);

                tests.OrderBy(a => rng.Next());

                return tests;
                //return shuffledTests;
            }
            else
            {
                return ModelMapping();
            }
            
        }

        public Test AddTest(Test test)
        {
            db.Tests.Add(test);
            db.SaveChanges();
            return test;
        }

        private IEnumerable<TestModel> ModelMapping(string normalised = null)
        {
            var shuffled = db.Tests.Select(t => new TestModel()
            {
                Id = t.Id,
                Category = t.Category,
                Question = new QuestionModel()
                {
                    Content = t.Question.Content,
                    Answers = t.Question.Answers.Select(a => new AnswerModel()
                    {
                        Id = a.Id,
                        Content = a.Content
                    })
                }
            });

            if (normalised != null)
            {
                return shuffled.Where(t => t.Category.Equals(normalised)).ToList();
            }

            return shuffled.ToList();
        }
    }
}
