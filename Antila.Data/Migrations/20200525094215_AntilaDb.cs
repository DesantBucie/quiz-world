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
                    { 5, "Społeczeństwo" }
                });

            migrationBuilder.InsertData(
                table: "Question",
                columns: new[] { "Id", "Content", "CorrectId", "TestId" },
                values: new object[,]
                {
                    { 1, "Wskaż samolot najczęściej używany do zrzutu chemitrails", 1, 1 },
                    { 2, "Jak nazywa się postać w którą wciela się Harrison Ford w 'Łowcy Androidów'?", 7, 2 },
                    { 3, "Czym rzeczywiście jest choroba wywoływana przez COVID-19?", 10, 3 },
                    { 4, "Jakie są efekty uboczne 5G?", 15, 4 },
                    { 5, "Wymień częstochowską szkołę, w której brakuje drzwi w toalecie", 18, 5 }
                });

            migrationBuilder.InsertData(
                table: "Answer",
                columns: new[] { "Id", "Content", "QuestionId" },
                values: new object[,]
                {
                    { 1, "Boeing 737", 1 },
                    { 18, "Sienkiewicz", 5 },
                    { 17, "Norwid", 5 },
                    { 16, "Nie ma takich", 4 },
                    { 15, "COVID-19", 4 },
                    { 14, "Wysypka na twarzy", 4 },
                    { 13, "Śmierć", 4 },
                    { 12, "Atakiem USA na gospodarkę Chin", 3 },
                    { 11, "Efektem ubocznym chemitrails", 3 },
                    { 10, "Groźną chorobą", 3 },
                    { 9, "Zwykłą grypą", 3 },
                    { 8, "Replikantem", 2 },
                    { 7, "Jest", 2 },
                    { 6, "Deckard", 2 },
                    { 5, "Rick", 2 },
                    { 4, "DC-9", 1 },
                    { 3, "Tu-154", 1 },
                    { 2, "Airbus 380", 1 },
                    { 19, "Traugutt", 5 },
                    { 20, "TZN", 5 }
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
