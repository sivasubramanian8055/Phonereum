import React, { Component } from 'react';
import {Form,Container,Button,Nav} from 'react-bootstrap';
import main from './main';
import Navibar from './Navibar';

class Admin extends Component{

  onAddressChange=(event)=>{
      this.setState({address:event.target.value})
    }

  onAadhaarChange=(event)=>{
      this.setState({aadhaar:event.target.value})
    }

   onNameChange=(event)=>{
      this.setState({name:event.target.value})
    }

  onCINchange=(event)=>{
    this.setState({Cin:event.target.value})
  }

  onPinchange=(event)=>{
   this.setState({pincode:event.target.value})
  }

  onCreateLocalAdmin=async(event)=>{
    event.preventDefault()
    await main.methods.createLocal(this.state.address,this.state.pincode,this.state.name,this.state.aadhaar).send({from:this.props.account})
    this.setState({name:''})
    this.setState({aadhar:0})
    this.setState({pincode:0})
    this.setState({address:''})
    }

  onCreateManufacturer=async(event)=>{
   event.preventDefault()
   await main.methods.createManufacturer(this.state.address,this.state.name,this.state.Cin).send({from:this.props.account})
   this.setState({Cin:''})
   this.setState({name:''})
   this.setState({address:''})
  }

  tabSwitch=(eventKey)=>{
    if(eventKey==='lAdmin'){
       this.setState({lAdminForm:'block'})
       this.setState({manufacturerForm:'none'})
       this.setState({welcome:'none'})
     }
     else{
       this.setState({manufacturerForm:'block'})
       this.setState({lAdminForm:'none'})
       this.setState({welcome:'none'})
     }
   }

  constructor(props) {
      super(props)
      this.state ={
        aadhaar:0,
        Cin:'',
        name:'',
        address:'',
        pincode:0,
        welcome:'block',
        lAdminForm:'none',
        manufacturerForm:'none'
      }
  }


  render() {
    return (
          <div>
          <Navibar/>
          <Nav variant="tabs" defaultActiveKey="welcome" onSelect={this.tabSwitch}>
          <Nav.Item>
            <Nav.Link eventKey="lAdmin">Create LocalAdmin</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Manufacturer">Create Manufacturer</Nav.Link>
          </Nav.Item>
          </Nav>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <Container className="cusform">
          <Form style={{display:this.state.welcome}}>
          <Form.Label>Welcome Admin! You are about to bring sunshine to the lives of some lovely children!</Form.Label>
          </Form>
          <Form onSubmit={this.onCreateLocalAdmin} style={{display:this.state.lAdminForm}}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Address of Local Admin:</Form.Label>
          <Form.Control type="text" placeholder="Eth Address" onChange={this.onAddressChange} />
          </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Pincode:</Form.Label>
              <Form.Control type="number" placeholder="Pincode" onChange={this.onPinchange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={this.onNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Aaadhaar Id:</Form.Label>
          <Form.Control type="number" placeholder="Aaadhaar Id" onChange={this.onAadhaarChange} />
        </Form.Group>
            <Button variant="primary" type="submit" >
            Create LocalAdmin!
            </Button>
          </Form>

          <Form onSubmit={this.onCreateManufacturer} style={{display:this.state.manufacturerForm}}>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>Address of Manufacturer:</Form.Label>
          <Form.Control type="text" placeholder="Eth Address" onChange={this.onAddressChange} />
          </Form.Group>
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Company Name:</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={this.onNameChange} />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>CIN ID:</Form.Label>
          <Form.Control type="text" placeholder="CIN ID" onChange={this.onCINchange} />
        </Form.Group>
            <Button variant="primary" type="submit" >
            Create Manufacturer!
            </Button>
          </Form>
          </Container>
           </div>
           );
           }
}
export default Admin;
