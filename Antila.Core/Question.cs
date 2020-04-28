﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Antila.Core
{
    public class Question
    {
        public string Content { get; set; }
        public int CorrectId { get; set; }
        public IEnumerable<Answer> Answers { get; set; }
    }
}