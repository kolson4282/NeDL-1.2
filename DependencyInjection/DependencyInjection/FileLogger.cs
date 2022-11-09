namespace DependencyInjection
{
    class FileLogger : ILogger
    {
        public void Log(string message)
        {
            Console.WriteLine("Inside FileLogger");
            LogToFile(message);
        }

        private void LogToFile(string message)
        {
            Console.WriteLine($"Method: LogToFile - Text: {message}");
        }
    }
}
