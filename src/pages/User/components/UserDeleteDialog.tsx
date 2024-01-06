import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

/* Types */
import { UserType } from "../model/Types";
/* Functions */
import { DeleteUser } from '../model/Functions';

/* Props */
type Props = { 
    data: UserType, 
    openDialog: boolean,
    closeDialog: () => void,
    handleDeleteProp: (data: UserType) => void, 
}

const UserDeleteDialog = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.openDialog);
  }, [props.openDialog])

  const handleClose = () => {
    setOpen(false);
    props.closeDialog()
  };

  const handleDelete = async () => {
    const response = await DeleteUser(props.data.id??0)
    
    if (response === true) {
        handleClose();
        props.handleDeleteProp(props.data)
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Anda yakin ingin menghapus user <b>{props.data.name}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>
                cancle
            </Button>
            <Button onClick={handleDelete} autoFocus>
                Delete
            </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UserDeleteDialog