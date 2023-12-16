// comment
import React from 'react';
import { connect } from 'react-redux';
import { setUser, logout } from './userSlice';

const MyComponent = ({ user, setUser, logout }) => {
    const[userName, setUserName] = React.useState("");
    const [userPassword, setUserPassword] = React.useState("");

    const login = () => {
        if (userName === "Victor" && userPassword === "123") {
            setUser({ name: 'Victor' });
        } else {
            setUserName("");
            setUserPassword("");
        }
    }

    return (
        <div>
            <p>User: {user ? user.name : 'Guest'}</p>
            {!user ?
                <>
                    <input type="text" onChange={(e) => { setUserName(e.target.value); } }
                        placeholder='Enter username' value={userName} />
                    <input type="password" onChange={(e) => { setUserPassword(e.target.value); } }
                        placeholder="Enter password" value={userPassword} />
                    <button onClick={login}>Login</button>
                </>
                : <button onClick={logout}>Logout</button>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};
export default connect(mapStateToProps, { setUser, logout })(MyComponent);
