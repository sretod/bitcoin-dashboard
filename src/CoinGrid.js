import React from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const CoinGrid = ({id,name,image,price}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)

  }
  return (

     
    <div >
      
      <Item onClick={handleClickOpen}  key={id}  sx={{bacgroudColor:'#ff0000', fontSize: '2vw', display:'flex',justifyContent:'center', height:'20vw',alignItems:'center', cursor:'pointer'}}><Avatar alt="btc symbo image" src={image} sx={{marginRight:'0.5vw'}}></Avatar> <div>{name}</div></Item>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {name}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
       Current price is: {price} $
      
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>


      
        )
       
    
    }
    


export default CoinGrid