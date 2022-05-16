import React, { useEffect, useState } from 'react'
import { Button} from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CredentialCard(props) {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [buttonText, setButtonText] = useState("show password");
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setName(props.name);
    setPassword(props.password);

    if(visible){
      setVisible(false);
    }
    else{
      setVisible(true);
    }
  }

  useEffect(()=>{
    if(visible){
      setName(props.name)
      setPassword(props.password)
      setButtonText("hide password")
    }
    else{
      setName("")
      setPassword("")
      setButtonText("show password")
    }
  }, [visible])

  return (
    // style={{minWidth:"350px", maxWidth:"350px"}}
    <div className="card" style={{marginBottom: "5%"}}>
      <div className="card-header">
        {props.title}
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{password}</p>
        <Button onClick={handleClick}>{buttonText}</Button>
      </div>
    </div>
  )
}

export default CredentialCard

// Card for each credential containing account information