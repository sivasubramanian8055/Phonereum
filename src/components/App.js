import React, { Component } from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import Home from './Home';
import Admin from './Admin';
import LAdmin from './LAdmin';
import School from './School';
import Public from './Public';
import Error from './Error';
import Manufacturer from './Manufacturer';
import web3 from './web3';
import main from './main';

class App extends Component {
			
  async componentWillMount() {
    await this.loadWeb3()
  }
  
  async loadWeb3() {
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
	const ladmin_pincode=await main.methods.pincodeByAddress(this.state.account).call()
    const manufacturer_cin=await main.methods.manufacturerIds(this.state.account).call()
    this.setState({pincode:ladmin_pincode})
    this.setState({cin:manufacturer_cin})
  }	
	
  constructor(props) {
    super(props)
    this.state = {
		account:'',
		pincode:0,
		cin:''
	}
    }

  render() {
    return (
      <BrowserRouter>
        <Switch>
        <Route path="/" exact>
          <Home account={this.state.account} pincode={this.state.pincode} cin={this.state.cin}/>
        </Route>
        <Route path="/admin">
          <Admin account={this.state.account}/>
        </Route>
        <Route path="/localAdmin">
          <LAdmin account={this.state.account} pincode={this.state.pincode}/>
        </Route>
        <Route path="/manufacturer">
          <Manufacturer account={this.state.account} cin={this.state.cin}/>
        </Route>
        <Route path="/school">
          <School account={this.state.account}/>
        </Route>
        <Route path="/donate">
          <Public account={this.state.account}/>
        </Route>
        <Route component={Error}/>
        </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
