using System;
using System.Collections.Generic;

namespace TODOAPP.Models
{
    public partial class TodoItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
    }
}
