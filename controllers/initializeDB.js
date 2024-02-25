const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

module.exports.initialize = async (req, res) => {
  try {
    const response = await axios.get(process.env.THIRD_PARTY_API_URL);
    const products = response.data;

    const existingProducts = await prisma.product.findMany();

    //to make sure not re-inserting existing products
    const newProducts = products.filter((product) => {
      return !existingProducts.some((p) => p.id === product.id);
    });

    if (newProducts.length == 0) {
      return res
        .status(200)
        .json({ success: true, message: "Database already initialized" });
    }

    await prisma.product.createMany({
      data: newProducts.map((product) => {
		return {
			...product,
			priceText: String(product.price),
		}
	  }),
    });

    return res
      .status(200)
      .json({ success: true, message: "Database initialized" });
  } catch (error) {
    console.error("Error initializing database:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error initializing database" });
  }
};
