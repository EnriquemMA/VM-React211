import my_user_model from "../../models";
import db_connect from "../../db-connection";
const db = db_connect();
const { DateTime } = require('luxon');


export default async function handler(req, res) {
  // handle GET request to this endpoint
  if (req.method == "POST") {
    const user_name = req.body.user_name;
    const user_password = req.body.user_password;

    if (!user_name || !user_password) {
      res.status(200).json({ authenticated: false, reason: "User_name or User_password is blank" })
      return;
    }
    else {
      // what to query our database for
      const user_query = { username: user_name, password: user_password };
      const user_query_results = await my_user_model.find(user_query);

      // if the first result matches our passed in user_name, then it must match
      if (user_query_results[0]?.username === user_name) {
        
        // updating the last login from the user       
        const currentDate = new Date();
        const vancouverTime = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Vancouver' }).format(currentDate); 
        console.log(currentDate);       
        const userUpdate = user_query_results[0];
        userUpdate.lastAccess = vancouverTime;
        await userUpdate.save();

        res.status(200).json({ authenticated: true, account: user_query_results[0] })
      } else {
        res.status(200).json({ authenticated: false, reason: "Invalid Credentials" })
      }
    }
    // if the request method is not implemented, output a message
  } else {
    res.status(200).send(`${req.method} not implemented`);
  }

}