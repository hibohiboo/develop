using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TODOAPP.Models
{
    public partial class TestDBContext : DbContext
    {
        public TestDBContext()
        {
        }

        public TestDBContext(DbContextOptions<TestDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TodoItem> TodoItems { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=192.168.7.25;Database=TestDB;persist security info=True;user id=sa;password=yourStrong(!)Password;MultipleActiveResultSets=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<TodoItem>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(255);
            });
        }
    }
}
