const supabase = require("../../configs/supabase");

const UserController = {
  getUserById: async (req, res) => {
    const { userId } = req.params;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserWalletById: async (req, res) => {
    const { userId } = req.params;
    const { wallet_initial_value, wallet_current_value } = req.body;

    try {
      const { error: dataUpdateError } = await supabase
        .from("users")
        .update({
          wallet_initial_value,
          wallet_current_value,
        })
        .eq("id", userId);

      if (dataUpdateError) throw dataUpdateError;

      res.status(200).json({ message: "User wallet updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
