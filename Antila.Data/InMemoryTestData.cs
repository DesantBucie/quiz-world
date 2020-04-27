using Antila.Core;
using System;
using System.Collections.Generic;
using System.Text;

namespace Antila.Data
{
    public class InMemoryTestData
    {
        readonly List<Test> tests;

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
                        CorrectId = 3, Answers = new List<Answer>
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
    }
}
