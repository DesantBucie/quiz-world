using Antila.Core;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Antila.Data
{
    public class InMemoryTestData
    {
        public readonly List<Test> tests;

        public InMemoryTestData()
        {
            tests = new List<Test>()
            {
                new Test
                {
                    Id = 0, Category = "Fakty Autentyczne",
                    Question = new Question
                    {
                        Content = "Wskaż samolot najczęsciej używany do zrzutu chemitrails",
                        CorrectId = GenerateSaltedHash(32, "1"), Answers = new List<Answer>
                        {
                            new Answer { Id = 0, Content = "Boeing 737" },
                            new Answer { Id = 1, Content = "Airbus 380" },
                            new Answer { Id = 2, Content = "Tu-154" },
                            new Answer { Id = 3, Content = "DC-9" }
                        }
                    }
                }
            };
        }

        public static HashSalt GenerateSaltedHash(int size, string password)
        {
            var saltBytes = new byte[size];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);

            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10000);
            var hashPassword = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            HashSalt hashSalt = new HashSalt { Hash = hashPassword, Salt = salt };
            return hashSalt;
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000);
            return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256)) == storedHash;
        }
    }
}
