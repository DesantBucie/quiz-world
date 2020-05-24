using System;
using System.Collections.Generic;
using System.Text;

namespace Antila.Data.Models
{
    class TestModel
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public QuestionModel Question { get; set; }
    }
}
