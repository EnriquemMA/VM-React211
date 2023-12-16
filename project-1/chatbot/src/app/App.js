import { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';

// main application
const App = ({ handleLogout }) => {

  // states for messages, side-bar, id by chat and focus on input
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [finalId, setFinalId] = useState(0);
  const inputRef = useRef(null);

  // focus en input, to send the focus after everything
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  // sending a request, when the user enter a questions, do this
  const handleSend = async () => {
    // question in input
    const inputValue = document.getElementById('inputMessage').value;
    const newMessage = {
      role: "user",
      content: inputValue
    }
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    document.getElementById('inputMessage').value = '';
    // adding question to DB   
    handleNewChat(newMessage);
    // sending request
    await processMessage(inputValue);
    focusInput();
  }

  // catch the question and taking the answer
  async function processMessage(chatMessage) {
    try {
      const response = await fetch(
        "http://211.ics.compsci.cc:7122/api/converse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: chatMessage })
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const latestMessage = data.result[data.result.length - 1];
      // adding the answer to MongoDB         
      handleNewChat(latestMessage);
      setMessages((messages) => [...messages,
      {
        content: latestMessage.content,
        role: "assistant"
      },
      ]);
    } catch (error) {
      console.error('Error processing message:', error);
    }
    focusInput();
  }

  // showing all documents in side-bar stored in mongoDB
  const Load_Favourites = () => {
    fetch('http://211.ics.compsci.cc:8924/showChats', { method: 'GET' })
      .then(data => data.json())
      .then(json => {
        setChats(json);
        focusInput();
      })
      .catch(error => {
        console.error('Error al obtener los datos:', error);
      });
  }

  // buttom to add a new chat with different ID
  const handleNewIDChat = async () => {
    incID();            // increment the id by chat
    setMessages([]);    // cleaning the array messase to clean the screen
    focusInput();
  }

  // assinging +1 to the last ID by chat
  const incID = () => {
    fetch('http://211.ics.compsci.cc:8924/showChats', { method: 'GET' })
      .then(data => data.json())
      .then(json => {
        const maxId = json.reduce((max, item) =>
          (item.message_id > max ? item.message_id : max), 0);    // to get the last number of chats
        setFinalId(maxId + 1);
      });
  }

  // to create a new document or chat with values on Mongo
  const handleNewChat = (mess) => {
    fetch('http://211.ics.compsci.cc:8924/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message_id: finalId, who: mess.role, when: new Date(), dialog: mess.content }),
    })
      .then((response) => response.json())
      .then(() => {
        Load_Favourites();    // always every change I load the side-bar
        focusInput();
      });
  }

  // delete -purge, delete by complete all the DB
  const handleDelete = () => {
    fetch('http://211.ics.compsci.cc:8924/delete',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.ok) {
          //console.log('all documents deleted');                    
          Load_Favourites();
          setMessages([]);
        } else {
          throw new Error('Error trying to delete the docs');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    focusInput();
  }

  // if I select a chat from the side-bar, I show the message in the conversation screen, looking by ID
  const handleSelectChat = async (chatId) => {
    try {
      const response = await fetch(`http://211.ics.compsci.cc:8924/showByID/${chatId}`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // loading the new array with values selected by ID
      const formattedData = data.map(item => ({
        role: item.who,
        content: item.dialog
      }));
      setMessages(formattedData);
      focusInput();
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // use effect to take de ID updates, after every change loading the side-bar and focus in input
  useEffect(() => {
    incID();
    Load_Favourites();
    focusInput();
  }, []);

  // use effect to have the finalID updated
  useEffect(() => {
  }, [finalId]);

  // FRONTEND
  return (
    <div className="App">

      <section className="side-bar">
        <div>
          <button onClick={handleNewIDChat}> + New Chat</button>
        </div>
        <ul className='history' style={{ listStyleType: 'none' }}>
          {chats.map((myChat, i) => (
            myChat.who === 'assistant' ? (
              <li key={i} style={{ textAlign: 'left', padding: '5px' }}>
                <strong>
                  <label
                    style={{ color: 'White', fontSize: '16px', cursor: 'pointer' }}
                    onClick={() => handleSelectChat(myChat.message_id)}
                  >
                    {myChat.dialog.slice(0, 18)}
                  </label>
                </strong>
              </li>
            ) : null
          ))}
        </ul>
        <nav>
          <button onClick={handleDelete}> Delete </button>
          <button onClick={handleLogout}> Logout </button>
          <p> Chatbot </p>
          <p>&#9400;   by Victor Munoz   </p>
        </nav>
      </section>

      <section className="main">
        <div className="header">
          <h1>ICS211 - Chatbot</h1>
        </div>
        <ul className="history">
          {messages.map((message, i) => (
            <li key={i} className={message.role === 'user' ? 'userMessage' : 'botMessage'}>
              {message.role === 'user'
                ? <strong style={{ color: 'black' }}>You: </strong>
                : <strong style={{ color: 'white' }}>Chatbot: </strong>
              }
              {message.content}
            </li>
          ))}
        </ul>
        <div className='footer'>
          <input
            type="text"
            placeholder='Message Chatbot...'
            id="inputMessage"
            ref={inputRef}
          />
          <button onClick={handleSend}>Enter</button>        
        </div>
      </section>

    </div>
  );
}

export default App;