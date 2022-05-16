import React, { useState, createRef, useEffect } from 'react'
import { Alert, Button, InputGroup, Form, FormControl } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha256 from 'crypto-js/sha256';

function CreateAccount(props) {
    // references to get input from text input fields
    let usernameInput = createRef();
    let passwordInput = createRef();
    // boolean to prevent automatic rendering from attempting to log in
    const [attemptedSignUp, setAttemptedSignUp] = useState(false);
    // states used to store username and password
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleClick = () => {
        // user is trying to log in (not an auto re-render)
        setAttemptedSignUp(true);
        // set credential states to input values
        setUsername(usernameInput.current.value);
        setPassword(sha256(passwordInput.current.value));
    }

    useEffect(()=>{
        let savedAccounts = localStorage.getItem('accounts');
        // if there are no accounts saved
        if(attemptedSignUp && savedAccounts == undefined){
            savedAccounts = `[{"username":"${username}","password":"${password}"}]`
            localStorage.setItem('accounts', savedAccounts);
            props.updateList(username)
        }
        // if there are accounts saved, check for duplicates then add
        else if(attemptedSignUp && !savedAccounts.includes(`"username":"${username}"`)){
            savedAccounts = savedAccounts.replace("]","");
            savedAccounts = `${savedAccounts},{"username":"${username}","password":"${password}"}]`
            localStorage.setItem('accounts', savedAccounts)
            props.updateList(username)
            // window.location.reload();
        }
        else{
            console.log(false)
        }
    })

    return (
        <div>
            <Alert variant='secondary'>
                <span>Create Account</span>
                <hr></hr>
                <Form.Label>Username</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        ref={usernameInput}
                    />
                </InputGroup>

                <Form.Label>Password</Form.Label>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">*</InputGroup.Text>
                    <FormControl
                        placeholder="Password"
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        ref={passwordInput}
                    />
                </InputGroup>
                <Button onClick={handleClick}>Create Account</Button>
            </Alert>
        </div>
    )
}

export default CreateAccount