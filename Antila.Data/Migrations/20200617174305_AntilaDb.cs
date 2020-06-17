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
                    Content = table.Column<string>(nullable: true),
                    CorrectId = table.Column<int>(nullable: false)
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
                    Content = table.Column<string>(nullable: true)
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
                columns: new[] { "Id", "Content", "CorrectId", "TestId" },
                values: new object[,]
                {
                    { 1, "Czy Rick Deckard jest replikanetm?", 4, 1 },
                    { 2, "Jak nazywa się postać w którą wciela się Harrison Ford w 'Łowcy Androidów'?", 8, 2 },
                    { 3, "Osób jakiej mniejszości narodowej było w Polsce najwięcej według spisu powszechnego z 2011 roku?", 10, 3 },
                    { 4, "Najpopularniejszy kierunek studiów w Polsce w 2019 roku to?", 16, 4 },
                    { 5, "Wskaż częstochowską szkołę, która jest najstarsza ", 18, 5 },
                    { 6, "Wskaż reżysera, który zdobył najwięcej Oskarów za reżyserię", 21, 6 },
                    { 7, "Z którego filmu pochodzi cytat 'Oh, hi Mark!'?", 27, 7 },
                    { 8, "Wskaż film, który został wybrany przez redakcję BBC najlepszym filmem XX wieku ", 30, 8 },
                    { 9, "Który z wymienionych reżyserów słynie z używania w filmie praktycznych efektów specjalnych?", 33, 9 },
                    { 10, "W jakim z podanych krajów średnia długość życia wynosi najwięcej?", 37, 10 },
                    { 11, "Który z poniższych krajów nie jest zaliczany do 'wchodzącego i rozwijającego się' według Międzynarodowego Funduszu Walutowego?", 44, 11 }
                });

            migrationBuilder.InsertData(
                table: "Answer",
                columns: new[] { "Id", "Content", "QuestionId" },
                values: new object[,]
                {
                    { 1, "Trudno powiedzieć", 1 },
                    { 25, "Casablanca", 7 },
                    { 26, "Pulp Fiction", 7 },
                    { 27, "The Room", 7 },
                    { 28, "The Mark", 7 },
                    { 29, "Incepcja", 8 },
                    { 30, "Mulholland Drive", 8 },
                    { 31, "Joker", 8 },
                    { 32, "Django", 8 },
                    { 24, "David Fincher", 6 },
                    { 33, "Christopher Nolan", 9 },
                    { 35, "Zack Snyder", 9 },
                    { 36, "Joss Whedon", 9 },
                    { 37, "Japonia", 10 },
                    { 38, "Niemcy", 10 },
                    { 39, "Włochy", 10 },
                    { 40, "Hiszpania", 10 },
                    { 41, "Brazylia", 11 },
                    { 42, "Argentyna", 11 },
                    { 34, "Anthony Russo", 9 },
                    { 23, "Stanley Kubrick", 6 },
                    { 22, "Quentin Tarantino", 6 },
                    { 21, "Martin Scorsese", 6 },
                    { 2, "Tak", 1 },
                    { 3, "Nie", 1 },
                    { 4, "Nie ma jednoznacznej odpowiedzi", 1 },
                    { 5, "Roy Batty", 2 },
                    { 6, "J.F. Sebastian", 2 },
                    { 7, "Bryant", 2 },
                    { 8, "Rick Deckard", 2 },
                    { 9, "Kaszubskiej", 3 },
                    { 10, "Śląskiej", 3 },
                    { 11, "Niemieckiej", 3 },
                    { 12, "Ukraińskiej", 3 },
                    { 13, "Zarządzanie", 4 },
                    { 14, "Psychologia", 4 },
                    { 15, "Ekonomia", 4 },
                    { 16, "Informatyka", 4 },
                    { 17, "Norwid", 5 },
                    { 18, "Sienkiewicz", 5 },
                    { 19, "Traugutt", 5 },
                    { 20, "TZN", 5 },
                    { 43, "Polska", 11 },
                    { 44, "Estonia", 11 }
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
