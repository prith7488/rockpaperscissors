import React from 'react';
import { Container } from '@material-ui/core';
import './App.css';
import Homepage from './Homepage.js';
import PlayArea from './PlayArea.js';
import UtilPanel from './UtilPanel.js';

export class App extends React.Component {
  state={
    showHomePage:true,
    showPlayArea:false,
    playMode:''
  }

  showHideHomePage=(mode)=>{
    this.setState({showHomePage:false,playMode:mode,showPlayArea:true})
  }

  onUtilPanelBtnClick=(option)=>{
    if(option === 'Home') this.setState({showHomePage:true,showPlayArea:false})
  }

  render(){
  return (
    <div className="App" 
      style={{backgroundColor:'black', height:'100vh'}}>
      <h1 style={{color:'white',margin:'auto'}}>Rock Paper Scissors</h1>
      
      <Container maxWidth="sm" >
        {this.state.showHomePage && <Homepage showHomePage={this.showHideHomePage}/> }
        {this.state.showPlayArea && <UtilPanel showHome={this.onUtilPanelBtnClick}/> }
        {this.state.showPlayArea && <PlayArea playMode={this.state.playMode}/> }
      </Container>
    </div>
  );
  }
}

export default App;
