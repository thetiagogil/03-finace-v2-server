const supabase = require("../../configs/supabase");

const UserController = {
  getUsers: async (req, res) => {
    try {
      const { data, error } = await supabase.from("users").select("*");
      if (error) throw error;
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

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

  getUserFavourites: async (req, res) => {
    const { userId } = req.params;
    try {
      const { data, error } = await supabase
        .from("users")
        .select("favourites")
        .eq("id", userId)
        .single();

      if (error) throw error;

      res.status(200).json(data ? data.favourites : null);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateUserFavourite: async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
      // Fetch current favorites
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("favourites")
        .eq("id", userId)
        .single();

      if (userError) throw userError;

      // Extract current favorites array
      const previousFavourites = userData.favourites || [];

      // Check if productId exists in favorites array
      const isFavorite = previousFavourites.includes(productId);

      let updatedFavourites;

      // If productId exists, remove it; otherwise, add it
      if (isFavorite) {
        updatedFavourites = previousFavourites.filter((id) => id !== productId);
      } else {
        updatedFavourites = [...previousFavourites, productId];
      }

      // Update user record with the updated favorites
      const { data, error } = await supabase
        .from("users")
        .update({ favourites: updatedFavourites })
        .eq("id", userId);

      if (error) throw error;

      res
        .status(200)
        .json({ message: "Product added to favorites successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
