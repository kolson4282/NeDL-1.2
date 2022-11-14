namespace Tier2Competency.Models
{
    public class BoardGame
    {
        public long ID { get; set; }
        public string? Title { get; set; }
        public int NumberOfPlayers { get; set; }
        public string? DirectionsLink { get; set; }
        public bool Played { get; set; }
        public int PlayedTimes { get; set; }
    }
}
