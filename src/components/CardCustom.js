import React, { Component } from 'react';
import main from './main';
import web3 from './web3';

class CardCustom extends Component {

    constructor(props) {
        super(props)
        this.state ={
          manu:'',
          desc:'',
          hash:'',
          val:''
         }
    }

    onAmount=(event)=>{
      event.preventDefault()
      this.setState({val:event.target.value})
    }

    fetchConsignment=async (addr,cid)=>{
      const man=await main.methods.proposalsForSchool(addr,cid).call()
      this.setState({manu:man.byManfac})
      this.setState({desc:man.description})
      this.setState({hash:man.prototypeHash})
    }

    donateEther=async(event)=>{
      event.preventDefault()
      const entry=event.target.value.split('@')
      await main.methods.acceptDonation(entry[0],entry[1]).send({from:this.props.account,value:web3.utils.toWei(this.state.val,'ether')})
    }

    render() {
      return (
          <div>
              {
              this.props.schools.map((school, key) => {
                {this.fetchConsignment(school.id,school.currentConsignment)}
                if(school.currentConsignment===0)
                return(null)
                return(
                  <div class="card justify-content-center" style={{width: '18rem',backgroundColor:'#16161d',borderColor:'#fed136'}}>
                  <div class="card-body">
                <h5 class="card-title">{school.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{'Proposed Manufacturer: '+this.state.manu}</h6>
                <p class="card-text">{'Description: '+this.state.desc}</p>
                <a href={'https://ipfs.infura.io/ipfs/'+this.state.hash}>Click here to view Prototype!</a>
                <input type="text" onChange={this.onAmount} placeholder="Amount In Ether"/>
                    <button type="button" class="btn btn-primary" value={school.id+'@'+school.currentConsignment} onClick={this.donateEther} >
                      Donate!
                    </button>
                  </div>
                </div>
                )
              })}
        </div>
      );
    }
}

export default CardCustom;
