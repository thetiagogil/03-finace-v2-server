const supabase = require("../../../configs/supabase");

const getYearTopCategories = async (req, res) => {
  const { userId, year, month } = req.params;

  try {
    // Construct the query
    let query = supabase
      .from("tx")
      .select("type, category, value, status")
      .eq("user_id", userId);

    if (month) {
      // Construct the start and end dates for the specified month
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
      // Construct the start and end dates for the whole year
      query = query.gte("date", `${year}-01-01`).lte("date", `${year}-12-31`);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: "No transactions found" });
    }

    const summary = {
      tracked: {
        incomes: {},
        expenses: {}
      },
      planned: {
        incomes: {},
        expenses: {}
      }
    };

    data.forEach((tx) => {
      const { type, category, value, status } = tx;
      const summaryType = type === "income" ? "incomes" : "expenses";

      if (!summary[status][summaryType][category]) {
        summary[status][summaryType][category] = value;
      } else {
        summary[status][summaryType][category] += value;
      }
    });

    const getTopCategories = (categoryData) =>
      Object.entries(categoryData)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .reduce((acc, [category, value]) => {
          acc[category] = value;
          return acc;
        }, {});

    const result = {
      tracked: {
        incomes: getTopCategories(summary.tracked.incomes),
        expenses: getTopCategories(summary.tracked.expenses)
      },
      planned: {
        incomes: getTopCategories(summary.planned.incomes),
        expenses: getTopCategories(summary.planned.expenses)
      }
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getYearTopCategories;
