using Polygons;

namespace TestPolygons
{
    [TestClass]
    public class CircleTests
    {
        [TestMethod]
        public void CalculateArea_RadiusOf10_Returns314_159()
        {
            //Arrange
            double radius = 10;
            double expected = 314.159;
            Circle circle = new Circle(radius);

            //Act
            double area = circle.CalculateArea();

            //Assert
            Assert.AreEqual(expected, area, 0.001);
        }

        [TestMethod]
        public void GetInfo_PrintsCorrectly()
        {
            //Arrange
            double radius = 10;
            string expected = $"radius {radius}";
            Circle circle = new Circle(radius);

            //Act
            string info = circle.GetInfo();

            //Assert
            Assert.AreEqual(expected, info);

        }

        [TestMethod]
        public void CircleWith0Radius_Throws()
        {
            try
            {
                Circle circle = new Circle(0);
            }
            catch (Exception e)
            {
                Assert.IsNotNull(e);
                return;
            }
            Assert.Fail();

        }

    }
}