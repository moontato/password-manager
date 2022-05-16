import React, { useEffect, useState } from 'react'
import { Alert, Button, Dropdown, Form, FormControl } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListAccounts(props) {
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem("accounts")));
    // default value will be added to list if no accounts exist
    const [usernameState, setUsernameState] = useState(props.usernameState);
    const [defaultValue, setDefaultValue] = useState("no accounts");

    const mapAccounts = () => {
        // setUsernameState(props.usernameState)
        if(accounts == null){
            setAccounts([{username: defaultValue}]);
        }
        else{
            return(accounts.map(acc => <Dropdown.Item href={'#/' + acc['username']} key={acc['username']} default={defaultValue}>{acc['username']}</Dropdown.Item>))
        }
    }

    useEffect(()=>{
        if(usernameState != props.usernameState){
            setUsernameState(props.usernameState)
            setAccounts(JSON.parse(localStorage.getItem("accounts")))
        }
        mapAccounts()
    })

    return (
        <>
            {mapAccounts()}
            {/* {updateList()} */}
        </>
    )
}

export default ListAccounts