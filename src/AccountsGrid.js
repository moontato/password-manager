import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js/crypto-js'
import { Alert, Button, Row, Col } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import CredentialCard from './CredentialCard';

function AccountsGrid(props) {
    const [storedDataObject, setStoredDataObject] = useState(props.storedDataObject)
    const [decryptedData, setDecryptedData] = useState(null);
    const [userPosition, setUserPosition] = useState();
    const [savedAccounts, setSavedAccounts] = useState(null);
    const [password, setPassword] = useState(props.password);

    const findCurrentUser = () => {
        for(let i = 0; i < storedDataObject.length; i++){
            if(storedDataObject[i]["username"] == sessionStorage.getItem('currentUser')){
                setUserPosition(i);
                props.fetchUserPosition(i);
            }
        }
    }

    const encrypt = (text, key) => {
        let output = CryptoJS.AES.encrypt(text, key).toString()
        return output;
    }

    const decrypt = (ciphertext, key) => {
        let output = CryptoJS.AES.decrypt(ciphertext, key)
        output = CryptoJS.enc.Utf8.stringify(output);
        return output;
    }

    // For every object in array, make a card for it in the DOM
    useEffect(()=>{

        if(storedDataObject == null){
            setStoredDataObject(props.storedDataObject)
        }
        console.log(props.storedDataObject)
        console.log(storedDataObject)
        let dataExists = false;

        findCurrentUser();

        if(userPosition != undefined){
            // if data for this user exists
            if(JSON.stringify(storedDataObject[userPosition]).indexOf('data') > -1){
                dataExists = true;
            }
            // if user position is known and data hasn't been decrypted yet, or if props updates and states must update accordingly
            if(dataExists && (decryptedData == null || decryptedData != decrypt(storedDataObject[userPosition].data, password))){
                setDecryptedData(decrypt(storedDataObject[userPosition].data, password));      
            }
        }
        // if savedAccounts array is not updated with newest values, update savedAccounts
        if(decryptedData != null && JSON.stringify(savedAccounts) != decryptedData){
            setSavedAccounts(JSON.parse(decryptedData));

            // clear sessionStorage so that password cannot be retrieved after cards are loaded
            // sessionStorage.clear()
        }
        if(savedAccounts != null){
            console.log(savedAccounts)
            // props.refreshAccounts(encrypt(JSON.stringify(savedAccounts), password))
        }
    }, [storedDataObject, userPosition, decryptedData, savedAccounts])

    const mapAccounts = (accounts_array) => {
        let index_position = 0;
        if(accounts_array != null){
            return(accounts_array.map(acc => <Col key={acc.account_title} xs={6} md={3}><CredentialCard position={index_position++} title={acc.account_title} name={acc.account_name} password={acc.account_password} deleteCredentials={deleteCredentials}></CredentialCard></Col>));
        }
    }

    const checkForUpdates = () => {
        if(props.storedDataObject != storedDataObject){
            setStoredDataObject(props.storedDataObject)
        }
        // console.log(props.storedDataObject)
    }

    

    const deleteCredentials = (position) => {
        let modifiedAccounts = savedAccounts;
        savedAccounts.splice(position, 1)
        setSavedAccounts(modifiedAccounts);
        console.log(modifiedAccounts)
        // console.log(encrypt(JSON.stringify(modifiedAccounts), password))
        props.refreshAccounts(encrypt(JSON.stringify(modifiedAccounts), password))
        // console.log(savedAccounts[position])
    }

    return (
        <div>
            {checkForUpdates()}
            <Row>
                {mapAccounts(savedAccounts)}
            </Row>
        </div>
    )
}

export default AccountsGrid