import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export class Homepage extends React.Component {

  onBtnClick =(mode)=>{
    this.props.showHomePage(mode)
  }

  render(){
    return (
      <Grid container spacing={3} style={{marginTop:'10%'}}>
       <Grid item xs={12}>
         <label style={{color:'white'}}>Do you want to waste an hour?</label>
       </Grid>
       <Grid item xs={6}>
         <Button variant="contained" fullWidth={true} color="secondary" 
          onClick={()=>this.onBtnClick('C1VsC2')}>
          Computer1 Vs Computer2
         </Button>  
       </Grid> 
       <Grid item xs={6}>
         <Button variant="contained" fullWidth={true} color="primary"
         onClick={()=>this.onBtnClick('PVsC')}>
          Player Vs Computer
         </Button>
       </Grid> 
      </Grid>
    )
  };
};

export default Homepage;
