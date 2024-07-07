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

      res.status(200).json({ user: data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserById: async (req, res) => {
    const { userId } = req.params;
    const { newName, newEmail } = req.body;

    try {
      // Update user's email in the authentication table
      const { error: authUpdateError } = await supabase.auth.updateUser({
        id: userId,
        email: newEmail,
      });

      if (authUpdateError) throw authUpdateError;

      // Update user's name and email in the users table
      const { error: dataUpdateError } = await supabase
        .from("users")
        .update({ name: newName, email: newEmail })
        .eq("id", userId);

      if (dataUpdateError) throw dataUpdateError;

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
