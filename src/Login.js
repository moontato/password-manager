import React, { useState, createRef, useEffect } from 'react'
import CreateAccount from './CreateAccount';
import { Alert, Button, Dropdown, Form, FormControl } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha256 from 'crypto-js/sha256';

import ListAccounts from './ListAccounts';

/* 
    localStorage = {accounts: 
        '[
            {"username":"bigstar", "password":"(key)"},
            {"username":"user2", "password":"(key)"}
        ]'}
*/


function Login(props) {
    // check if loginState is really being passed down
    const [loginState, setLoginState] = useState(props.loginState);
    let passwordInput = createRef();
    // flags
    const [attemptedLogin, setAttemptedLogin] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);

    const [savedAccounts, setSavedAccounts] = useState(JSON.parse(localStorage.getItem('accounts')));
    const [usernameState, setUsernameState] = useState(null);
    const [username, setUsername] = useState("Select Account");
    const [password, setPassword] = useState();
    const [defaultValue, setDefaultValue] = useState("no accounts");
    // const [unencryptedPassword, setUnencryptedPassword] = useState();

    const handleLogin = () => {
        // parsing string of saved accounts array
        setSavedAccounts(JSON.parse(localStorage.getItem('accounts')));
        // set inputted password state
        setPassword(sha256(passwordInput.current.value));
        // verify user interaction
        setAttemptedLogin(true);
    }

    const handleCreateAccount = () => {
        if(createAccount){
            setCreateAccount(false);
        }
        else{
            setCreateAccount(true);
        }
    }

    const userSelection = (e) => {
        // split the string contained within component
        setUsername(e.split("#/")[1]);
    }

    const updateList = (username_input) => {
        setUsernameState(username_input);
    }

    const authentication = () => {
        if(attemptedLogin && username != defaultValue){
            let flag = false;
            for(let currentAccount = 0; currentAccount < savedAccounts.length; currentAccount++){
                if(username != "Select Account" && ((username == savedAccounts[currentAccount].username) && (password == savedAccounts[currentAccount].password))){
                    sessionStorage.setItem('currentUser', username);
                    // sessionStorage.setItem('password', passwordInput.current.value)
                    props.savePassword(passwordInput.current.value)
                    props.handleLogin(username);
                    flag = true;
                }
            }
            if(!flag){
                window.alert("Incorrect username/password!");
            }
        }
        else if(attemptedLogin && username == defaultValue){
            window.alert("No saved accounts to list. Create a new account?")
        }
    }

    useEffect(()=>{
        authentication()
    }, [usernameState, password])

    return (
        <div>
            <Alert variant='secondary'>
            <Dropdown onSelect={(e)=>{userSelection(e)}}>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                    {username}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <ListAccounts usernameState={usernameState}></ListAccounts>
                </Dropdown.Menu>
            </Dropdown>
                <fieldset>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control ref={passwordInput} id="passwordInput" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    </Form.Group>
                    <Button onClick={handleLogin}>Log In</Button>
                    <Button onClick={handleCreateAccount}>Create Account</Button>
                    </fieldset>
            </Alert>
            {createAccount? <CreateAccount updateList={updateList}></CreateAccount>: null}
        </div>
    )
}

export default Login