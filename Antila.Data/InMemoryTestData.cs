using Antila.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Antila.Data
{
    public class InMemoryTestData : ITestData
    {
        private readonly List<Test> tests;
        private readonly HashSalt hashSalt;
        
        //Hardcodowane testy
        public InMemoryTestData()
        {
            tests = new List<Test>()
            {
                new Test
                {
                    Id = 0, Category = "Fakty Autentyczne",
                    Question = new Question
                    {
                        Content = "Wskaż samolot najczęściej używany do zrzutu chemitrails",
                        CorrectId = GenerateSaltedHash(32, "1"), Answers = new List<Answer>
                        {
                            new Answer { Id = 0, Content = "Boeing 737" },
                            new Answer { Id = 1, Content = "Airbus 380" },
                            new Answer { Id = 2, Content = "Tu-154" },
                            new Answer { Id = 3, Content = "DC-9" }
                        }
                    }
                },
                new Test
                {
                    Id = 1, Category = "Kinematografia",
                    Question = new Question
                    {
                        Content = "Jak nazywa się postać w którą wciela się Harrison Ford w 'Łowcy Androidów'?",
                        CorrectId = GenerateSaltedHash(32, "1"), Answers = new List<Answer>
                        {
                            new Answer { Id = 0, Content = "Rick" },
                            new Answer { Id = 1, Content = "Deckard" },
                            new Answer { Id = 2, Content = "Jest" },
                            new Answer { Id = 3, Content = "Replikantem" }
                        }
                    }
                },
                new Test
                {
                    Id = 2, Category = "Społeczeństwo",
                    Question = new Question
                    {
                        Content = "Czy rzeczywiście jest choroba wywoływana przez COVID-19?",
                        CorrectId = GenerateSaltedHash(32, "1"), Answers = new List<Answer>
                        {
                            new Answer { Id = 0, Content = "Zwykłą grypą" },
                            new Answer { Id = 1, Content = "Groźną chorobą" },
                            new Answer { Id = 2, Content = "Efektem ubocznym chemitrails" },
                            new Answer { Id = 3, Content = "Atakiem USA na gospodarkę Chin" }
                        }
                    }
                }
            };

        }

        //Dostań losowy test
        public IEnumerable<Test> GetTest()
        {
            var random = new Random();
            int id = random.Next(tests.Count);

            var test = from t in tests
                       where t.Id.Equals(id)
                       select t;

            return test;
        }

        public bool CheckAnswer(int testId, int answerId)
        {
            //Troche nie efektywna metoda
            var hash = from q in tests
                           where q.Id.Equals(testId)
                           select q.Question.CorrectId.Hash;
            var salt = from q in tests
                       where q.Id.Equals(testId)
                       select q.Question.CorrectId.Salt;

            bool isAnswerMatched = VerifyPassword(answerId.ToString(), hash.FirstOrDefault(), salt.FirstOrDefault());

            return isAnswerMatched;
           
        }
        //Haszowanie
        public HashSalt GenerateSaltedHash(int size, string password)
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

        public bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000);
            return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256)) == storedHash;
        }
       
       

    }
}
