import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await sql`
        SELECT * FROM products
         ORDER BY created_at DESC`;
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log("Error getProducts", error);
    res.status(500).json({
      success: false,
      message: "Error getting products",
    });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await sql`
        SELECT * FROM products
        WHERE id = ${id}`;
    res.status(200).json({
      success: true,
      data: product[0],
    });
  } catch (error) {
    console.log("Error getProduct", error);
    res.status(500).json({
      success: false,
      message: "Error getting product",
    });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image } = req.body;
  if (!name || !description || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all values",
    });
  }
  try {
    const newProduct = await sql`
      INSERT INTO products (name, description, price, image)
      VALUES (${name}, ${description}, ${price}, ${image})
      RETURNING *`;
    console.log("newProduct", newProduct);
    res.status(201).json({
      success: true,
      data: newProduct[0],
    });
  } catch (error) {
    console.log("Error createProduct", error);
    res.status(500).json({
      success: false,
      message: "Error creating product",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image } = req.body;
  try {
    const updateProduct = await sql`
    UPDATE products SET name=${name}, description=${description}, price=${price}, image=${image}
    WHERE id=${id}
    RETURNING *`;

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    console.log("updateProduct", updateProduct);
    res.status(200).json({
      success: true,
      data: updateProduct[0],
    });
  } catch (error) {
    console.log("Error updateProduct", error);
    res.status(500).json({
      success: false,
      message: "Error updating product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
      DELETE FROM products WHERE id=${id} RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    console.log("deletedProduct", deletedProduct);
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error deleteProduct", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
