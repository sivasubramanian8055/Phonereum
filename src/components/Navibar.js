import React,{Component} from 'react';

class Navibar extends Component {

 constructor(props) {
  super(props)
  this.state = { }
  }

  render() {

    const Nav=<nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:'#16161d'}} id="navi">
    <div className="container-fluid">
   <a className="navbar-brand">Phonereum</a>
  </div>  
  </nav> ;

    return (
      <div>
        {Nav}
      </div>
    );
  }
}

export default Navibar;