import React, { useEffect, useState } from 'react'
import { Button, Col, Row} from  'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillDelete } from "react-icons/ai";

// AiFillDelete

function CredentialCard(props) {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [buttonText, setButtonText] = useState("show password");
  const [visible, setVisible] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState(props.savedAccounts);
  const [position, setPosition] = useState(props.position);

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

  const deleteButton = () => {
    props.deleteCredentials(props.position)
    // console.log(savedAccounts[position])
    // console.log(props.position)
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
        <Row>
          <Col sm={5} md={8}>
            <Button onClick={handleClick}>{buttonText}</Button>
          </Col>
          <Col md={2}>
            {/* delete credential button */}
            <Button variant="danger">
              <AiFillDelete onClick={deleteButton}/>
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CredentialCard

// Card for each credential containing account information