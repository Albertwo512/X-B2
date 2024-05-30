import { Button } from 'antd';
import Parse from 'parse/dist/parse.min.js';
import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth';

const HomePage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    const user = await Parse.User.current();
    if (user) {
      setCurrentUser(user);
    }
  };

  console.log('User in HomePage:', currentUser);
  const doUserLogOut = async () => {
    try {
      await Parse.User.logOut();
      alert('Success! No user is logged in anymore!');
      auth.signout(() => {
        setCurrentUser(null);
      });
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  return (
    <div className="App-header">
      <h1>Home</h1>
      {currentUser ? (
        <div >
          <h2 className="heading">User Screen</h2>
          <h2 className="heading">{`Hello ${currentUser.get('username')}!`}</h2>
          <div className="form_buttons">
            <Button
              onClick={doUserLogOut}
              type="primary"
              className="form_button"
              color="#3f6600"
              size="large"
            >
              Log Out
            </Button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );


};

export { HomePage };
