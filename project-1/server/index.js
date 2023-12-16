// mounting the server for the resquet
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const my_conversation_model = require('./models');

const app = express();
const port = 8924;
app.use(cors());
app.use(express.json());

// to connect the DB
mongoose.connect('mongodb+srv://mongouser:YcEuRGwTtLHAsQtC@cluster0.qftm5ew.mongodb.net/ics211_chatbot?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", function () {
  console.log("Connection Successfully");
});

// configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// to get all the documents on the db
app.get('/showChats', async (request, response) => {
  const my_chats = await my_conversation_model.find({});
  response.send(my_chats);
});

// to create a new record into the collection
app.post('/create', async (req, resp) => {
  try {
    const new_chats = await my_conversation_model.create(req.body);    
    resp.send(new_chats);
  } catch (error) {
    resp.status(500).send({ error: 'An error occurred' });
  }
});

// to delete all the conversations on the db
app.delete('/delete', async (req, res) => {
  try {
    const deletedItems = await my_conversation_model.deleteMany({});
    if (deletedItems.deletedCount > 0) {
      res.send({ message: 'Messages deleted...' });
    } else {
      res.status(404).send({ error: 'There is nothing to delete' });
    }
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).send({ error: 'An error occurred while deleting documents' });
  }
});

// looking by ID the conversations 
app.get('/showByID/:id', async (req, resp) => {
  try {
    const idToShow = req.params.id;    
    const itemToShow = await my_conversation_model.find({ message_id: idToShow }); 
    if (itemToShow && itemToShow.length > 0) {
      resp.send(itemToShow);      
    } else {
      resp.status(404).send({ error: 'Item not found' });
    }
  } catch (error) {
    resp.status(500).send({ error: 'An error occurred' });
  }
});

// to show the port connected
app.listen(port, () => {
  console.log(`Final Project node server listening on port ${port}!`);
});