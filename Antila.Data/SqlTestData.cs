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
        private static int PointCount;
        private static int QuestionCount;
        private List<int> points;
        
        public SqlTestData(AntilaDbContext db)
        {
            this.db = db;
        }

        //Mapowanie danych z bazy danych do modelu danych w celu uniknięcia obnażenia
        //prawidłowej odpowiedzi na pytanie podczas HTTP GET
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

        //Zwróc losowy zestaw testów lub zestaw testów z danej kategorii 
        public IEnumerable<TestModel> GetTest(string category)
        {
            
            if (category != null)
            {
                //Usuń "-" z adresu url
                string normalised = Regex.Replace(category, @"\-", " ");

                var shuffledTests = testModels.Where(t => t.Category.Equals(normalised, StringComparison.OrdinalIgnoreCase)).
                OrderBy(a => rng.Next()).ToList();
                QuestionsCount(shuffledTests);

                return shuffledTests;
            }
            else
            {
                var shuffledTests = testModels.OrderBy(a => rng.Next()).ToList();
                QuestionsCount(shuffledTests);
                return shuffledTests;
            }
            
        }

        public Test AddTest(Test test)
        {
            db.Tests.Add(test);
            db.SaveChanges();
            return test;
        }

        //Trzeba to przenieść do innej klasy 
        public List<int> PointsCount()
        {
            points = new List<int>
            {
                PointCount,
                QuestionCount - PointCount
            };
            return points;
        }

        public void QuestionsCount(List<TestModel> testModels)
        {
            QuestionCount = testModels.Count();
        }

        public void ResetCount()
        {
            PointCount = 0;
            QuestionCount = 0;
        }

        public void CalculateNumberOfPoints(int testId, int answerId)
        {
            if (CheckAnswer(testId, answerId))
                PointCount++;
        }

        public bool CheckAnswer(int testId, int answerId)
        {
            var correctId = db.Tests.Where(t => t.Id.Equals(testId))
                                        .Select(t => t.Question.Answers.Where(a => a.Id == answerId)
                                        .Select(a => a.IsCorrect))
                                        .SingleOrDefault();

            return correctId.SingleOrDefault();
        }
    }
}
