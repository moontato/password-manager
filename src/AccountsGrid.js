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
            }
        }
    }

    const decrypt = (ciphertext, key) => {
        let output = CryptoJS.AES.decrypt(ciphertext, key)
        output = CryptoJS.enc.Utf8.stringify(output);
        return output;
    }

    // For every object in array, make a card for it in the DOM
    useEffect(()=>{
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
    }, [storedDataObject, userPosition, decryptedData, savedAccounts])

    const mapAccounts = (accounts_array) => {
        if(accounts_array != null){
            return(accounts_array.map(acc => <Col key={acc.account_title} xs={6} md={3}><CredentialCard title={acc.account_title} name={acc.account_name} password={acc.account_password}></CredentialCard></Col>));
        }
    }

    const checkForUpdates = () => {
        if(props.storedDataObject != storedDataObject){
            setStoredDataObject(props.storedDataObject)
        }
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