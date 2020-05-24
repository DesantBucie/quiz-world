using System;
using System.Collections.Generic;
using System.Text;

namespace Antila.Data.Models
{
    class QuestionModel
    {
        public string Content { get; set; }
        public IEnumerable<AnswerModel> Answers { get; set; }
    }
}
