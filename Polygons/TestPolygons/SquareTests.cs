using Polygons;

namespace TestPolygons
{
    [TestClass]
    public class SquareTests
    {
        [TestMethod]
        public void CalculateArea_SideLength5_Returns25()
        {
            //Arrange
            double sideLength = 5;
            double expected = 25;
            Square square = new Square(sideLength);

            //Act
            double area = square.CalculateArea();

            //Assert
            Assert.AreEqual(expected, area);
        }

        [TestMethod]
        public void GetInfo_PrintsCorrectly()
        {
            //Arrange
            double sideLength = 5;
            string expected = $"side length {sideLength}";
            Square square = new Square(sideLength);

            //Act
            string sideLengths = square.GetInfo();

            //Assert
            Assert.AreEqual(expected, sideLengths);

        }

        [TestMethod]
        public void SquareWith0Length_Throws()
        {
            try
            {
                Square square = new Square(0);
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