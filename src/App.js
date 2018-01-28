import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import FontIcon from 'material-ui/FontIcon'
import IconButton from 'material-ui/IconButton';

import MyFirstComponent from './components/MyFirstComponent/MyFirstComponent'
import MyGMapComponent from './components/MyGMapComponent/MyGMapComponent'


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      total: 10
    };
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>  
          <div style={height100Style}>

            <IconButton style={iconStyles} onClick={this.handleToggle}>
              <FontIcon className="material-icons">menu</FontIcon>
            </IconButton>

            <Drawer
              docked={false}
              width={300}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <Link to={'/'}><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>            
              <Link to={'/link1'}><MenuItem onClick={this.handleClose}>My First Component</MenuItem></Link>
              <Link to={'/gmap'}><MenuItem onClick={this.handleClose}>My GMap Component</MenuItem></Link>
            </Drawer>

            <Route exact path="/" component={wellcome}/>
            <Route path="/link1" component={link1Component} />
            <Route path="/gmap" component={MyGMapComponent} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const link1Component = () => (
  <MyFirstComponent teste="testeProp" />
)

const wellcome = () => {
  return (
    <h1>Wellcome</h1>
  )
}

const iconStyles = {
  color: 'red',
  position: 'absolute',
  top: '20px',
  left: '20px',
  zIndex: '100',
  size: '30px'
}

const height100Style = {
  height: '100%'
}

export default App
