namespace Polygons
{
    public class Square : Rectangle
    {


        public Square(double length) : base(length, length)
        {
            Name = "square";
        }


        public override string GetInfo()
        {
            return $"side length {Width}";
        }
    }
}