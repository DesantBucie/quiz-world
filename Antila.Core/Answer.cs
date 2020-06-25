using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace Antila.Core
{
    public class Answer
    {
        public int QuestionId { get; set; }
        public int Id { get; set; }
        public string Content { get; set; }
        public bool IsCorrect { get; set; }
    }
}
