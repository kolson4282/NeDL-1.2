namespace EventList
{
    class CostService
    {
        private IEvent _event;

        public IEvent Event
        {
            get { return _event; }
            set { _event = value; }
        }

        public CostService(IEvent e)
        {
            _event = e;
        }

        public void PrintCost()
        {
            Console.WriteLine($"The cost of event \"{Event.Name}\" is ${String.Format("{0:0,0.00}", Event.CalculateCost())}");
        }
    }
}
