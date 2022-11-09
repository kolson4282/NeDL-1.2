using Polygons;

namespace TestPolygons
{
    [TestClass]
    public class RectangleTests
    {
        [TestMethod]
        public void CalculateArea_Width10Height15_Returns150()
        {
            //Arrange
            double width = 10;
            double height = 15;
            double expected = 150;
            Rectangle rectangle = new Rectangle(width, height);

            //Act
            double area = rectangle.CalculateArea();

            //Assert
            Assert.AreEqual(expected, area);
        }

        [TestMethod]
        public void GetInfo_PrintsCorrectly()
        {
            //Arrange
            double width = 10;
            double height = 15;
            string expected = $"width {width} and height {height}";
            Rectangle rectangle = new Rectangle(width, height);

            //Act
            string sideLengths = rectangle.GetInfo();

            //Assert
            Assert.AreEqual(expected, sideLengths);

        }

        [TestMethod]
        public void RectangleWith0Width_Throws()
        {
            try
            {
                Rectangle rectangle = new Rectangle(0, 10);
            }
            catch (Exception e)
            {
                Assert.IsNotNull(e);
                return;
            }
            Assert.Fail();

        }
        [TestMethod]
        public void RectangleWith0Height_Throws()
        {
            try
            {
                Rectangle rectangle = new Rectangle(10, 0);
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