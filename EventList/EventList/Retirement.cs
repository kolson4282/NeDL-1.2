namespace EventList
{
	class Retirement : IEvent
	{

		private double baseCost;

		public double BaseCost
		{
			get { return baseCost; }
			set { baseCost = value; }
		}

		private double costPerGuest;

		public double CostPerGuest
		{
			get { return costPerGuest; }
			set { costPerGuest = value; }
		}

		private int guests;

		public int Guests
		{
			get { return guests; }
			set { guests = value; }
		}

		private string name;

		public string Name
		{
			get { return name; }
			set { name = value; }
		}

		public Retirement(double baseCost, double costPerGuest, int guests, string retiree)
		{
			this.baseCost = baseCost;
			this.costPerGuest = costPerGuest;
			this.guests = guests;
			this.name = $"Retirement for {retiree}";
		}

		public double CalculateCost()
		{
			return BaseCost + Guests * CostPerGuest;
		}
	}
}
