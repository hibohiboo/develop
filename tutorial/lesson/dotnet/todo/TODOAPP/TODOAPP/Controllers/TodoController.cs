using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODOAPP.Models;

namespace TODOAPP.Controllers {
  [Route("api/[controller]")]
  [ApiController]
  public class TodoController : ControllerBase {
    private readonly TestDBContext _context;

    public TodoController(TestDBContext context) {
      _context = context;

      if (_context.TodoItems.Count() == 0) {
        // Create a new TodoItem if collection is empty,
        // which means you can't delete all TodoItems.
        _context.TodoItems.Add(new TodoItem { Name = "Item1" });
        _context.SaveChanges();
      }
    }

    // GET: api/Todo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems() {
      return await _context.TodoItems.ToListAsync();
    }

    // GET: api/Todo/0
    [HttpGet("{id}")]
    public async Task<ActionResult<TodoItem>> GetTodoItem(int id) {
      var todoItem = await _context.TodoItems.FindAsync(id);

      if (todoItem == null) {
        return NotFound();
      }

      return todoItem;
    }
  }
}
