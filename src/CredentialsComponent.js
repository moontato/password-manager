import React, { useEffect, useState } from 'react'
import { Alert, Button } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCredentials from './AddCredentials';
import AccountsGrid from './AccountsGrid';

import CryptoJS from 'crypto-js/crypto-js'


function CredentialsComponent(props) {

    const [addCredentials, setAddCredentials] = useState(false);
    const [storedDataObject, setStoredDataObject] = useState(JSON.parse(localStorage.getItem('accounts')));
    const [userPosition, setUserPosition] = useState(null);

    const encrypt = (text, key) => {
        let output = CryptoJS.AES.encrypt(text, key).toString()
        return output;
    }

    const decrypt = (ciphertext, key) => {
        let output = CryptoJS.AES.decrypt(ciphertext, key)
        output = CryptoJS.enc.Utf8.stringify(output);
        return output;
    }

    const handleAddCredentials = () => {
        if(addCredentials){
            setAddCredentials(false);
        }
        else{
            setAddCredentials(true);
        }
    }

    const fetchUserPosition = (user_position) => {
        setUserPosition(user_position);
    }

    const refreshAccounts = (updated_object) => {
        if(updated_object == null){
            setStoredDataObject(JSON.parse(localStorage.getItem('accounts')));
        }
        else{
            // console.log(updated_object)
            // console.log(storedDataObject[userPosition])
            let modifiedDataObject = storedDataObject;
            // console.log(modifiedDataObject[userPosition].data == updated_object)
            console.log(storedDataObject[userPosition].data)
            modifiedDataObject[userPosition].data = updated_object;
            // console.log(storedDataObject)
            console.log(storedDataObject)
            setStoredDataObject(modifiedDataObject);
            accountsGrid(storedDataObject)
            // setStoredDataObject()
        }
    }

    const accountsGrid = (stored_data_object) => {
        console.log(stored_data_object)
        return (<AccountsGrid storedDataObject={stored_data_object} password={props.password} refreshAccounts={refreshAccounts} fetchUserPosition={fetchUserPosition}></AccountsGrid>)
    }

    // const updateAccounts = (position) => {
    //     console.log(position)
    // }

    useEffect(()=>{
        console.log(storedDataObject)
        accountsGrid(storedDataObject)
    }, [storedDataObject])

    return (
        <Alert>
            <Button onClick={handleAddCredentials} style={{marginBottom: "2%"}}>Add Account</Button>
            {addCredentials? <AddCredentials currentUser={props.currentUser} refreshAccounts={refreshAccounts} password={props.password}/>: null}
            {/* <AccountsGrid storedDataObject={storedDataObject} password={props.password} refreshAccounts={refreshAccounts} fetchUserPosition={fetchUserPosition}></AccountsGrid> */}
            {accountsGrid(storedDataObject)}
        </Alert>
    )
}

export default CredentialsComponent