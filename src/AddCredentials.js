import React, { useState, createRef, useEffect } from 'react'
import { Alert, Button, InputGroup, Form, FormControl } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CryptoJS from 'crypto-js/crypto-js'


function AddCredentials(props) {

    let usernameInput = React.createRef();
    let passwordInput = React.createRef();
    let accountTitleInput = React.createRef();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [accountTitle, setAccountTitle] = useState();
    const [storedDataObject, setStoredDataObject] = useState(JSON.parse(localStorage.getItem('accounts')));
    const [triggerState, setTriggerState] = useState(false);

    // current user position within saved local storage object
    const [userPosition, setUserPosition] = useState(null);

    const fetchCredentials = () => {
        findCurrentUser();
        setTriggerState(true);
        setUsername(usernameInput.current.value);
        setPassword(passwordInput.current.value);
        setAccountTitle(accountTitleInput.current.value);
    }

    // try to find where current user's object (data) is located
    const findCurrentUser = () => {
        for(let i = 0; i < storedDataObject.length; i++){
            if(storedDataObject[i]["username"] == props.currentUser){
                setUserPosition(i);
            }
        }
        // if(userPosition < 0)
    }

    // PROBLEM: WHEN ADDING A NEW USER AFTER ADDING ACCOUNTS CAUSES WEBSITE TO CRASH, fix formatting of data in local storage.
    const saveData = (stored_data_object, user_position, trigger_state) => {
        if(trigger_state){
            // storedDataObject[userPosition].data = newDataObject;
            let fetchedDataObject = stored_data_object[user_position];
            let dataContents;

            if ('data' in fetchedDataObject){
                dataContents = decrypt(fetchedDataObject.data, props.password);
            }
            // if there are no saved accounts
            if(user_position != null && (dataContents == undefined || dataContents.indexOf("[") < 0)){
                fetchedDataObject.data = encrypt(`[{"account_title":"${accountTitle}","account_name":"${username}","account_password":"${password}"}]`, props.password);
                stored_data_object[userPosition] = fetchedDataObject;
                localStorage.setItem('accounts', JSON.stringify(stored_data_object))
                setStoredDataObject(JSON.parse(localStorage.getItem('accounts')))
            }
            // if there are saved accounts
            else if(dataContents.indexOf("]") > 0){
                fetchedDataObject.data = decrypt(fetchedDataObject.data, props.password);
                fetchedDataObject.data = fetchedDataObject.data.replace("]", `,{"account_title":"${accountTitle}","account_name":"${username}","account_password":"${password}"}]`)
                fetchedDataObject.data = encrypt(fetchedDataObject.data, props.password)
                stored_data_object[userPosition] = fetchedDataObject;
                localStorage.setItem('accounts', JSON.stringify(stored_data_object))
                setStoredDataObject(JSON.parse(localStorage.getItem('accounts')))
            }
            else{
                console.log('else block')
            }
            props.refreshAccounts();
        }
    }

    const decrypt = (ciphertext, key) => {
        let output = CryptoJS.AES.decrypt(ciphertext, key)
        output = CryptoJS.enc.Utf8.stringify(output);
        return output;
    }

    const encrypt = (text, key) => {
        let output = CryptoJS.AES.encrypt(text, key).toString()
        return output;
    }

    useEffect(()=>{
        saveData(storedDataObject, userPosition, triggerState);
        setStoredDataObject(JSON.parse(localStorage.getItem('accounts')))
    }, [username, password, accountTitle, userPosition, triggerState])

    return (
        <Alert>
            <span>Add New Account</span>
            <hr></hr>
            <div>Add a new account to store in the password manager!</div>
            <hr></hr>
            <Form.Label>Name of Account/Service</Form.Label>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <FormControl
                    placeholder="Netflix, Google, Apple..."
                    aria-label="Name"
                    aria-describedby="basic-addon1"
                    ref={accountTitleInput}
                />
            </InputGroup>

            <Form.Label>Username / Email</Form.Label>
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
            <Button onClick={fetchCredentials}>Save</Button>
        </Alert>
    )
}

export default AddCredentials