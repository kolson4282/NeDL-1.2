
namespace MVCCalculator
{
    class View
    {
        public View()
        {

        }

        //get number takes in an ordinal (first, second, etc) and creates a message with that to get the xth number needed. 
        public double GetNumber(string ordinal)
        {
            Console.Write($"Enter the {ordinal} number: ");
            string input = Console.ReadLine()!;
            double number;
            while (!double.TryParse(input, out number))
            {
                Console.Write("This is not valid input. Please enter a valid value: ");
                input = Console.ReadLine()!;
            }
            return number;
        }

        public string GetOperator(List<Option> options)
        {
            string input;
            do
            {
                Console.WriteLine("Please select a menu option");
                foreach (Option option in options)
                {
                    Console.WriteLine($"{option.Id} - {option.Description}");
                }
                input = Console.ReadLine()!.ToLower();
                if (!IsValidOperation(options, input))
                {
                    Console.WriteLine("That is an invalid option. Please try again.");
                }
            } while (!IsValidOperation(options, input));
            return input;

        }

        private bool IsValidOperation(List<Option> options, string op)
        {
            foreach (Option option in options)
            {
                if (option.Id == op)
                {
                    return true;
                }
            }
            return false;
        }

        public bool ShouldContinue()
        {
            Console.WriteLine("Would you like to continue with another pair of numbers? ");
            Console.WriteLine("Type 'n' for no, or press enter to continue");
            string input = Console.ReadLine()!;
            return input != "n";
        }

        public void PrintResult(double result)
        {
            if (double.IsNaN(result))
            {
                Console.WriteLine("That operation will result in an undefined result");
                return;
            }
            Console.WriteLine("The total is " + result);
        }
    }
}
