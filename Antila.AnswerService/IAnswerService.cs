using Antila.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Antila.AnswerService
{
    public interface IAnswerService
    {
        bool CheckAnswer(int testId, int answerId);
        void CalculateNumberOfPoints(int testId, int answerId);
        List<int> PointsCount();
        void QuestionsCount(List<TestModel> testModels);
        void ResetCount();
    }
}
