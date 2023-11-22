const pool = require("../../db");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds to use


//login
const login = async (req, res) => {
  //console.log(req.body);
    try {
      const { name, password } = req.body;
      //console.log(req.body);
      // TODO: Validate email and password inputs
      const hashedPassword = await hashPassword(password);
      // Assuming you have a users table with columns 'email' and 'password'
      const query = `
        SELECT * FROM people
        WHERE name = $1 AND password = $2;
      `;
      const values = [name, hashedPassword];
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 1) {
        // User found, login successful
        const token = jwt.sign({ name }, SECRET_KEY);
        res.status(200).json({ message: "Login successful", user: result.rows[0], token: token, loginType: "email" });
      } else {
        // User not found or invalid credentials
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

// Get all blog entries
const signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      //console.log(req.body);
  
      // TODO: Validate email and password inputs
  
      // Check if the user with the given email already exists
      const checkUserQuery = `
        SELECT * FROM people
        WHERE name = $1;
      `;
      const checkUserValues = [name];
  
      const existingUser = await pool.query(checkUserQuery, checkUserValues);
  
      if (existingUser.rows.length > 0) {
        // User with the provided email already exists
        return res.status(409).json({ error: "User already exists" });
      }
  
      // Assuming you have a 'users' table with columns 'email' and 'password'
      const signUpQuery = `
        INSERT INTO people (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      // Hash and salt the password before storing it in the database
      const hashedPassword = await hashPassword(password);
  
      const signUpValues = [name, email, hashedPassword];
  
      const newUser = await pool.query(signUpQuery, signUpValues);
  
      const token = jwt.sign({ name }, SECRET_KEY);
      res.status(201).json({ message: "Signup successful", user: newUser.rows[0], token: token, loginType: "email" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

// Get all blog entries
const signupGoogle = async (req, res) => {
  try {
    const { email } = req.body;

    // TODO: Validate email and password inputs

    // Check if the user with the given email already exists
    const checkUserQuery = `
      SELECT * FROM people
      WHERE email = $1;
    `;
    const checkUserValues = [email];

    try {
      const existingUser = await pool.query(checkUserQuery, checkUserValues);
      if (existingUser.rows.length > 0) {
        // User with the provided email already exists
        const token = jwt.sign({ email }, SECRET_KEY);
        return res.status(200).json({ message: "login successful", user: existingUser.rows[0], token: token, loginType: "google" });
      }
    } catch (error) {
      console.error('Error checking existing user:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }

    // Assuming you have a 'users' table with columns 'name', 'email', and 'password'
    const signUpQuery = `
      INSERT INTO people (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    // Assuming you want to insert an empty string for the 'name' and 'password' fields
    const signUpValues = ['', email, ''];

    try {
      const newUser = await pool.query(signUpQuery, signUpValues);
      const token = jwt.sign({ email }, SECRET_KEY);
      res.status(201).json({ message: "Signup successful", user: newUser.rows[0], token: token, loginType: "google" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ error: "Internal server error", details: error.message });
    }
  } catch (error) {
    console.error("Error in signupGoogle:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

  
  //Function to hash the password (you need to implement this based on your chosen library)
  const hashPassword = async (password) => {
    return password;
    // try {
    //   const salt = await bcrypt.genSalt(saltRounds);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   return hashedPassword;
    // } catch (error) {
    //   throw error;
    // }
  };
  

module.exports = {
  login,
  signup,
  signupGoogle,
};


// const { User } = require('../../models/user/userModel'); 
// const bcrypt = require('bcrypt');

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);

//     // TODO: Validate email and password inputs

//     const user = await User.findOne({
//       where: {
//         email,
//       },
//     });
    
//     if (user && bcrypt.compareSync(password, user.password)) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ error: 'Invalid credentials' });
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const signup = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // TODO: Validate email and password inputs

//     const existingUser = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return res.status(409).json({ error: 'User already exists' });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10);

//     const newUser = await User.create({
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({ message: 'Signup successful', user: newUser });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const signupGoogle = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // TODO: Validate email and password inputs

//     const existingUser = await User.findOne({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       return res.status(409).json({ message: 'Login successful' });
//     }

//     const newUser = await User.create({
//       email,
//     });

//     res.status(201).json({ message: 'Signup successful', user: newUser });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };