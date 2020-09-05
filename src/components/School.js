import React, { Component } from 'react';
import {Container,Form,Button} from 'react-bootstrap';
import main from './main';
import IPFSManager from './IPFSManager';

class School extends Component {

  onIpfsHashChange=(hash)=>{
      this.setState({ipfsHash:hash})
    }

  onPidChange=(event)=>{
        this.setState({pid:event.target.value})
      }

   onAadhaarChange=(event)=>{
        this.setState({aadhaar:event.target.value})
      }

   onAvgIncomeChange=(event)=>{
      this.setState({avgIncome:event.target.value})
      }

   onCreateNeedyStudent=async(event)=>{
   event.preventDefault()
   await main.methods.createNeedy(this.state.aadhaar,this.state.avgIncome,this.state.ipfsHash).send({from:this.props.account})
   this.setState({aadhar:0})
   this.setState({avgIncome:0})
   this.setState({ipfsHash:''})
      }

  onAcceptProposal=async(event)=>{
  event.preventDefault()
  await main.methods.acceptProposal(this.state.pid).send({from:this.props.account})
  this.setState({pid:0})
         }

  onProofOfWork=async(event)=>{
  event.preventDefault()
  await main.methods.proofOfWork(this.state.pid,this.state.aadhaar,this.state.ipfsHash).send({from:this.props.account})
  this.setState({aadhar:0})
  this.setState({pid:0})
  this.setState({ipfsHash:''})
  }

  constructor(props) {
      super(props)
      this.state ={
        aadhaar:0,
        avgIncome:0,
        ipfsHash:'',
        pid:0
      }
    }

render() {
return (
<div>
<Container>
<Form onSubmit={this.onCreateNeedyStudent}>
<Form.Group controlId="formBasicEmail">
<Form.Label>Aadhaar Number of Student:</Form.Label>
<Form.Control type="number" placeholder="Aadhaar Number" onChange={this.onAadhaarChange} />
</Form.Group>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Average Income:</Form.Label>
    <Form.Control type="number" placeholder="Average Income" onChange={this.onAvgIncomeChange} />
  </Form.Group>
  <IPFSManager label="Income Proof:" dataHandler={this.onIpfsHashChange} />
  <Button variant="primary" type="submit" >
  Create Needy!
  </Button>
</Form>

<Form onSubmit={this.onAcceptProposal}>
<Form.Group controlId="formBasicEmail">
<Form.Label>Proposal Id:</Form.Label>
<Form.Control type="Number" placeholder="Proposal Id no." onChange={this.onPidChange} />
</Form.Group>
  <Button variant="primary" type="submit" >
   Accept the proposal!
  </Button>
</Form>

<Form onSubmit={this.onProofOfWork}>
<Form.Group controlId="formBasicEmail">
  <Form.Label>Consignment Id:</Form.Label>
  <Form.Control type="number" placeholder="Consignemnt Id" onChange={this.onPidChange} />
</Form.Group>
<Form.Group controlId="formBasicEmail">
<Form.Label>Aadhaar Number of Student:</Form.Label>
<Form.Control type="number" placeholder="Aadhaar Number" onChange={this.onAadhaarChange} />
</Form.Group>
<IPFSManager label="Upload Proof of Work:" dataHandler={this.onIpfsHashChange} />
  <Button variant="primary" type="submit" >
  Submit Proof of the student!
  </Button>
</Form>
</Container>
</div>
);
}
}
export default School;
