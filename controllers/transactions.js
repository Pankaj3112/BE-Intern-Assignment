const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { filterByMonth } = require("../utils");

const getTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  let whereCondition = {};

  try {
	//filter by search
    if (search) {
      whereCondition = {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { priceText: { contains: search } },
        ],
      };
    }

    let transactions = await prisma.product.findMany({
      where: whereCondition,
    });

	//filter by month
    transactions = filterByMonth(transactions, month);

	//pagination
	transactions = transactions.slice(
	  (page - 1) * perPage,
	  page * perPage
	);

	if(transactions.length === 0 && page > 1) {
	  return { success: false, error: "No more transactions to show"};
	}
	
    return { success: true, transactions };
  } catch (error) {
	console.log(error);
    return { success: false, error: "Internal Server Error"};
  }
};

module.exports = { getTransactions };