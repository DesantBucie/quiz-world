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

        }
    }
}
