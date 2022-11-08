namespace BookAPI.Models
{
    public class Book
    {
        public long ID { get; set; }
        public string? Author { get; set; }
        public string? Title { get; set; }
        public int? GenreId { get; set; }
        public bool IsRead { get; set; }
    }
}
