using Antila.Data;
using Antila.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Antila.AnswerService
{
    public class AnswerService : IAnswerService
    {
        private readonly AntilaDbContext db;
        private static int PointCount;
        private static int QuestionCount;
        private List<int> points;

        public AnswerService(AntilaDbContext db)
        {
            this.db = db;
        }

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
