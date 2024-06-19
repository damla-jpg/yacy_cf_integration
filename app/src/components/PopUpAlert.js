import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import styled from 'styled-components';

// from https://mui.com/material-ui/react-dialog/

const StyledDialog = styled(Dialog)(({ theme }) => ({
    ".MuiPaper-root": {
        backgroundColor: "#2C2F33",
        color: "white",
    },
    ".MuiTypography-root": {
        backgroundColor: "#2C2F33",
        color: "white",
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({title, content, buttonLabel, agreeAction, disagreeAction}) {
  const [open, setOpen] = React.useState(false);

  const handleAgree = () => {
    agreeAction();
    setOpen(false);
  }

  const handleDisagree = () => {
    disagreeAction();
    setOpen(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment >
      <Button sx={{marginTop: "10px"}} variant="contained" color="secondary" onClick={handleClickOpen}>
        {buttonLabel}
      </Button>
      <StyledDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleDisagree}>Disagree</Button>
          <Button variant="contained" onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </StyledDialog>
    </React.Fragment>
  );
}
