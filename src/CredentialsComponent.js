import React, { useEffect, useState } from 'react'
import { Alert, Button } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCredentials from './AddCredentials';
import AccountsGrid from './AccountsGrid';

function CredentialsComponent(props) {

    const [addCredentials, setAddCredentials] = useState(false);
    const [storedDataObject, setStoredDataObject] = useState(JSON.parse(localStorage.getItem('accounts')));

    const handleAddCredentials = () => {
        if(addCredentials){
            setAddCredentials(false);
        }
        else{
            setAddCredentials(true);
        }
    }

    const refreshAccounts = (updated_object) => {
        if(updated_object == null){
            setStoredDataObject(JSON.parse(localStorage.getItem('accounts')));
        }
        else{
            console.log(updated_object)
            console.log()
        }
    }

    // const updateAccounts = (position) => {
    //     console.log(position)
    // }

    useEffect(()=>{
        console.log(props.password)
    })

    return (
        <Alert>
            <Button onClick={handleAddCredentials} style={{marginBottom: "2%"}}>Add Account</Button>
            {addCredentials? <AddCredentials currentUser={props.currentUser} refreshAccounts={refreshAccounts} password={props.password}/>: null}
            <AccountsGrid storedDataObject={storedDataObject} password={props.password} refreshAccounts={refreshAccounts}></AccountsGrid>
        </Alert>
    )
}

export default CredentialsComponent