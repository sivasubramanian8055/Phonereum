import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

class IPFSManager extends Component{

uploadToIPFS=(event)=>{
    event.preventDefault()
    const IPFS=require('ipfs-http-client')
    const ipfsInstance= IPFS({host:'ipfs.infura.io',port:5001,protocol:'https'})
    const file = event.target.files[0]
    const input = new window.FileReader()
    input.readAsArrayBuffer(file)
    input.onloadend = () => {
        this.setState({flag:'Uploading...'})
        const uload=Buffer(input.result)
        ipfsInstance.add(uload,(error,result)=>{
        if(error){
            console.error(error)
            this.setState({flag:'Upload Failed. Try Again'})
        }
        else{
            this.setState({ipfsHash:result[0].hash},()=>{
                this.props.dataHandler(result[0].hash)
            })
            this.setState({flag:'Uploaded successfully'})
        }
            })
    }
    }

  constructor(props) {
      super(props)
      this.state ={ 
          flag:'',
          ipfsHash:''
      }
  }

  render() {
    return (
          <div>
          <Form.Group controlId="formBasicEmail">
          <Form.Label>{this.props.label}</Form.Label>
          <Form.Control type="file" onChange={this.uploadToIPFS}/>
          <Form.Label>{this.state.flag}</Form.Label>
          </Form.Group>
         </div>
           );
           }
}
export default IPFSManager;