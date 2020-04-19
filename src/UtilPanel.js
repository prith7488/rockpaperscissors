import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export class UtilPanel extends React.Component {

  render(){
    return (
      <Grid container spacing={3} style={{marginTop:'5%'}}>
       <Grid item xs={12}>
         <Button variant="contained" color="secondary" 
          onClick={()=>this.props.showHome('Home')}>
          Home
         </Button>  
       </Grid>
      </Grid>
    )
  };
};

export default UtilPanel;
