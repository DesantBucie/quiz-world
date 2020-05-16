using Antila.Core;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.X509Certificates;
using System.Text;

namespace Antila.Data
{
    public class InMemoryTestData : ITestData
    {
        private int PointCount;
        private int QuestionCount;
        private readonly static Random rng = new Random();
        private readonly List<Test> tests;
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
                },
                new Test
                {
                    Id = 3, Category = "Społeczeństwo",
                    Question = new Question
                    {
                        Content = "Jakei są efekty uboczne 5G?",
                        CorrectId = GenerateSaltedHash(32, "1"), Answers = new List<Answer>
                        {
                            new Answer { Id = 0, Content = "Śmierć" },
                            new Answer { Id = 1, Content = "Wysypka na twarzy" },
                            new Answer { Id = 2, Content = "COVID-19" },
                            new Answer { Id = 3, Content = "Nie ma takich" }
                        }
                    }
                },
                 new Test
                {
                    Id = 4, Category = "Szkoła",
                    Question = new Question
                    {
                        Content = "Wymień częstochowską szkołę, w której brakuje drzwi w toalecie",
                        CorrectId = GenerateSaltedHash(32, "3"), Answers = new List<Answer>
                        {
                            new Answer { Id = 0, Content = "Norwid" },
                            new Answer { Id = 1, Content = "Sienkiewicz" },
                            new Answer { Id = 2, Content = "Traugutt" },
                            new Answer { Id = 3, Content = "TZN" }
                        }
                    }
                }
            };
            for (int i = 0; i < tests.Count; i++)
            {
                QuestionCount++;
            }
        }

        //Dostań losowy test
        public IEnumerable<Test> GetTest()
        {
            //Random random = new Random();
            //int randomId;

            //if (tests.Count !=0)
            //{
            //    randomId = random.Next(tests.Count);
            //    var randomElement = from t in tests
            //                        where t.Id.Equals(randomId)
            //                        select t;
            //    tests.RemoveAt(randomId);
            //    return randomElement;
            //}
            var shuffledTests = tests.OrderBy(a => rng.Next()).ToList();
            return shuffledTests;
        }

        //Dodaj test
        public bool CheckAnswer(int testId, int answerId)
        {
            
            List<string> hashsalt = tests.Where(t => t.Id.Equals(testId))
                                         .Select(t => new List<string> { t.Question.CorrectId.Hash, t.Question.CorrectId.Salt })
                                         .SingleOrDefault();

            bool isAnswerMatched = VerifyPassword(answerId.ToString(), hashsalt[0], hashsalt[1]);
            
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

        public void CalculateNumberOfPoints(int testId, int answerId)
        {
            if (CheckAnswer(testId, answerId))
                PointCount++;
        }

        public int PointsCount()
        {
            return PointCount;
        }
        
        public int QuestionsCount()
        {
            return QuestionCount;
        }

        public void ErasePointsCount()
        {
            PointCount = 0;
            QuestionCount = 0;
        }
    }
}
