

namespace MVCCalculator
{
    class Controller
    {
        View view;
        Model model;
        public Controller()
        {
            view = new View();
            model = new Model();

            do
            {
                model.Num1 = view.GetNumber("First");
                model.Num2 = view.GetNumber("Second");
                string op = view.GetOperator(model.Options);
                view.PrintResult(model.DoCalculation(op));
            } while (view.ShouldContinue());
        }
    }
}
