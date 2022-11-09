namespace Polygons
{
    public class Rectangle : IPolygon
    {
        private double width;

        public double Width
        {
            get { return width; }
            set { width = value; }
        }
        private double height;

        public double Height
        {
            get { return height; }
            set { height = value; }
        }

        private int sides;

        public int Sides
        {
            get { return sides; }
        }

        private string name;

        public string Name
        {
            get { return name; }
            set { name = value; }
        }

        public Rectangle(double width, double height)
        {
            if (width <= 0)
            {
                throw new ArgumentOutOfRangeException("width", width, "width cannot be less than or equal to zero");
            }
            if (height <= 0)
            {
                throw new ArgumentOutOfRangeException("height", height, "height cannot be less than or equal to zero");
            }
            this.width = width;
            this.height = height;
            sides = 4;
            name = "rectangle";
        }

        public double CalculateArea()
        {
            return width * height;
        }

        public virtual string GetInfo()
        {
            return $"width {width} and height {height}";
        }
    }
}