import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import '../css/Menu.css';

const useStyles = makeStyles({
  root: {
    width: 250,
    color: 'rgba(100%, 100%, 100%, 82.5%)',
  },
  input: {
    width: 50,
    color: 'rgba(100%, 100%, 100%, 82.5%)',
    backgroundColor: 'rgba(100%, 100%, 100%, 20%)',
    borderRadius: '10px',
  },
  slider: {
    color: 'rgba(100%, 100%, 100%, 82.5%)'
  }
});

export default function LengthSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(25);

  useEffect(() => {
    if (value < 5) {
      props.onSlide(5);
    } else if (value > 125) {
      props.onSlide(125);
    } else {
      props.onSlide(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 5) {
      setValue(5);
    } else if (value > 125) {
      setValue(125);
    }
  };

  return (
    <div className={classes.root}>
      <Typography className='slider-label' id='input-slider' gutterBottom >
        Array Length
      </Typography >
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <Slider
            className={classes.slider}
            min={5}
            max={125}
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby='input-slider'
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin='dense'
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 5,
              max: 125,
              type: 'number',
              'aria-labelledby': 'input-slider',
              style: {textAlign: 'center', color: 'white'},
            }}
            disableUnderline
          />
        </Grid>
      </Grid>
    </div>
  );
}
