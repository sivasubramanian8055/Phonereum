import React, { Component } from 'react';
import {Form,Container,Button} from 'react-bootstrap';
import web3 from './web3';
import main from './main';
import IPFSManager from './IPFSManager';
import Navibar from'./Navibar';

class Manufacturer extends Component {

  onAddressChange=(event)=>{
    this.setState({address:event.target.value})
  }

  onDescChange=(event)=>{
    this.setState({desc:event.target.value})
  }

  onIpfsHashChange=(hash)=>{
    this.setState({ipfsHash:hash})
  }

  onCostChange=(event)=>{
    this.setState({cost:event.target.value})
  }

  onCreateProposal=async(event)=>{
    event.preventDefault()
    if(this.state.ipfsHash==='')
    alert('Upload your Prototype first!')
    else{
    await main.methods.createProposal(this.state.address,this.state.desc,this.state.ipfsHash,web3.utils.toWei(this.state.cost,'ether')).send({from:this.props.account})
    this.setState({status:false})
    this.setState({aadhaar:0})
    }
  }

  constructor(props) {
    super(props)
    this.state ={
      address:'',
      desc:'',
      ipfsHash:'',
      cost:0,
      proposalForm:'block'
    }
  }

  render() {
    return (
      <div  class='bgd' style={{height:'760px'}}>
        <Navibar/>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <Container className="cusform">
        <Form onSubmit={this.onCreateProposal} style={{display:this.state.proposalForm}}>
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Address of School Address:</Form.Label>
        <Form.Control type="text" placeholder="Eth Address" onChange={this.onAddressChange} />
        </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Description of Proposal:</Form.Label>
            <Form.Control type="text" placeholder="Description" onChange={this.onDescChange} />
          </Form.Group>
          <IPFSManager label="Upload Document for Prototype:" dataHandler={this.onIpfsHashChange} />
        <Form.Group controlId="formBasicEmail">
        <Form.Label>Cost Per Person:</Form.Label>
        <Form.Control type="text" placeholder="Cost Per Person" onChange={this.onCostChange} />
        </Form.Group>
            <Button variant="primary" type="submit" >
            Create Proposal!
            </Button>
        </Form>
        </Container>
      </div>
    );
  }
}

export default Manufacturer;
