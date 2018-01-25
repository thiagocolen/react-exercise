import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import MyFirstComponent from './components/MyFirstComponent/MyFirstComponent'
import MapWithAMarker from './components/Map/MapWithAMarker'
import GMap from './components/Map/GMap'
import './App.css'


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
          <div>
            <AppBar 
              title="React Exercise" 
              onLeftIconButtonClick={this.handleToggle}
            />

            <Drawer
              docked={false}
              width={300}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
            >
              <Link to={'/'}><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>            
              <Link to={'/link1'}><MenuItem onClick={this.handleClose}>My First Component</MenuItem></Link>
              <Link to={'/link2'}><MenuItem onClick={this.handleClose}>Map Component</MenuItem></Link>
            </Drawer>

            <Route exact path="/" component={wellcome}/>
            <Route path="/link1" component={link1Component} />
            <Route path="/link2" component={GMap} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

const link1Component = ({ match }) => (
  <MyFirstComponent teste="testeProp" />
)


const wellcome = () => {
  return (
    <h1>Wellcome</h1>
  )
}


export default App
