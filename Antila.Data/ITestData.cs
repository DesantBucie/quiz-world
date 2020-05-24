using Antila.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Antila.Data
{
    public interface ITestData
    {
        Task<IEnumerable<Test>> GetTest();
        bool CheckAnswer(int testId, int answerId);
        HashSalt GenerateSaltedHash(int size, string password);
        bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt);
        void CalculateNumberOfPoints(int testId, int answerId);
        int PointsCount();
        int QuestionsCount();
        void ErasePointsCount();


    }
}
