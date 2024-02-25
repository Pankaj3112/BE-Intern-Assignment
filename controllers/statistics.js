const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { filterByMonth } = require("../utils");

const getStatistics = async (req, res) => {
  const { month } = req.query;
  let totalSaleAmount = 0;
  let totalSoldItems = 0;
  let totalNotSoldItems = 0;

  try {
    let products = await prisma.product.findMany();

    //filter by month
    products = filterByMonth(products, month);

    //calculate totalSaleAmount, totalSoldItems, totalNotSoldItems
    products.forEach((product) => {
      if (product.sold) {
        totalSaleAmount += product.price;
        totalSoldItems++;
      } else {
        totalNotSoldItems++;
      }
    });

    return {
      success: true,
      statistics: {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems,
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};

module.exports = { getStatistics };
