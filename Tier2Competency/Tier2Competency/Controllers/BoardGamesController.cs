using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tier2Competency.Models;

namespace Tier2Competency.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardGamesController : ControllerBase
    {
        private readonly BoardGameContext _context;

        public BoardGamesController(BoardGameContext context)
        {
            _context = context;
        }

        // GET: api/BoardGames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardGame>>> GetBoardGames()
        {
            return await _context.BoardGames.ToListAsync();
        }

        // GET: api/BoardGames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardGame>> GetBoardGame(long id)
        {
            var boardGame = await _context.BoardGames.FindAsync(id);

            if (boardGame == null)
            {
                return NotFound();
            }

            return boardGame;
        }

        // PUT: api/BoardGames/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoardGame(long id, BoardGame boardGame)
        {
            if (id != boardGame.ID)
            {
                return BadRequest();
            }

            if (boardGame.PlayedTimes > 0)
            {
                boardGame.Played = true;
            }
            else
            {
                boardGame.Played = false;
            }

            _context.Entry(boardGame).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardGameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BoardGames
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BoardGame>> PostBoardGame(BoardGame boardGame)
        {
            if (boardGame.PlayedTimes > 0)
            {
                boardGame.Played = true;
            }
            else
            {
                boardGame.Played = false;
            }

            _context.BoardGames.Add(boardGame);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBoardGame", new { id = boardGame.ID }, boardGame);
        }

        // DELETE: api/BoardGames/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoardGame(long id)
        {
            var boardGame = await _context.BoardGames.FindAsync(id);
            if (boardGame == null)
            {
                return NotFound();
            }

            _context.BoardGames.Remove(boardGame);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BoardGameExists(long id)
        {
            return _context.BoardGames.Any(e => e.ID == id);
        }
    }
}
