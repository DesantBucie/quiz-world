using Antila.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Antila.Data
{
    public interface ITestData
    {
        IEnumerable<Test> GetTest();
        HashSalt GenerateSaltedHash(int size, string password);
        bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt);
    }
}
