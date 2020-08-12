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
  const styles = {
    container: {
      position: 'relative',
      bottom: '5%',
    },
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
      color: 'black',
      fontSize: 35,
      fontWeight: 800,
    },
    bold: {
      fontWeight: 600,
      display: 'block',
    },
    normal: {
      fontWeight: 500
    },
    paper: {
      color: 'black',
      backgroundColor: `hsla(${algoColors[props.algorithm]}, 25%, 70%, 0.94)`
    },
    subHeader: {
      textAlign: 'center',
      display: 'block',
      // lineHeight: 3
      marginTop: 10,
      marginBottom: 5
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
          maxWidth='md'
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
              {info[props.algorithm].header}
            </span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-slide-description'>
              <span id='info-header' style={styles.paper}>
                <span style={styles.subHeader}>Time Complexity</span>
                <span style={styles.bold}>Best case:
                  <span style={styles.normal}> &Omega;({ReactHtmlParser(info[props.algorithm].best)})</span>
                </span>
                <span style={styles.bold}>Average case:
                  <span style={styles.normal}> &Theta;({ReactHtmlParser(info[props.algorithm].avg)})</span>
                </span>
                <span style={styles.bold}>Worst case:
                  <span style={styles.normal}> O({ReactHtmlParser(info[props.algorithm].worst)})</span>
                </span>
                <span style={styles.bold}>Space complexity:
                  <span style={styles.normal}> O({ReactHtmlParser(info[props.algorithm].space)})</span>
                </span>
              </span>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'>
              X
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
}
