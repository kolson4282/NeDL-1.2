namespace Polygons
{
    public class AreaService
    {
        private IPolygon polygon;

        public IPolygon Polygon
        {
            get { return polygon; }
            set { polygon = value; }
        }

        public AreaService(IPolygon polygon)
        {
            this.polygon = polygon;
        }

        public void PrintArea()
        {
            Console.WriteLine($"The area of a {polygon.Name} with {polygon.GetInfo()} is {Math.Round(polygon.CalculateArea(), 3)}");
        }
    }
}
