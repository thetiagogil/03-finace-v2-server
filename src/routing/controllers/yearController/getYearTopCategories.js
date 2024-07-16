const supabase = require("../../../configs/supabase");

const getYearTopCategories = async (req, res) => {
  const { userId, year, status } = req.params;

  try {
    const { data, error } = await supabase
      .from("tx")
      .select("type, category, value")
      .eq("user_id", userId)
      .eq("status", status)
      .gte("date", `${year}-01-01`)
      .lte("date", `${year}-12-31`);

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ message: "No transactions found" });
    }

    let incomes = {};
    let expenses = {};

    data.forEach((tx) => {
      const { type, category, value } = tx;

      if (type === "income") {
        if (!incomes[category]) {
          incomes[category] = value;
        } else {
          incomes[category] += value;
        }
      } else if (type === "expense") {
        if (!expenses[category]) {
          expenses[category] = value;
        } else {
          expenses[category] += value;
        }
      }
    });

    const sortedIncomes = Object.entries(incomes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .reduce((acc, [category, value]) => {
        acc[category] = value;
        return acc;
      }, {});

    const sortedExpenses = Object.entries(expenses)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .reduce((acc, [category, value]) => {
        acc[category] = value;
        return acc;
      }, {});

    const result = {
      incomes: sortedIncomes,
      expenses: sortedExpenses,
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getYearTopCategories;
