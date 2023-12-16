import React from 'react';
import { connect } from 'react-redux';
import { setUser, logout } from './user-slice';
import App from '../src/app/App';

const AuthenticateUser = ({ user, setUser, logout }) => {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [wrong, setWrong] = React.useState(false);  

  const login = async () => {
    const user_query = { user_name: userName, user_password: userPassword };  

    // sending my user & paswword to the DB 
    await fetch("http://211.ics.compsci.cc:7122/api/test-endpoint",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user_query)
      }).then(response => response.json())
      .then(json => {
        if (json.authenticated === true) {
          setUser(json.account);
          setWrong(false);   

        } else {
          setWrong(true);
          setUserName("");
          setUserPassword("");
        }
      });        
  }

  // how to handle and buttom logout, cleaning inputs, tihs component I send to APP.js
  const handleLogout = () => {
    setUserName("");
    setUserPassword("");
    logout();
  };

  return (
    <div>
      {user && <App handleLogout={handleLogout} />}
      {!user ?
        <div className='AuthenticateUser'>
          <p>User:</p>
          <input className='loginInput' 
            type="text" 
            onChange={(e) => { setUserName(e.target.value); }} 
            placeholder="Enter username" 
            value={userName} />
          <input className='loginInput' 
            type="password" 
            onChange={(e) => { setUserPassword(e.target.value); }} 
            placeholder="Enter password" 
            value={userPassword} />
          <button onClick={login}>Login</button>
          {wrong && <p>Password or User incorrect!</p>}
        </div>
        : ''
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { setUser, logout })(AuthenticateUser);