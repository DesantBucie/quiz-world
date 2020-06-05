using Antila.Core;
using Antila.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Antila.Data
{
    public class SqlTestData : ITestData
    {
        private static int PointCount;
        private readonly AntilaDbContext db;
        private readonly static Random rng = new Random();
        private List<TestModel> testModels;
        private List<int> points;

        public SqlTestData(AntilaDbContext db)
        {
            this.db = db;
        }
        public void CalculateNumberOfPoints(int testId, int answerId)
        {

            if (CheckAnswer(testId, answerId))
                PointCount++;
                
        }

        public bool CheckAnswer(int testId, int answerId)
        {
            var correctId = db.Tests.Where(t => t.Id.Equals(testId))
                                        .Select(t => t.Question.CorrectId)   
                                        .SingleOrDefault();

            bool isAnswerMatched = false;

            if (answerId.Equals(correctId))
                isAnswerMatched = true;

            return isAnswerMatched;
        }

        public IEnumerable<TestModel> GetTest()
        {
            var shuffledTests = testModels.OrderBy(a => rng.Next()).ToList();
            //await db.Tests.Include(shuffledTests => shuffledTests.Question)
            //                            .Include(shuffledTests => shuffledTests.Question.Answers)
            //                            .ToListAsync();

            return shuffledTests;
        }

        public List<int> PointsCount()
        {
            points = new List<int>();
            points[0] = PointCount;
            points[1] = QuestionsCount() - PointCount;
            return points;
        }

        public int QuestionsCount()
        {
            int questionCount = 0;

            for (int i = 0; i < db.Tests.Count(); i++)
            {
                questionCount++;
            }

            return questionCount;
        }

        public void MapModel()
        {
            //Mapowanie danych z bazy danych do modelu danych
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

        public void ResetCount()
        {
            PointCount = 0;
        }
    }
}
