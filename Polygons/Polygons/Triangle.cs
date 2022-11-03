namespace Polygons
{

    internal class Triangle : IPolygon
    {
        private double side1;
        public double Side1
        {
            get { return side1; }
            set { side1 = value; }
        }

        private double side2;
        public double Side2
        {
            get { return side2; }
            set { side2 = value; }
        }

        private double side3;
        public double Side3
        {
            get { return side3; }
            set { side3 = value; }
        }

        private string name;
        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public Triangle(double s1, double s2, double s3)
        {
            side1 = s1;
            side2 = s2;
            side3 = s3;
            name = "triangle";
            if (!IsValid())
            {
                throw new ArgumentException("Side lengths result in an invalid triangle");
            }
        }

        private bool IsValid()
        {
            if (side1 <= 0 || side2 <= 0 || side3 <= 0)
            {
                return false;
            }
            if (side1 + side2 <= side3 || side1 + side3 <= side2 || side2 + side3 <= side1)
            {
                return false;
            }

            return true;
        }

        public double CalculateArea()
        {
            double s = (side1 + side2 + side3) / 2; //semiperimeter
            double area = Math.Sqrt(s * (s - side1) * (s - side2) * (s - side3));
            return area;
        }

        public string GetInfo()
        {
            return $"sides {side1}, {side2}, and {side3}";
        }
    }
}
