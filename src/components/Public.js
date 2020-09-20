import React, { Component } from 'react';
import {Button,Form,Container,Row} from 'react-bootstrap';
import main from './main';
import Navibar from './Navibar';
import TextInput from 'react-autocomplete-input';
import CardCustom from './CardCustom';

const cities=["Agra","Aligarh","Amroha","Ayodhya","Azamgarh","Bahraich","Ballia","Banda","Bara Banki","Bareilly","Basti","Bijnor","Bithur","Budaun","Bulandshahr","Deoria","Etah","Etawah","Faizabad","Farrukhabad-cum-Fatehgarh","Fatehpur","Fatehpur Sikri","Ghaziabad","Ghazipur","Gonda","Gorakhpur","Hamirpur","Hardoi","Hathras","Jalaun","Jaunpur","Jhansi","Kannauj","Kanpur","Lakhimpur","Lalitpur","Lucknow","Mainpuri","Mathura","Meerut","Mirzapur-Vindhyachal","Moradabad","Muzaffarnagar","Partapgarh","Pilibhit","Prayagraj","Rae Bareli","Rampur","Saharanpur","Sambhal","Shahjahanpur","Sitapur","Sultanpur","Tehri","Varanasi"];
const pinCode={"Agra":[123,282001,283101],"Aligarh":[202001],"Lucknow":[226023,226004]}
const dVal={true:'block',false:'none'}

class Public extends Component {

  createPButtons=(city)=>{
    const myCity=pinCode[city];
    if(myCity.length===0)
    return(<p>To be added soon!!</p>)
    let arr=[]
    for(var i=0;i<myCity.length;i++){
    arr.push(<Button variant="outline-warning" onClick={this.createCard} value={myCity[i]} style={{margin:'5px'}} >{myCity[i]}</Button>)
    }
    return(arr);
  }

  createCard=async (event)=>{
    this.setState({pinCard:false})
    let arr=[]
    const pin=event.target.value
    const count=await main.methods.getSchoolsCount(pin).call()
    for(var itr=0;itr<count;itr++){
      const addr=await main.methods.schoolsByPin(pin,itr).call()
      const schl=await main.methods.schools(addr).call()
      arr.push(schl)
    }
    this.setState({schools:arr})
  }

  onSearch=(event)=>{
    event.preventDefault()
    this.setState({welcome:false})
    this.setState({pinCard:true})
    let value=document.getElementById('tbox').innerHTML
    this.setState({city:value.trim()})
    }

  constructor(props) {
    super(props)
    this.state ={
      schoolAddress:'',
      cid:0,
      val:0,
      city:'',
      welcome:true,
      pinCard:true,
      pin:0,
      schools:[]
    }
}

  render() {
    return (
      <div>
        <Navibar/>
        <Row>
        <Container>
        <Form>
        <Form.Group controlId="formBasicEmail">
          <div style={{paddingTop:'10px',height:'50px'}} className="justify-content-center">
          <div style={{float:"left",width:'80%'}}>
          <TextInput id="tbox" options={cities} trigger='' matchAny="true" placeholder="Type a City Name" style={{width:'98%'}} />
          </div>
          <div style={{float:"left"}}>
          <Button type="primary" onClick={this.onSearch} >Search!</Button>
          </div>
          </div>
          </Form.Group>
        </Form>
        </Container>
        </Row>
        <Row>
        <Container className="cusform" style={{display:dVal[this.state.pinCard]}} >
        {this.state.welcome===true
        ?
        <p>"No one has ever become poor by giving"</p>
        :
        this.createPButtons(this.state.city)
      }
        </Container>
        </Row>
        <Container className="cusform" style={{backgroundColor:'white'}} >
        <CardCustom schools={this.state.schools} account={this.props.account} />
        </Container>
      </div>
    );
  }
}

export default Public;
