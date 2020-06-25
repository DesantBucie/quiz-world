using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Antila.Core
{
    public class Question

    {
        public int Id { get; set; }
        public int TestId { get; set; }
        public string Content { get; set; }
        public IEnumerable <Answer> Answers { get; set; }
    }
}
