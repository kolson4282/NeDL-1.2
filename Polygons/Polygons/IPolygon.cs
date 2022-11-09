namespace Polygons
{
    public interface IPolygon
    {
        public string Name { get; }
        public double CalculateArea();
        public string GetInfo();
    }
}
