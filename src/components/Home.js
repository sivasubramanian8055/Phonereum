import React, { Component } from 'react';
import {Container,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import main from './main';
import Navibar from './Navibar';

class Home extends Component {

  onLoad=async ()=>{
    const admin=await main.methods.admin().call()
    const school=await main.methods.schools(this.props.account).call()
    const lAdmin=await main.methods.lAdmins(this.props.pincode).call()
    const manufacturer=await main.methods.manufacturers(this.props.cin).call()
    const url=window.location.href.split('/')
    if(admin===this.props.account)
    window.location.href=url[0]+'admin'
    else if(school.name!=='')
    window.location.href=url[0]+'school'
    else if(lAdmin.name!=='')
    window.location.href=url[0]+'localadmin'
    else if(manufacturer.compName!=='')
    window.location.href=url[0]+'manufacturer'
    else
    window.location.href=url[0]+'donate'
 }

 constructor(props) {
  super(props)
  this.state = { }
  }

  render() {
    return (
      <div className="App">
     
      <Navibar overlay="true"></Navibar>
  
  <header className="head" id="About">
    <div className="container d-flex justify-content-end">
      <div className="intro-text">
      <Container fluid>
      <h1>Phonereum</h1>
      <p>
      A crowdfunding solution built on <b>Ethereum</b> to provide mobile phones to poor students.
      </p>
      <i>"In education, technology can be a life-changer, a game changer, for kids who are both in school and out of school"</i>
      <p>
      <p>&nbsp;</p>
      <Button variant='primary' onClick={this.onLoad}>Contribute Now!</Button>
    </p>
    </Container>
      </div>
    </div>
  </header>

  
  <section className="page-section" id="highlight">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">HighLights</h2>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-md-4">
          <h4 className="service-heading">Confidentiality</h4>
          <p className="text-muted">Your donation is locked in the contract till all units are dispersed and transferred to Manufacturer. No other person can get it.</p>
        </div>
        <div className="col-md-4">
          <h4 className="service-heading">Immutable</h4>
          <p className="text-muted">Every detail in this BlockChain Network is immutable and no false claims can be made.</p>
        </div>
        <div className="col-md-4">
          <h4 className="service-heading">Contribution</h4>
          <p className="text-muted">Your chance to contribute to bring sunshine into lives of Children.</p>
        </div>
      </div>
    </div>
  </section>
  
  <section className="bg-light page-section" id="team">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-5">
          <div className="team-member">
            <h4>Sivasubramanian.V</h4>
            <p className="text-muted">BlockChain Enthusiast</p>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="team-member">
            <h4>Sriram.G</h4>
            <p className="text-muted">BlockChain Enthusiast</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 mx-auto text-center">
          <p className="large text-muted">Be the change you want to see in the world!</p>
        </div>
      </div>
    </div>
  </section>

  
  <section className="page-section" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 text-center">
          <h2 className="section-heading text-uppercase">Contact Us</h2>
          <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <form id="contactForm" name="sentMessage" novalidate="novalidate">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input className="form-control" id="name" type="text" placeholder="Your Name *" required="required" data-validation-required-message="Please enter your name."/>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input className="form-control" id="email" type="email" placeholder="Your Email *" required="required" data-validation-required-message="Please enter your email address."/>
                  <p className="help-block text-danger"></p>
                </div>
                <div className="form-group">
                  <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" required="required" data-validation-required-message="Please enter your phone number."/>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <textarea className="form-control" id="message" placeholder="Your Message *" required="required" data-validation-required-message="Please enter a message."></textarea>
                  <p className="help-block text-danger"></p>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-lg-12 text-center">
                <div id="success"></div>
                <button id="sendMessageButton" className="btn btn-primary btn-xl text-uppercase" type="submit">Send Message</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>

  
  <footer className="footer">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-4">
          <span className="copyright">Phonereum</span>
        </div>
      </div>
    </div>
  </footer>
    </div>
    );
  }
}

export default Home;
