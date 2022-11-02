namespace EventList
{
	class Wedding : IEvent
	{
		private int guests;

		public int Guests
		{
			get { return guests; }
			set { guests = value; }
		}

		private double costPerGuest;

		public double CostPerGuest
		{
			get { return costPerGuest; }
			set { costPerGuest = value; }
		}

		private string name;

		public string Name
		{
			get { return name; }
			set { name = value; }
		}


		public Wedding(int guests, double costPerGuest, string bride, string groom)
		{
			this.guests = guests;
			this.costPerGuest = costPerGuest;
			this.name = $"Wedding of {groom} and {bride}";
		}

		public double CalculateCost()
		{
			return CostPerGuest * Guests;
		}
	}
}
