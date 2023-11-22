const pool = require("../../db");
// const { Product } = require('../../models/product/productModel'); 

const viewProduct = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      title,
      owner_id,
      image,
      description,
      rating,
      postal_code,
      price_hourly,
      price_daily,
      price_weekly,
      price_monthly,
      product_longitude,
      product_latitude,
      category,
    } = req.body;
    // console.log(req.body);
    // console.log("title: " + title);

    const query = `
      INSERT INTO products
        (title, ownerId, image, description, rating, postalCode, priceHourly, priceDaily, priceWeekly, priceMonthly, prodLongitude, prodLatitude, category)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id;
    `;

    const values = [
      title,
      owner_id,
      image,
      description,
      rating,
      postal_code,
      price_hourly,
      price_daily,
      price_weekly,
      price_monthly,
      product_longitude,
      product_latitude,
      category,
    ];

    const result = await pool.query(query, values);
    const productId = result.rows[0].id;

    res.status(201).json({ productId });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      title,
      desc,
      rating,
      prodLongitude,
      prodLatitude,
      postalCode,
      priceHourly,
      priceDaily,
      priceWeekly,
      priceMonthly,
      image,
    } = req.body;

    const query = `
      UPDATE products
      SET
        title = $1,
        description = $2,
        rating = $3,
        prod_longitude = $4,
        prod_latitude = $5,
        postal_code = $6,
        price_hourly = $7,
        price_daily = $8,
        price_weekly = $9,
        price_monthly = $10,
        image = $11
      WHERE id = $12
      RETURNING *;
    `;

    const values = [
      title,
      desc,
      rating,
      prodLongitude,
      prodLatitude,
      postalCode,
      priceHourly,
      priceDaily,
      priceWeekly,
      priceMonthly,
      image,
      productId,
    ];

    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await pool.query('DELETE FROM products WHERE id = $1', [productId]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
    viewProduct,
    addProduct,
    updateProduct,
    deleteProduct,
};