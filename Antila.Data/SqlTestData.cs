using Antila.Core;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Antila.Data
{
    public class SqlTestData : ITestData
    {
        private int PointCount;
        private int QuestionCount;
        private readonly AntilaDbContext db;
        private readonly static Random rng = new Random();

        public SqlTestData(AntilaDbContext db)
        {
            this.db = db;

            for (int i = 0; i < db.Tests.Count(); i++)
            {
                QuestionCount++;
            }
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

        public void ErasePointsCount()
        {
            PointCount = 0;
        }

        public HashSalt GenerateSaltedHash(int size, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Test>> GetTest()
        {
            var shuffledTests = await db.Tests.Include(shuffledTests => shuffledTests.Question)
                                        .Include(shuffledTests => shuffledTests.Question.Answers)
                                        .ToListAsync();

            return shuffledTests;
        }

        public int PointsCount()
        {
            return PointCount;
        }

        public int QuestionsCount()
        {
            return QuestionCount;
        }

        public bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            throw new NotImplementedException();
        }
    }
}
