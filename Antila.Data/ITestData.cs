using Antila.Core;
using Antila.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Antila.Data
{
    public interface ITestData
    {
        IEnumerable<TestModel> GetTest();
        bool CheckAnswer(int testId, int answerId);
        void CalculateNumberOfPoints(int testId, int answerId);
        int PointsCount();
        int QuestionsCount();
        void MapModel();


    }
}
