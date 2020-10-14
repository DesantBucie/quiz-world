using Antila.AnswerService;
using Antila.Core;
using Antila.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Xunit;

namespace XUnitTests
{
    public class AnswerServiceUnitTest
    {
        [Fact]
        public void Test1()
        {
            var connection = new SqliteConnection("DataSource=:memory:");
            connection.Open();

            var options = new DbContextOptionsBuilder<AntilaDbContext>()
                .UseSqlite(connection)
                .Options;

            using (var context = new AntilaDbContext(options))
            {
                context.Database.EnsureCreated();

                context.Add(
                    new Test
                    {
                        Id = 2,
                        Category = "Kinematografia",
                        Question = new Question
                        {
                            Content = "Jak nazywa siê postaæ w któr¹ wciela siê Harrison Ford w '£owcy Androidów'?",
                            Answers = new List<Answer>
                            {
                                new Answer { Content = "Roy Batty", QuestionId = 2 },
                                new Answer { Content = "J.F. Sebastian", QuestionId = 2 },
                                new Answer { Content = "Bryant", QuestionId = 2 },
                                new Answer { Content = "Rick Deckard", QuestionId = 2, IsCorrect = true }
                            }
                        }
                    });
                context.SaveChanges();
                var service = new AnswerService(context);

                bool isCorrect = service.CheckAnswer(2, 8);

                Assert.True(isCorrect);
                //Assert.True(context.Database.CanConnect());


            }

            using (var context = new AntilaDbContext(options))
            {
               

            }

        }
    }
}
