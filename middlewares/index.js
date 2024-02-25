const monthNames = {
	"january": 1,
	"february": 2,
	"march": 3,
	"april": 4,
	"may": 5,
	"june": 6,
	"july": 7,
	"august": 8,
	"september": 9,
	"october": 10,
	"november": 11,
	"december": 12,
}

module.exports.checkMonth = (req, res, next) => {
  let { month } = req.query;
  month = month.toLowerCase();
  
  if (!month) {
    return res
      .status(400)
      .json({ success: false, error: "Month parameter is required" });
  }

  if (!monthNames[month]) {
	return res
	  .status(400)
	  .json({ success: false, error: "Invalid month parameter" });
  }

  req.query.month = monthNames[month];
  next();
};
