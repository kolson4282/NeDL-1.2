namespace Polygons;

public class Program
{
    public static void Main(string[] args)
    {
        IPolygon square = new Square(20);
        AreaService areaService = new AreaService(square);
        areaService.PrintArea();

        IPolygon rectangle = new Rectangle(10, 15);
        areaService.Polygon = rectangle;
        areaService.PrintArea();

        IPolygon circle = new Circle(10);
        areaService.Polygon = circle;
        areaService.PrintArea();

        IPolygon triangle = new Triangle(3, 4, 5);
        areaService.Polygon = triangle;
        areaService.PrintArea();
    }
}