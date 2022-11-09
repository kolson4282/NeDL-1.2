namespace EventList
{
    class Graduation : IEvent
    {

        private double cakeCost;

        public double CakeCost
        {
            get { return cakeCost; }
            set { cakeCost = value; }
        }


        private double baseCost;

        public double BaseCost
        {
            get { return baseCost; }
            set { baseCost = value; }
        }


        private string name;
        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public Graduation(double cakeCost, double baseCost, string graduate)
        {
            this.cakeCost = cakeCost;
            this.baseCost = baseCost;
            this.name = $"Graduation for {graduate}";
        }

        public double CalculateCost()
        {
            return baseCost + cakeCost;
        }
    }
}
