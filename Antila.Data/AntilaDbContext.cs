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
                    Content = "Czy Rick Deckard jest replikanetm?",
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 1, Content = "Trudno powiedzieć", QuestionId = 1 },
                new Answer { Id = 2, Content = "Tak", QuestionId = 1 },
                new Answer { Id = 3, Content = "Nie", QuestionId = 1 },
                new Answer { Id = 4, Content = "Nie ma jednoznacznej odpowiedzi", QuestionId = 1, IsCorrect = true });


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
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 5, Content = "Roy Batty", QuestionId = 2 },
                new Answer { Id = 6, Content = "J.F. Sebastian", QuestionId = 2 },
                new Answer { Id = 7, Content = "Bryant", QuestionId = 2 },
                new Answer { Id = 8, Content = "Rick Deckard", QuestionId = 2, IsCorrect = true});


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
                    Content = "Osób jakiej mniejszości narodowej było w Polsce najwięcej według spisu powszechnego z 2011 roku?",
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 9, Content = "Kaszubskiej", QuestionId = 3 },
                new Answer { Id = 10, Content = "Śląskiej", QuestionId = 3, IsCorrect = true},
                new Answer { Id = 11, Content = "Niemieckiej", QuestionId = 3 },
                new Answer { Id = 12, Content = "Ukraińskiej", QuestionId = 3 });


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
                    Content = "Najpopularniejszy kierunek studiów w Polsce w 2019 roku to?",
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 13, Content = "Zarządzanie", QuestionId = 4 },
                new Answer { Id = 14, Content = "Psychologia", QuestionId = 4 },
                new Answer { Id = 15, Content = "Ekonomia", QuestionId = 4 },
                new Answer { Id = 16, Content = "Informatyka", QuestionId = 4, IsCorrect = true});


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
                    Content = "Wskaż częstochowską szkołę, która jest najstarsza ",
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 17, Content = "Norwid", QuestionId = 5 },
                new Answer { Id = 18, Content = "Sienkiewicz", QuestionId = 5, IsCorrect = true },
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
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 21, Content = "Martin Scorsese", QuestionId = 6, IsCorrect = true },
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
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 25, Content = "Casablanca", QuestionId = 7 },
                new Answer { Id = 26, Content = "Pulp Fiction", QuestionId = 7 },
                new Answer { Id = 27, Content = "The Room", QuestionId = 7, IsCorrect = true },
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
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 29, Content = "Incepcja", QuestionId = 8 },
                new Answer { Id = 30, Content = "Mulholland Drive", QuestionId = 8, IsCorrect = true },
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
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 33, Content = "Christopher Nolan", QuestionId = 9, IsCorrect = true },
                new Answer { Id = 34, Content = "Anthony Russo", QuestionId = 9 },
                new Answer { Id = 35, Content = "Zack Snyder", QuestionId = 9 },
                new Answer { Id = 36, Content = "Joss Whedon", QuestionId = 9 });

            //Test 10
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 10,
                    Category = "Społeczeństwo"
                });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 10,
                    TestId = 10,
                    Content = "W jakim z podanych krajów średnia długość życia wynosi najwięcej?",
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 37, Content = "Japonia", QuestionId = 10, IsCorrect = true  },
                new Answer { Id = 38, Content = "Niemcy", QuestionId = 10 },
                new Answer { Id = 39, Content = "Włochy", QuestionId = 10 },
                new Answer { Id = 40, Content = "Hiszpania", QuestionId = 10 });
  
            //Test 11
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 11,
                    Category = "Społeczeństwo"
                });
            modelBuilder.Entity<Question>().HasData(
                new Question
                {
                    Id = 11,
                    TestId = 11,
                    Content = "Który z poniższych krajów nie jest zaliczany do 'wchodzącego i rozwijającego się'" +
                    " według Międzynarodowego Funduszu Walutowego?",
                });
            modelBuilder.Entity<Answer>().HasData(
                new Answer { Id = 41, Content = "Brazylia", QuestionId = 11 },
                new Answer { Id = 42, Content = "Argentyna", QuestionId = 11 },
                new Answer { Id = 43, Content = "Polska", QuestionId = 11 },
                new Answer { Id = 44, Content = "Estonia", QuestionId = 11, IsCorrect = true });
        }
    }
}
