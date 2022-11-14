using Microsoft.EntityFrameworkCore;

namespace Tier2Competency.Models
{
    public class BoardGameContext : DbContext
    {
        public BoardGameContext(DbContextOptions<BoardGameContext> options) : base(options) { }

        public DbSet<BoardGame> BoardGames { get; set; } = null!;
    }
}
