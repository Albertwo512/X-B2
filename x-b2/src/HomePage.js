import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Parse from 'parse/dist/parse.min.js';
import React, { useEffect, useState } from 'react';
import { useAuth } from './Auth';
import { Post } from './CreatePost';

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
            {currentUser ? (
                <div >
                    <div className='postPage'>
                        <Post />
                    </div>

                    <h2 className="heading">{`Hello ${currentUser.get('username')}!`}</h2>
                    <div className="form_buttons">

                        <Button
                            onClick={doUserLogOut}

                            className=" button-top-right"
                            color="#3f6600"
                            size="large"
                        >
                            logOut<LogoutOutlined />
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
