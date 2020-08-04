import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 220,
    color: 'rgba(100%, 100%, 100%, 82.5%)'
  },
});

// Sets the time interval between animation frames
export default function SpeedSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(10);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => props.onSlide(value), [value]);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div className={classes.root}>
      <Typography className='slider-label' id='continuous-slider' gutterBottom>
        Sorting Speed
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} style={{color: 'rgba(100%, 100%, 100%, 82.5%)'}} aria-labelledby='continuous-slider' />
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
    </div>
  );
}