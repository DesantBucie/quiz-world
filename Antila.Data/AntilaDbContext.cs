using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Antila.Core;
using Microsoft.EntityFrameworkCore;

namespace Antila.Data
{
    public class AntilaDbContext : DbContext
    {
        public AntilaDbContext(DbContextOptions<AntilaDbContext> options)
            : base(options)
        {

        }

        public DbSet<Test> Tests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 1,
                    Category = "Fakty Autentyczne"
                });    
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 1,
                    TestId = 1,
                    Content = "Wskaż samolot najczęściej używany do zrzutu chemitrails",
                    CorrectId = 1
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 1, Content = "Boeing 737", QuestionId = 1 },                                            
                new Answer { Id = 2, Content = "Airbus 380", QuestionId = 1 },                
                new Answer { Id = 3, Content = "Tu-154", QuestionId = 1 },                                      
                new Answer { Id = 4, Content = "DC-9", QuestionId = 1 });


            modelBuilder.Entity<Test>().HasData(
               new Test
               {
                   Id = 2,
                   Category = "Kinematografia"
               });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 2,
                    TestId = 2,
                    Content = "Jak nazywa się postać w którą wciela się Harrison Ford w 'Łowcy Androidów'?",
                    CorrectId = 7
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 5, Content = "Rick", QuestionId = 2 },
                new Answer { Id = 6, Content = "Deckard", QuestionId = 2 },
                new Answer { Id = 7, Content = "Jest", QuestionId = 2 },
                new Answer { Id = 8, Content = "Replikantem", QuestionId = 2 });


            modelBuilder.Entity<Test>().HasData(
              new Test
              {
                  Id = 3,
                  Category = "Społeczeństwo"
              });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 3,
                    TestId = 3,
                    Content = "Czym rzeczywiście jest choroba wywoływana przez COVID-19?",
                    CorrectId = 10
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 9, Content = "Zwykłą grypą", QuestionId = 3 },
                new Answer { Id = 10, Content = "Groźną chorobą", QuestionId = 3 },
                new Answer { Id = 11, Content = "Efektem ubocznym chemitrails", QuestionId = 3 },
                new Answer { Id = 12, Content = "Atakiem USA na gospodarkę Chin", QuestionId = 3 });


            modelBuilder.Entity<Test>().HasData(
             new Test
             {
                 Id = 4,
                 Category = "Społeczeństwo"
             });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 4,
                    TestId = 4,
                    Content = "Jakie są efekty uboczne 5G?",
                    CorrectId = 15
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 13, Content = "Śmierć", QuestionId = 4 },
                new Answer { Id = 14, Content = "Wysypka na twarzy", QuestionId = 4 },
                new Answer { Id = 15, Content = "COVID-19", QuestionId = 4 },
                new Answer { Id = 16, Content = "Nie ma takich", QuestionId = 4 });


            modelBuilder.Entity<Test>().HasData(
             new Test
             {
                 Id = 5,
                 Category = "Społeczeństwo"
             });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 5,
                    TestId = 5,
                    Content = "Wymień częstochowską szkołę, w której brakuje drzwi w toalecie",
                    CorrectId = 18
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 17, Content = "Norwid", QuestionId = 5 },
                new Answer { Id = 18, Content = "Sienkiewicz", QuestionId = 5 },
                new Answer { Id = 19, Content = "Traugutt", QuestionId = 5 },
                new Answer { Id = 20, Content = "TZN", QuestionId = 5 });

            //Test 6
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 6,
                    Category = "Kinematografia"
                });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 6,
                    TestId = 6,
                    Content = "Wskaż reżysera, który zdobył najwięcej Oskarów za reżyserię",
                    CorrectId = 21
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 21, Content = "Martin Scorsese", QuestionId = 6 },
                new Answer { Id = 22, Content = "Quentin Tarantino", QuestionId = 6 },
                new Answer { Id = 23, Content = "Stanley Kubrick", QuestionId = 6 },
                new Answer { Id = 24, Content = "David Fincher", QuestionId = 6 });

            //Test 7
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 7,
                    Category = "Kinematografia"
                });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 7,
                    TestId = 7,
                    Content = "Z którego filmu pochodzi cytat 'Oh, hi Mark!'?",
                    CorrectId = 27
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 25, Content = "Casablanca", QuestionId = 7 },
                new Answer { Id = 26, Content = "Pulp Fiction", QuestionId = 7 },
                new Answer { Id = 27, Content = "The Room", QuestionId = 7 },
                new Answer { Id = 28, Content = "The Mark", QuestionId = 7 });

            //Test 8
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 8,
                    Category = "Kinematografia"
                });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 8,
                    TestId = 8,
                    Content = "Wskaż film, który został wybrany przez redakcję BBC najlepszym filmem XX wieku ",
                    CorrectId = 30
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 29, Content = "Incepcja", QuestionId = 8 },
                new Answer { Id = 30, Content = "Mulholland Drive", QuestionId = 8 },
                new Answer { Id = 31, Content = "Joker", QuestionId = 8 },
                new Answer { Id = 32, Content = "Django", QuestionId = 8 });

            //Test 9
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 9,
                    Category = "Kinematografia"
                });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 9,
                    TestId = 9,
                    Content = "Który z wymienionych reżyserów słynie z używania w filmie praktycznych efektów specjalnych?",
                    CorrectId = 33
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 33, Content = "Christopher Nolan", QuestionId = 9},
                new Answer { Id = 34, Content = "Anthony Russo", QuestionId = 9 },
                new Answer { Id = 35, Content = "Zack Snyder", QuestionId = 9 },
                new Answer { Id = 36, Content = "Joss Whedon", QuestionId = 9 });
        }
    }
}
