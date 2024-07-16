const supabase = require("../../../configs/supabase");

const getYearTopMonths = async (req, res) => {
  const { userId, year, status } = req.params;

  try {
    const { data, error } = await supabase
      .from("tx")
      .select("type, date, value")
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

    let incomesByMonth = {};
    let expensesByMonth = {};

    data.forEach((tx) => {
      const { type, date, value } = tx;
      const month = new Date(date)
        .toLocaleString("default", { month: "short" })
        .toLowerCase();

      if (type === "income") {
        if (!incomesByMonth[month]) {
          incomesByMonth[month] = 0;
        }
        incomesByMonth[month] += value;
      } else if (type === "expense") {
        if (!expensesByMonth[month]) {
          expensesByMonth[month] = 0;
        }
        expensesByMonth[month] += value;
      }
    });

    const sortedIncomes = Object.entries(incomesByMonth)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [month, value]) => {
        acc[month] = value;
        return acc;
      }, {});

    const sortedExpenses = Object.entries(expensesByMonth)
      .sort(([, a], [, b]) => b - a)
      .reduce((acc, [month, value]) => {
        acc[month] = value;
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

module.exports = getYearTopMonths;
