import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import info from './Info';
import { algoColors } from './SortingTimeVisualizer';
import ReactHtmlParser from 'react-html-parser';
import './SortingTimeVisualizer.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='left' ref={ref} {...props} />;
});

export default function InfoBox(props) {
  const text = info[props.algorithm];
  const hue = algoColors[props.algorithm];
  const styles = {
    button: {
      margin: 'auto',
      borderRadius: '10%',
    },
    icon: {
      fontSize: 75,
      color: 'black',
      position: 'relative',
      bottom: '2px'
    },
    header: {
      textAlign: 'center',
      display: 'block',
      color: `hsla(${hue}, 95%, 10%, 0.94)`,
      fontSize: 35,
      fontWeight: 800,
    },
    bold: {
      fontSize: 16,
      fontWeight: 600,
      display: 'block',
    },
    normal: {
      fontWeight: 500
    },
    algo: {
      fontSize: 15,
      fontWeight: 500,
      fontFamily: `FiraCode`
    },
    paper: {
      color: `hsla(${hue}, 95%, 5%, 0.94)`,
      backgroundColor: `hsla(${hue}, 25%, 63%, 0.96)`,
      maxHeight: `50vh`,
      minWidth: `40vh`,
      // maxWidth: `45vh`,
      fontFamily: `Arial`
    },
    subHeader: {
      textAlign: 'center',
      display: 'block',
      marginTop: 5,
      marginBottom: 5,
      textDecoration: `underline hsla(${hue}, 95%, 10%, 0.94)`
    },
    exit: {
      fontSize: 14,
      fontWeight: 500,
      color: `hsla(${hue}, 95%, 10%, 0.94)`
    }
  };

  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div id='info-box-container' style={styles.container}>
        <Button id='info-button' variant='outlined' color='primary' onClick={handleClickOpen} style={styles.button}>
            <MenuBookIcon className='info-icon' style={styles.icon}/>
        </Button>
        <Dialog
          PaperProps={{style: styles.paper}}
          style={styles.dialog}
          scroll='paper'
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'
        >
          <DialogTitle id='alert-dialog-slide-title'>
            <span id='info-header' style={styles.header}>
              {text.header}
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              <span id='info-body' style={styles.paper}>
                <span style={styles.subHeader}>Time Complexity</span>
                <span style={styles.bold}>Best case:
                  <span style={styles.normal}> &Omega;({ReactHtmlParser(text.best)})</span>
                </span>
                <span style={styles.bold}>Average case:
                  <span style={styles.normal}> &Theta;({ReactHtmlParser(text.avg)})</span>
                </span>
                <span style={styles.bold}>Worst case:
                  <span style={styles.normal}> O({ReactHtmlParser(text.worst)})</span>
                </span>
                <span style={styles.bold}>Space complexity:
                  <span style={styles.normal}> O({ReactHtmlParser(text.space)})<br/><br/></span>
                </span>
                <span style={styles.subHeader}>Algorithm (JavaScript)</span>
                <span style={styles.bold}> 
                  <span style={styles.algo}> {ReactHtmlParser(text.algo)}</span>
                </span>
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={styles.exit}>
              X
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
