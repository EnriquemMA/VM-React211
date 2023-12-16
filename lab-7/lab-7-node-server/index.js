const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const my_favourite_items_model = require('./models');

const app = express();
const port = 8924;
app.use(cors());
app.use(express.json());

// to connect the DB
mongoose.connect('mongodb+srv://mongouser:YcEuRGwTtLHAsQtC@cluster0.qftm5ew.mongodb.net/ics211lab7?retryWrites=true&w=majority',
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

// load the documents using find
app.get('/fetchMyFavs', async (request, response) => {
  const my_favourite_items = await my_favourite_items_model.find({});
  response.send(my_favourite_items);
});

// to create a new record using create
app.post('/create', async (req, resp) => {
  try {
    const new_my_favourite_items = await my_favourite_items_model.create(req.body);    
    resp.send(new_my_favourite_items);
  } catch (error) {
    resp.status(500).send({ error: 'An error occurred' });
  }
});

// to delete a document using deleteOne or delete
app.delete('/delete/:id', async (req, resp) => {
  try {
    const idToDelete = req.params.id;
    const deletedItem = await my_favourite_items_model.deleteOne({ id: idToDelete });

    if (deletedItem) {
      resp.send(deletedItem);
    } else {
      resp.status(404).send({ error: 'Item not found' });
    }
  } catch (error) {
    resp.status(500).send({ error: 'An error occurred' });
  }
});

// to update the name of the movie using findOneAndUpdate or updateOne
app.put('/update/:id', async (req, resp) => {
  try {
    const idToUpdate = req.params.id;
    const newName = req.body.name;

    // looking for an element to modify
    const updatedItem = await my_favourite_items_model.findOneAndUpdate(
      { id: idToUpdate },
      { name: newName },
      { new: true }
    );

    if (updatedItem) {
      resp.send(updatedItem);
    } else {
      resp.status(404).send({ error: 'Item not found' });
    }
  } catch (error) {
    resp.status(500).send({ error: 'An error occurred' });
  }
});

// to show the port connected
app.listen(port, () => {
  console.log(`Lab 7 node server listening on port ${port}!`);
});