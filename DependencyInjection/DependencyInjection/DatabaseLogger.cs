namespace DependencyInjection
{
    class DatabaseLogger : ILogger
    {
        public void Log(string message)
        {
            Console.WriteLine("Inside DatabaseLogger");
            LogToDatabase(message);
        }

        private void LogToDatabase(string message)
        {
            Console.WriteLine($"Method: LogToDatabase - Text: {message}");
        }
    }
}
