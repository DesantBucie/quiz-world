using Microsoft.EntityFrameworkCore.Migrations;

namespace Antila.Data.Migrations
{
    public partial class AntilaDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Question",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TestId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Question", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Question_Tests_TestId",
                        column: x => x.TestId,
                        principalTable: "Tests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionId = table.Column<int>(nullable: false),
                    Content = table.Column<string>(nullable: true),
                    IsCorrect = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answer_Question_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Question",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Tests",
                columns: new[] { "Id", "Category" },
                values: new object[,]
                {
                    { 1, "Fakty Autentyczne" },
                    { 2, "Kinematografia" },
                    { 3, "Społeczeństwo" },
                    { 4, "Społeczeństwo" },
                    { 5, "Społeczeństwo" },
                    { 6, "Kinematografia" },
                    { 7, "Kinematografia" },
                    { 8, "Kinematografia" },
                    { 9, "Kinematografia" },
                    { 10, "Społeczeństwo" },
                    { 11, "Społeczeństwo" }
                });

            migrationBuilder.InsertData(
                table: "Question",
                columns: new[] { "Id", "Content", "TestId" },
                values: new object[,]
                {
                    { 1, "Czy Rick Deckard jest replikanetm?", 1 },
                    { 2, "Jak nazywa się postać w którą wciela się Harrison Ford w 'Łowcy Androidów'?", 2 },
                    { 3, "Osób jakiej mniejszości narodowej było w Polsce najwięcej według spisu powszechnego z 2011 roku?", 3 },
                    { 4, "Najpopularniejszy kierunek studiów w Polsce w 2019 roku to?", 4 },
                    { 5, "Wskaż częstochowską szkołę, która jest najstarsza ", 5 },
                    { 6, "Wskaż reżysera, który zdobył najwięcej Oskarów za reżyserię", 6 },
                    { 7, "Z którego filmu pochodzi cytat 'Oh, hi Mark!'?", 7 },
                    { 8, "Wskaż film, który został wybrany przez redakcję BBC najlepszym filmem XX wieku ", 8 },
                    { 9, "Który z wymienionych reżyserów słynie z używania w filmie praktycznych efektów specjalnych?", 9 },
                    { 10, "W jakim z podanych krajów średnia długość życia wynosi najwięcej?", 10 },
                    { 11, "Który z poniższych krajów nie jest zaliczany do 'wchodzącego i rozwijającego się' według Międzynarodowego Funduszu Walutowego?", 11 }
                });

            migrationBuilder.InsertData(
                table: "Answer",
                columns: new[] { "Id", "Content", "IsCorrect", "QuestionId" },
                values: new object[,]
                {
                    { 1, "Trudno powiedzieć", false, 1 },
                    { 25, "Casablanca", false, 7 },
                    { 26, "Pulp Fiction", false, 7 },
                    { 27, "The Room", true, 7 },
                    { 28, "The Mark", false, 7 },
                    { 29, "Incepcja", false, 8 },
                    { 30, "Mulholland Drive", true, 8 },
                    { 31, "Joker", false, 8 },
                    { 32, "Django", false, 8 },
                    { 24, "David Fincher", false, 6 },
                    { 33, "Christopher Nolan", true, 9 },
                    { 35, "Zack Snyder", false, 9 },
                    { 36, "Joss Whedon", false, 9 },
                    { 37, "Japonia", true, 10 },
                    { 38, "Niemcy", false, 10 },
                    { 39, "Włochy", false, 10 },
                    { 40, "Hiszpania", false, 10 },
                    { 41, "Brazylia", false, 11 },
                    { 42, "Argentyna", false, 11 },
                    { 34, "Anthony Russo", false, 9 },
                    { 23, "Stanley Kubrick", false, 6 },
                    { 22, "Quentin Tarantino", false, 6 },
                    { 21, "Martin Scorsese", true, 6 },
                    { 2, "Tak", false, 1 },
                    { 3, "Nie", false, 1 },
                    { 4, "Nie ma jednoznacznej odpowiedzi", true, 1 },
                    { 5, "Roy Batty", false, 2 },
                    { 6, "J.F. Sebastian", false, 2 },
                    { 7, "Bryant", false, 2 },
                    { 8, "Rick Deckard", true, 2 },
                    { 9, "Kaszubskiej", false, 3 },
                    { 10, "Śląskiej", true, 3 },
                    { 11, "Niemieckiej", false, 3 },
                    { 12, "Ukraińskiej", false, 3 },
                    { 13, "Zarządzanie", false, 4 },
                    { 14, "Psychologia", false, 4 },
                    { 15, "Ekonomia", false, 4 },
                    { 16, "Informatyka", true, 4 },
                    { 17, "Norwid", false, 5 },
                    { 18, "Sienkiewicz", true, 5 },
                    { 19, "Traugutt", false, 5 },
                    { 20, "TZN", false, 5 },
                    { 43, "Polska", false, 11 },
                    { 44, "Estonia", true, 11 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answer_QuestionId",
                table: "Answer",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Question_TestId",
                table: "Question",
                column: "TestId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answer");

            migrationBuilder.DropTable(
                name: "Question");

            migrationBuilder.DropTable(
                name: "Tests");
        }
    }
}
