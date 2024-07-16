const supabase = require("../../../configs/supabase");

const getYearCategorySummary = async (req, res) => {
  const { userId, year, type, month } = req.params;
  try {
    let query = supabase
      .from("tx")
      .select("date, category, value, status")
      .eq("user_id", userId)
      .eq("type", type);

    if (month) {
      const monthStart = `${year}-${month}-01`;
      const monthEnd = new Date(
        year,
        new Date(Date.parse(`${month} 1, ${year}`)).getMonth() + 1,
        0
      )
        .toISOString()
        .slice(0, 10);
      query = query.gte("date", monthStart).lte("date", monthEnd);
    } else {
      query = query.gte("date", `${year}-01-01`).lte("date", `${year}-12-31`);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: "No transactions found" });
    }

    const categorySummary = {};

    data.forEach((tx) => {
      const { category, value, status } = tx;

      if (!categorySummary[category]) {
        categorySummary[category] = { tracked: 0, planned: 0 };
      }

      if (status === "tracked") {
        categorySummary[category].tracked += value;
      } else if (status === "planned") {
        categorySummary[category].planned += value;
      }
    });

    res.status(200).json(categorySummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getYearCategorySummary;
