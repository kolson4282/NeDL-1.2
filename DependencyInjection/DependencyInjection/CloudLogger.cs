namespace DependencyInjection
{
    class CloudLogger : ILogger
    {
        public void Log(string message)
        {
            Console.WriteLine("Inside CloudLogger");
            LogToCloud(message);
        }

        private void LogToCloud(string message)
        {
            Console.WriteLine($"Method: LogToCloud - Text: {message}");
        }
    }
}
