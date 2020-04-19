import React from 'react';
import Cookies from 'universal-cookie';
import Playground from './Playground.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
const cookies = new Cookies();
export class PlayArea extends React.Component {
  state={
    player1Name:'',
    player2Name:'',
    player1Move:'',
    player2Move:'',
    player1Score:0,
    player2Score:0,
    lastDuelWinner:'',
    playerMoves:[]
  }

  static getDerivedStateFromProps(nextProps, prevState){
    let newState={}

    if(!!nextProps.playMode){
      let player1Name = 'Human'
      let player2Name = 'Computer'

      if(nextProps.playMode === 'C1VsC2')
      {
        player1Name = 'Computer1'
        player2Name = 'Computer2'
      }
      newState = Object.assign({player1Name:player1Name,
        player2Name:player2Name},newState)
    }
    return newState
  }

  //Start: Move functional logic to another util class
  getRandomPlayMoveNumber=(min,max)=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getBotMove=(thisPlayer)=>{
    let lastWinner = this.state.lastDuelWinner

    if(lastWinner === '' || lastWinner === 'Draw')
      return this.getRandomPlayMoveNumber(0,2)
    if(lastWinner === thisPlayer && thisPlayer === 'P2')
      return this.state.player2Move === 0? 1:this.state.player2Move ===1?2:0
    else
    return this.state.player1Move === 0? 1:this.state.player1Move ===1?2:0
  }

  getHighestMoveCount=()=>{
    let rockCount = this.state.playerMoves.filter(x=>x===0).length
    let paperCount = this.state.playerMoves.filter(x=>x===1).length
    let scissorsCount = this.state.playerMoves.filter(x=>x===2).length

    return rockCount>paperCount?(rockCount>scissorsCount?0:2): (paperCount>scissorsCount?1:2)
  }

  getEnhancedBotMove=()=>{
    let probableMove = this.getHighestMoveCount()
    return probableMove === 0? 1: probableMove === 1?2:0 
  }

  botBattle =()=>{
    let p1Move = this.getRandomPlayMoveNumber(0,2)
    let p2Move = this.getBotMove('P2')

    this.setState({
      player1Move : p1Move,
      player2Move : p2Move,
    },()=>this.getDuelResultAndUpdateScore())
  }

  onPlayerMove=(moveNumber)=>{
    let tempPlayerMoves = this.state.playerMoves
    tempPlayerMoves.push(moveNumber)
    this.setState({playerMoves:tempPlayerMoves})

    let p2Move = this.getEnhancedBotMove()
    
    this.setState({
      player1Move:moveNumber,
      player2Move : p2Move},
      ()=>this.getDuelResultAndUpdateScore())  
  }

  getDuelResultAndUpdateScore=()=>{
    let p1Score = cookies.get('player1Score')
    let p2Score = cookies.get('player2Score')
    
    if((this.state.player1Move + 1)%3 === this.state.player2Move){
      p2Score = isNaN(p2Score)?1:++p2Score
      this.setState({player2Score:p2Score, lastDuelWinner:'P2'})
      cookies.set('player2Score',p2Score)
    }
    else if(this.state.player1Move === this.state.player2Move)  
      this.setState({lastDuelWinner:'Draw'})
    else{
      p1Score = isNaN(p1Score)?1:++p1Score
      this.setState({player1Score:p1Score, lastDuelWinner:'P1'})
      cookies.set('player1Score',p1Score)
    }
  }
  //End: Move functional logic to another util class


  render(){
    return (
      <Grid container spacing={1} 
        style={{marginTop:'5%',alignItems:'center',justifyContent:'center'}}>
        <Grid item xs={12}>
          <label style={{color:'white'}}>
            {this.props.playMode === 'C1VsC2'? 'Computer Vs Computer':'Human Vs Computer'}
          </label>
        </Grid>
        <Grid item xs={6}>
          <Card variant="elevation" style={{minSize:'100px'}}>
          <CardContent>
          <Typography variant="h5" component="h3">
            {this.state.player1Score}
          </Typography>
          </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="elevation"  style={{minSize:'100px'}}>
          <CardContent>
          <Typography variant="h5" component="h3">
          {this.state.player2Score}
          </Typography>
          </CardContent>
          </Card>
        </Grid>
        
       <Grid item xs={6}>
        <Playground playerName={this.state.player1Name} 
          mode={this.props.playMode} onPlayerMove={this.onPlayerMove}
          playerMove={this.state.player1Move}/>
       </Grid>
       <Grid item xs={6}>
        <Playground playerName={this.state.player2Name} 
          mode={this.props.playMode} onPlayerMove={this.onPlayerMove}
          playerMove={this.state.player2Move}/>
       </Grid>
       <Grid item xs={12} style={this.props.playMode === 'C1VsC2'?{display:'block'}:{display:'none'}}>
       <Button variant="contained" color="secondary" onClick={()=>this.botBattle()}>
            Battle!
       </Button>
        </Grid>
      </Grid>
    )
  };
};

export default PlayArea;
