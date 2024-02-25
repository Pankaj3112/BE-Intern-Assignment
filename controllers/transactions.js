const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  let whereCondition = {};

  try {
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
      skip: (page - 1) * perPage,
      take: perPage,
    });

	transactions = transactions.filter((transaction) => {
	  const transactionDate = new Date(transaction.dateOfSale);
	  const transactionMonth = transactionDate.getMonth()+1;
	  return month === transactionMonth;
	})

    return res.json({ success: true, transactions });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
