import logo from './logo.svg';
import React, { useEffect, useState } from 'react'
import './App.css';
import Login from './Login';
import CredentialsComponent from './CredentialsComponent';
import AccountsGrid from './AccountsGrid';


function App() {
  const [loginState, setLoginState] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [password, setPassword] = useState(null);
  // const [creatingAccount, setCreatingAccount] = useState(true);

  const handleLogin = (current_user) => {
    setCurrentUser(current_user)
    setLoginState(true);
  }

  const savePassword = (password_input) => {
    setPassword(password_input)
  }

  // const refreshPage = () => {
  //   window.location.reload();
  // }

  useEffect(() => {
    console.log(password)
  }, [password])

  return (
    <div className="App">
      {/* only render login box if loginState is false */}
      {loginState? null : <Login handleLogin={handleLogin} loginState={loginState} savePassword={savePassword}/>}
      {(loginState && password != null)? <CredentialsComponent currentUser={currentUser} password={password}></CredentialsComponent>: null}
    </div>
  );
  // }
}

export default App;

/* 
TO DO:

  Encrypt stored passwords => decrypt then hash these passwords and save them in sessionStorage to unlock user data (credentials)

  TEST STORAGE DATA
    '[{"username":"bigstar", "password":"f1018afebeeab6797fac0a72829d5c7ad49ff62a07334e9ac6b174ab0cbdd1ae"},{"username":"user2", "password":"6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3"}]'


  THINGS TO FIX:
    1. make available accounts dropdown re-render so that it updates without refreshing the entire page
    2. Select Account dropdown button crashes page if clicked when no saved accounts are present in localStorage

  Project Check 1:
    ternary operators
    created three components to handle the login/account creation page

  */