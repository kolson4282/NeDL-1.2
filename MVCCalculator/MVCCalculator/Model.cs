
namespace MVCCalculator
{
    class Model
    {
        private double num1;

        public double Num1
        {
            get { return num1; }
            set { num1 = value; }
        }
        private double num2;

        public double Num2
        {
            get { return num2; }
            set { num2 = value; }
        }
        private List<Option> options = new List<Option> {
                new Option("a", "Add two numbers"),
                new Option("s", "Subtract two numbers"),
                new Option("m", "Multiply two numbers"),
                new Option("d", "Divide two numbers")
            };

        public List<Option> Options
        {
            get { return options; }
        }


        public Model()
        {
            num1 = 0;
            num2 = 0;
        }

        public Model(double n1, double n2)
        {
            num1 = n1;
            num2 = n2;
        }

        public double DoCalculation(string op)
        {
            double total = double.NaN;
            switch (op)
            {
                case "a":
                    total = num1 + num2;
                    break;
                case "s":
                    total = num1 - num2;
                    break;
                case "m":
                    total = num1 * num2;
                    break;
                case "d":
                    if (num2 != 0)
                    {
                        total = num1 / num2;
                    }
                    break;
            }
            return total;
        }
    }

    class Option
    {
        //class to determine the list of available options. 
        string id;//this is the letter that will be pressed to designate the operator
        public string Id
        {
            get { return id; }
            set { id = value; }
        }

        string description;//Description of what the operator does. 
        public string Description
        {
            get { return description; }
            set { description = value; }
        }

        public Option(string i, string desc)
        {
            id = i;
            description = desc;
        }
    }
}
