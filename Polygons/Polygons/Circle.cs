namespace Polygons
{
    public class Circle : IPolygon
    {
        private double radius;

        private string name;
        public string Name { get { return name; } }

        public Circle(double radius)
        {
            if (radius <= 0)
            {
                throw new ArgumentOutOfRangeException("radius", radius, "radius cannot be less than or equal to zero");
            }
            this.radius = radius;
            name = "circle";
        }



        public double CalculateArea()
        {
            return radius * radius * Math.PI;
        }

        public string GetInfo()
        {
            return $"radius {radius}";
        }
    }
}