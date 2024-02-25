const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { filterByMonth } = require("../utils");

const getBarChart = async (req, res) => {
  const { month } = req.query;
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ];

  try {
    let products = await prisma.product.findMany({});
    let barChartData = [];

    //filter by month
    products = filterByMonth(products, month);

    //filter by price range
    priceRanges.forEach((priceRange) => {
      const filteredProducts = products.filter((product) => {
        return (
          product.price >= priceRange.min && product.price <= priceRange.max
        );
      });
      barChartData.push({
        range: `${priceRange.min} - ${priceRange.max}`,
        count: filteredProducts.length,
      });
    });

    return { success: true, barChartData };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};

const getPieChart = async (req, res) => {
  const { month } = req.query;

  try {
    let products = await prisma.product.findMany({});
    let pieChartData = [];

    //filter by month
    products = filterByMonth(products, month);

    //group by category
    const categoryMap = new Map();

    products.forEach((product) => {
      const { category } = product;
      if (categoryMap.has(category)) {
        categoryMap.set(category, categoryMap.get(category) + 1);
      } else {
        categoryMap.set(category, 1);
      }
    });

    for (let [category, count] of categoryMap) {
      pieChartData.push({ category, count });
    }

    return { success: true, pieChartData };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};

module.exports = { getBarChart, getPieChart };
