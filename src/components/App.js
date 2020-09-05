import React, { Component } from 'react';
import Admin from './Admin';
import web3 from './web3';

class App extends Component {
			
  async componentWillMount() {
    await this.loadWeb3()
  }
  
  async loadWeb3() {
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }	
	
  constructor(props) {
    super(props)
    this.state = {}
    }

  render() {
    return (
      <Admin account={this.state.account}/>
    );
  }
}

export default App;
