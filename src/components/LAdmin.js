import React, { Component } from 'react';
import {Form,Container,Dropdown,DropdownButton,Button} from 'react-bootstrap';
import main from './main';

class Ladmin extends Component {

  onNameChange=(event)=>{
      this.setState({schoolName:event.target.value})
    }

    onsAddressChange=(event)=>{
        this.setState({schoolAddress:event.target.value})
      }

    onTotalChange=(event)=>{
        this.setState({total:event.target.value})
      }

    onSConChange=async (eventKey)=>{
         const keys={"true":"YES","false":"NO"}
          this.setState({conStatus:JSON.parse(eventKey)})
          this.setState({dispCon:keys[eventKey]})
      }

    onNConChange=async (eventKey)=>{
        const keys={"true":"YES","false":"NO"}
         this.setState({status:JSON.parse(eventKey)})
         this.setState({dispFlag:keys[eventKey]})
     }

    onIpfsHashChange=(event)=>{
        this.setState({ipfsHash:event.target.value})
      }

    onPidChange=(event)=>{
        this.setState({pid:event.target.value})
      }

    onAadhaarChange=(event)=>{
        this.setState({aadhaar:event.target.value})
      }

    onFlagNeedy=async(event)=>{
        event.preventDefault()
        await main.methods.flagNeedy(this.props.pincode,this.state.aadhaar,this.state.status).send({from:this.props.account})
        this.setState({status:false})
        this.setState({aadhaar:0})
        }

    onResetConsignment=async(event)=>{
      event.preventDefault()
      await main.methods.resetConsignment(this.props.pincode,this.state.schoolAddress,this.state.conStatus).send({from:this.props.account})
      this.setState({conStatus:false})
      this.setState({schoolAddress:''})
    }

    onCreateSchool=async(event)=>{
      event.preventDefault()
      await main.methods.createSchool(this.props.pincode,this.state.schoolAddress,this.state.schoolName,this.state.total).send({from:this.props.account})
      this.setState({schoolName:''})
      this.setState({total:0})
      this.setState({schoolAddress:''})
   }

   onUpdateTotal=async(event)=>{
    event.preventDefault()
    await main.methods.updateTotal(this.props.pincode,this.state.schoolAddress,this.state.total).send({from:this.props.account})
    this.setState({total:0})
    this.setState({schoolAddress:''})
  }

  onConfirmReceipt=async(event)=>{
    event.preventDefault()
    await main.methods.confirmReceipt(this.props.pincode,this.state.schoolAddress,this.state.pid,this.state.ipfsHash).send({from:this.props.account})
    this.setState({ipfsHash:''})
    this.setState({schoolAddress:''})
    this.setState({pid:''})
  }

   constructor(props) {
      super(props)
      this.state = {
        schoolName:'',
        total:0,
        schoolAddress:'',
        conStatus:false,
        dispCon:'YES/NO',
        dispFlag:'YES/NO',
        aadhaar:0,
        status:false,
        ipfsHash:'',
        pid:0
      }
    }

    render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.onCreateSchool}>
            <Form.Group>
            <Form.Label>School Name:</Form.Label>
            <Form.Control type="text" placeholder="School Name:" onChange={this.onNameChange} />
            </Form.Group>
            <Form.Group>
            <Form.Label>School Address:</Form.Label>
            <Form.Control type="text" placeholder="School Address:" onChange={this.onsAddressChange} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Total no. of Students:</Form.Label>
            <Form.Control type="number" placeholder="Total no. of Students:" onChange={this.onTotalChange} />
            </Form.Group>
            <Button variant="primary" type="submit">Add School under your region!</Button>
          </Form>
        
            <Form onSubmit={this.onResetConsignment}>
            <Form.Group>
            <Form.Label>School Address:</Form.Label>
            <Form.Control type="text" placeholder="School Address:" onChange={this.onsAddressChange} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Do you want to enable consignment for this School?</Form.Label>
            <DropdownButton bsStyle="success" title={this.state.dispCon} onSelect={this.onSConChange}>
            <Dropdown.Item eventKey="true">YES</Dropdown.Item>
            <Dropdown.Item eventKey="false">NO</Dropdown.Item>
            </DropdownButton>
            </Form.Group>
            <Button variant="primary" type="submit">Confirm!</Button> 
            </Form>
     
            <Form onSubmit={this.onFlagNeedy}>
            <Form.Group>
            <Form.Label>Aadhaar Number of Student:</Form.Label>
            <Form.Control type="number" placeholder="Aadhaar Number" onChange={this.onAadhaarChange} />
            </Form.Group>
            <Form.Group>
            <Form.Label>Do you want to flag this student?</Form.Label>
            <DropdownButton bsStyle="success" title={this.state.dispFlag} onSelect={this.onNConChange}>
            <Dropdown.Item eventKey="true">YES</Dropdown.Item>
            <Dropdown.Item eventKey="false">NO</Dropdown.Item>
            </DropdownButton>
            </Form.Group>
            <Button variant="primary" type="submit">Confirm!</Button> 
            </Form>
     
     <Form onSubmit={this.onUpdateTotal}>
     <Form.Group controlId="formBasicEmail">
     <Form.Label>School Address:</Form.Label>
     <Form.Control type="text" placeholder="School Address" onChange={this.onsAddressChange} />
   </Form.Group>
       <Form.Group controlId="formBasicEmail">
         <Form.Label>Update Total Value:</Form.Label>
         <Form.Control type="Number" placeholder="Total no. of students" onChange={this.onTotalChange} />
       </Form.Group>

       <Button variant="primary" type="submit" >
       Update the total value!
       </Button>
     </Form>
     
    <Form onSubmit={this.onConfirmReceipt}>
     <Form.Group controlId="formBasicEmail">
     <Form.Label>School Address:</Form.Label>
     <Form.Control type="text" placeholder="School Adsress" onChange={this.onsAddressChange} />
   </Form.Group>
       <Form.Group controlId="formBasicEmail">
         <Form.Label>Consignment Id</Form.Label>
         <Form.Control type="number" placeholder="Consignemnt Id" onChange={this.onPidChange} />
       </Form.Group>
       <Form.Group controlId="formBasicEmail">
       <Form.Label>Image Hash address:</Form.Label>
       <Form.Control type="text" placeholder="Ipfs Hash" onChange={this.onIpfsHashChange} />
     </Form.Group>
       <Button variant="primary" type="submit" >
       Confirm Receipt!
       </Button>
      </Form>

    </Container>

</div>
    );
}

}
export default Ladmin;
