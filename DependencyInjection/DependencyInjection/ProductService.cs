namespace DependencyInjection
{
    class ProductService
    {
        private ILogger _logger;

        public ProductService(ILogger logger)
        {
            _logger = logger;
        }

        public void Log(string message)
        {
            _logger.Log(message);
        }
    }
}
