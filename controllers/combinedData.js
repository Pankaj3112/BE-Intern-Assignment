const { getStatistics } = require("../controllers/statistics");
const { getBarChart, getPieChart } = require("../controllers/chart");

const getCombinedData = async (req, res) => {
  try {
    const statistics = await getStatistics(req, res);
    const barChart = await getBarChart(req, res);
    const pieChart = await getPieChart(req, res);

    return {
      success: true,
      data: {
        statistics,
        barChart,
        pieChart,
      },
    };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Internal Server Error" };
  }
};

module.exports = { getCombinedData };
