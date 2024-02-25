module.exports.filterByMonth = (products, month) => {
  return products.filter((product) => {
    const transactionDate = new Date(product.dateOfSale);
    const transactionMonth = transactionDate.getMonth() + 1;
    return month === transactionMonth;
  });
};

//higher order function to send response, returns a function that takes req and res
module.exports.sendResponse = (getData, req, res) => {
  return async (req, res) => {
    try {
      const data = await getData(req, res);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  };
};
