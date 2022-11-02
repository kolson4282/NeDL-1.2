namespace EventList
{
    class Program
    {
        private static void Main(string[] args)
        {
            IEvent event1 = new Wedding(100, 10.25, "Jane Jones", "Sam Smith Jr.");
            CostService costService1 = new(event1);
            costService1.PrintCost();

            IEvent event2 = new Graduation(50.75, 200, "Ben Jones");
            CostService costService2 = new(event2);
            costService2.PrintCost();

            IEvent event3 = new Retirement(150, 7.5, 25, "Sam Smith.");
            CostService costService3 = new(event3);
            costService3.PrintCost();
        }
    }
}