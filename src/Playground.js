import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from './images/paper.png';
import Rock from './images/rock.png';
import Scissors from './images/scissors.png';

export class Playground extends React.Component {
  
  render(){
    let hideMovesPanel = this.props.mode ==='C1VsC2' || this.props.playerName !== 'Human'
    return (
      <Grid container spacing={1}>
       <Grid item xs={12}>
          <label style={{color:'white'}}>
            {this.props.playerName}
          </label>
       </Grid>
       <Grid item xs={12} >
       <ButtonGroup disabled={hideMovesPanel} color="secondary" aria-label="outlined secondary button group">
        <Button onClick={()=>this.props.onPlayerMove(0)}>Rock</Button>
        <Button onClick={()=>this.props.onPlayerMove(1)}>Paper</Button>
        <Button onClick={()=>this.props.onPlayerMove(2)}>Scissors</Button>
      </ButtonGroup>
       </Grid>
       <Grid item xs={12}>
          <div style={{height:'100px',backgroundColor:'white'}}>
            {this.props.playerMove === 0 && <img alt={'ROCK'} style={{marginTop:'8%'}} src={Rock}/> }
            {this.props.playerMove === 1 && <img alt={'PAPER'} style={{marginTop:'8%'}} src={Paper}/> }
            {this.props.playerMove === 2 && <img alt={'SCISSORS'} style={{marginTop:'8%'}} src={Scissors}/> }
            
          </div>
       </Grid>
      </Grid>
    )
  };
};

export default Playground;
