const supabase = require("../../configs/supabase");

const TxController = {
  createTx: async (req, res) => {
    const { user_id, type, status, category, date, value, description} = req.body;
    const txData = { user_id, type, status, category, date, value, description };
    try {
      const { data, error } = await supabase
        .from("tx")
        .insert(txData)
        .select();

      if (error) throw error;

      res.status(201).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getTxByStatus: async (req, res) => {
    const { user_id, status } = req.query;
    try {
      const { data, error } = await supabase
        .from("tx")
        .select("*")
        .eq("user_id", user_id)
        .eq("status", status);
  
      if (error) throw error;
  
      if (!data) {
        res.status(404).json({ message: "No transactions found" });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  

  updateProductById: async (req, res) => {
    const { productId } = req.params;
    const { name, img, size, price, description, type, status } = req.body;
    const productData = { name, img, size, price, description, type, status };
    try {
      const { data, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", productId)
        .select();

      if (error) throw error;

      if (!data) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteProductById: async (req, res) => {
    const { productId } = req.params;
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      res.status(200).json({ message: "Product successfully deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = TxController;
