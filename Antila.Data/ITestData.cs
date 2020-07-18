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
        Test AddTest(Test test);
    }
}
