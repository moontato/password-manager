import React, { useEffect, useState } from 'react'
import { Alert, Button } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCredentials from './AddCredentials';
import AccountsGrid from './AccountsGrid';

function CredentialsComponent(props) {

    const [addCredentials, setAddCredentials] = useState(false);
    const [storedDataObject, setStoredDataObject] = useState(JSON.parse(localStorage.getItem('accounts')));
    const [refresh, setRefresh] = useState(0);

    const handleAddCredentials = () => {
        if(addCredentials){
            setAddCredentials(false);
        }
        else{
            setAddCredentials(true);
        }
    }

    const refreshAccounts = () => {
        setStoredDataObject(JSON.parse(localStorage.getItem('accounts')));
    }

    useEffect(()=>{
        console.log(props.password)
    })

    return (
        <Alert>
            <Button onClick={handleAddCredentials} style={{marginBottom: "2%"}}>Add Account</Button>
            {addCredentials? <AddCredentials currentUser={props.currentUser} refreshAccounts={refreshAccounts} password={props.password}/>: null}
            <AccountsGrid storedDataObject={storedDataObject} password={props.password}></AccountsGrid>
        </Alert>
    )
}

export default CredentialsComponent