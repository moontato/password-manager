import React, { useEffect, useState } from 'react'
import { Alert, Button, Dropdown, Form, FormControl } from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ListAccounts() {
    const [accounts, setAccounts] = useState(JSON.parse(localStorage.getItem("accounts")));

    // const updateList = () => {
    //     window.addEventListener('storage', (e)=>{
    //         console.log(e)
    //     })
    // }

    // window.addEventListener('storage', () => {
    //     // When local storage changes, dump the list to
    //   https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event  // the console.
    //     console.log(accounts);
    // });

    // useEffect(()=>{
    //     window.addEventListener('storage', ()=>{
    //         console.log('changed!')
    //     })
    // })

    return (
        <>
            {accounts.map(acc => <Dropdown.Item href={'#/' + acc['username']} key={acc['username']}>{acc['username']}</Dropdown.Item>)}
            {/* {updateList()} */}
        </>
    )
}

export default ListAccounts