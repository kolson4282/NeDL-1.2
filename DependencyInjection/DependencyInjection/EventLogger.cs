namespace DependencyInjection
{
    class EventLogger : ILogger
    {
        public void Log(string message)
        {
            Console.WriteLine("Inside EventLogger");
            LogToEvent(message);
        }

        private void LogToEvent(string message)
        {
            Console.WriteLine($"Method: LogToEvent - Text: {message}");
        }
    }
}
