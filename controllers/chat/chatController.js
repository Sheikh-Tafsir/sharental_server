const pool = require("../../db");
const { ChatModel } = require('../../models/chat/chatModel'); 

    const getMessage = async (req, res) => {
    //console.log(req.body);
      try {
        // const { _id, sendBy, sendTo, message, createdAt } = req.body;
        const {sendBy, sendTo} = req.body;
        //console.log(req.body);
        // TODO: Validate email and password inputs
        
        const query = `
            SELECT * FROM chats
            WHERE (send_by = $1 AND send_to = $2) OR (send_by = $2 AND send_to = $1);
        `;
        const values = [sendBy, sendTo];
    
        const result = await pool.query(query, values);
        const chatModel = result.rows.map(row => new ChatModel(row));
        res.status(200).json({ message: "message collected", chats: chatModel });
        
      } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    };

    const sendMessage = async (req, res) => {
        try {
          const { sendBy, sendTo, message, createdAt } = req.body;
          
          const query = `
            INSERT INTO chats 
              (send_by, send_to, message, created_at) 
            VALUES 
              ($1, $2, $3, $4) RETURNING id;
          `;
          const values = [sendBy, sendTo, message, createdAt];
      
          const result = await pool.query(query, values);
          const chatId = result.rows[0].id;
          
          res.status(201).json({ message: "message sent", _id:chatId});
        } catch (error) {
          console.error("Error during login:", error);
          res.status(500).json({ error: "Internal server error" });
        }
      };

    // const sendMessage = async (data) => {
    //   try {
    //     const { sendBy, sendTo, message, createdAt } = data;
    
    //     const query = `
    //       INSERT INTO chats 
    //         (send_by, send_to, message, created_at) 
    //       VALUES 
    //         ($1, $2, $3, $4) RETURNING id;
    //     `;
    //     const values = [sendBy, sendTo, message, createdAt];
    
    //     const result = await pool.query(query, values);
    //     const chatId = result.rows[0].id;
    
    //     return { message: "message sent", _id: chatId };
    //   } catch (error) {
    //     console.error("Error during sending message:", error);
    //     throw error;
    //   }
    // };

    module.exports = {
        getMessage,
        sendMessage,
    };
