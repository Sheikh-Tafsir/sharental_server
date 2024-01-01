const pool = require("../../db");
const { ProductModel } = require('../../models/product/productModel'); 

const viewProduct = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    const inventoryItems = result.rows.map(row => new ProductModel(row));
    res.json(inventoryItems);
    // res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      title,
      ownerId,
      image,
      description,
      postalCode,
      priceHourly,
      priceDaily,
      priceWeekly,
      priceMonthly,
      productLongitude,
      productLatitude,
      category,
    } = req.body;
    //console.log(req.body);
    // console.log("title: " + title);

    const query = `
      INSERT INTO products
        (title, owner_id, image, description, rating, postal_code, price_hourly, price_daily, price_weekly, price_monthly, product_longitude, product_latitude, category)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id;
    `;
    //const query = ``;

    const values = [
      title,
      ownerId,
      image,
      description,
      0,
      postalCode,
      priceHourly,
      priceDaily,
      priceWeekly,
      priceMonthly,
      productLongitude,
      productLatitude,
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
    const id = req.params.id;
    const {
      title,
      image,
      description,
      postalCode,
      priceHourly,
      priceDaily,
      priceWeekly,
      priceMonthly,
    } = req.body;
    console.log(req.body);

    const query = `
      UPDATE products
      SET
        title = $1,
        image = $2,
        description = $3,
        postal_code = $4,
        price_hourly = $5,
        price_daily = $6,
        price_weekly = $7,
        price_monthly = $8
      WHERE id = $9
      RETURNING *;
    `;

    const values = [
      title,
      image,
      description,
      postalCode,
      priceHourly,
      priceDaily,
      priceWeekly,
      priceMonthly,
      id,
    ];
    //console.log(values);

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    await pool.query('DELETE FROM products WHERE id = $1', [id]);

    res.status(200).json({ message: 'Product deleted successfully' });
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