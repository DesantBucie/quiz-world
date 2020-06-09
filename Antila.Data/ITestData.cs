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
        IEnumerable<TestModel> GetTest(string category);
        bool CheckAnswer(int testId, int answerId);
        void CalculateNumberOfPoints(int testId, int answerId);
        List<int> PointsCount();
        void QuestionsCount(List<TestModel> testModels);
        void MapModel();
        void ResetCount();

    }
}
