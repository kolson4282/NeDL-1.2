namespace DependencyInjection
{
    class Program
    {
        static void Main()
        {
            ILogger logger1 = new FileLogger();
            ProductService productService1 = new ProductService(logger1);
            productService1.Log("Hello World");

            ILogger logger2 = new DatabaseLogger();
            ProductService productService2 = new ProductService(logger2);
            productService2.Log("Hello World From the Database");

            ILogger logger3 = new EventLogger();
            ProductService productService3 = new ProductService(logger3);
            productService3.Log("Hello World");

        }
    }
}