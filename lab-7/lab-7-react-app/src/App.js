//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

// call my main funtion
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Favourites Movies</h1>
        <h2>&#9400;   by Victor Munoz   </h2>
        <MyFavourites />
      </header>
    </div>
  );
}

// main function
const MyFavourites = () => {
  const [MyFavouritesItems, setMyFavouritesItems] = useState([]);

  // to add a new name and url
  const [newItemName, setNewItemName] = useState(''); 
  const [newItemUrl, setNewItemUrl] = useState(''); 

  // showing all documents
  const Load_Favourites = () => {
    fetch('http://211.ics.compsci.cc:8924/fetchMyFavs', { method: 'GET' })
      .then(data => data.json())
      .then(json => {
        setMyFavouritesItems(json);
      });
  }

  // to create a new document
  const AddNewItem = () => {
    fetch('http://211.ics.compsci.cc:8924/fetchMyFavs', { method: 'GET' })
      .then(data => data.json())
      .then(json => {
        setMyFavouritesItems(json);

        // looking for the last id added
        const maxId = json.reduce((max, item) => (item.id > max ? item.id : max), 0);
        //console.log('Valor máximo de id:', maxId);

        fetch('http://211.ics.compsci.cc:8924/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: maxId + 1, name: newItemName, url: newItemUrl }),
        })
          .then((response) => response.json())
          .then(() => {
            Load_Favourites();
            setNewItemName('');
            setNewItemUrl('');
          });
      });
  };

  // to delete a document by id
  const DeleteItemSel = (itemId) => {
    fetch(`http://211.ics.compsci.cc:8924/delete/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((response) => response.json())
      .then(() => {
        Load_Favourites();
      })
      .catch((error) => {
        console.error('Error al eliminar el elemento:', error);
      });
  };

  // to update the info into movie name
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItemName, setEditedItemName] = useState('');

  const startEditing = (itemId, itemName) => {
    setEditingItemId(itemId);
    setEditedItemName(itemName);
  };

  const updateItemName = (itemId, newName) => {
    fetch(`http://211.ics.compsci.cc:8924/update/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => response.json())
      .then(() => {
        Load_Favourites();
        setEditingItemId(null);
        setEditedItemName(' ');
      })
      .catch((error) => {
        console.error('Error updating the element:', error);
      });
  };

  // using useEffect to loading the documents
  useEffect(() => {
    Load_Favourites();
  }, []);

  // creating the site
  return (
    <div>
      {MyFavouritesItems.length === 0 ? (
        <button onClick={Load_Favourites}>Load</button>
      ) : (
        <div>
          <table>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th>Name</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {MyFavouritesItems.map(myItem => (
                <tr key={myItem.id}>
                  <td>
                    {editingItemId === myItem.id ? (
                      <div>
                        <input
                          type="text"
                          value={editedItemName}
                          onChange={(e) => setEditedItemName(e.target.value)}
                          onBlur={() => updateItemName(myItem.id, editedItemName)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              updateItemName(myItem.id, editedItemName);
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={editingItemId === myItem.id ? editedItemName : myItem.name}
                        onChange={(e) => setEditedItemName(e.target.value)}
                        readOnly={!editingItemId === myItem.id}
                        onClick={() => startEditing(myItem.id, myItem.name)}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                  </td>
                  <td style={{ textAlign: 'left' }}>
                    <a href={myItem.url} target="_blank" style={{ color: 'white', fontSize: '16px' }}>{myItem.url}</a>
                  </td>
                  <td>
                    <button onClick={() => DeleteItemSel(myItem.id)} style={{ backgroundColor: 'green', color: 'white' }}>DELETE</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </td>
                <td style={{ textAlign: 'left' }}>
                  <input
                    type="text"
                    placeholder="URL"
                    value={newItemUrl}
                    onChange={(e) => setNewItemUrl(e.target.value)}
                  />
                </td>
                <td>
                  <button onClick={() => AddNewItem()} style={{ backgroundColor: 'red', color: 'white' }}>ADD</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

}

export default App;
