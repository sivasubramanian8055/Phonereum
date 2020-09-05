import React, { Component } from 'react';
import {Button,Form} from 'react-bootstrap';
import main from './main';
import web3 from './web3';

class Public extends Component {

  onsAddressChange=(event)=>{
    this.setState({schoolAddress:event.target.value})
  }

  onConChange=(event)=>{
    this.setState({cid:event.target.value})
  }

  onValChange=(event)=>{
    this.setState({val:event.target.value})
  }

  onDonate=async(event)=>{
    event.preventDefault()
    await main.methods.acceptDonation(this.state.schoolAddress,this.state.cid).send({from:this.props.account,value:web3.utils.toWei(this.state.val,'ether')})
  }

  constructor(props) {
    super(props)
    this.state ={ 
      schoolAddress:'',
      cid:0,
      val:0
    }
}

  render() {
    return (
      <div>
        <Form.Label>School Address:</Form.Label>
        <Form.Control type="text" placeholder="School Address" onChange={this.onsAddressChange} />
        <Form.Label>Consignment ID:</Form.Label>
        <Form.Control type="number" placeholder="Consignment ID" onChange={this.onConChange} />
        <Form.Label>Ether:</Form.Label>
        <Form.Control type="number" placeholder="Ether" onChange={this.onValChange} />
        <Button onClick={this.onDonate} >Donate!</Button>
      </div>
    );
  }
}

export default Public;