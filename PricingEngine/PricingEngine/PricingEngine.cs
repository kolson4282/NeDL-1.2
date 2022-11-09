namespace PricingEngineApp
{
    public class PricingEngine
    {
        bool _holiday = false; // indicates whether to use Holiday pricing
        // Holiday discount parameters
        const decimal _holidayDiscountAmount = 1000.00m;
        const decimal _holidayDiscountPercent = 0.10m;

        public PricingEngine(bool holiday)
        {
            _holiday = holiday;
        }

        public decimal CalculateUnitPrice(int quantity, decimal retailPrice)
        {
            /* Discount rules:
             * 1. If the retail price is less than, or equal to $1.00, no discount
             * 2. If quantity is greater than 10 but less than, or equal to 20, then 10% discount
             * 3. If quantity greater than 20, then 20% discount
             * 4. If it's a holiday and the total amount, after volume discount, is greater
             *    than the holiday threshold, then apply the holiday discount percent
             * */

            decimal discountPercent = 0.00m;

            if (retailPrice >= 1.00m)
            {
                if (quantity > 10)
                {
                    if (quantity > 20)
                    {
                        discountPercent = 0.20m;
                    }
                    else
                    {
                        discountPercent = 0.10m;
                    }
                }

                if (_holiday & (quantity * (retailPrice * (1.00m - discountPercent)) > _holidayDiscountAmount))
                {
                    discountPercent += _holidayDiscountPercent;
                }
            }

            // apply the discounts and retunr the unit price
            return retailPrice * (1.00m - discountPercent);
        }
    }
}