namespace EventList
{
    interface IEvent
    {
        string Name { get; }
        double CalculateCost();
    }
}
