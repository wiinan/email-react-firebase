import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useLocalContext } from '../../context/context';
import { Button } from '@material-ui/core';

export default function SimpleSnackbar() {
    const { snackbarOpen, setSnackbarOpen, snackbarMsg } = useLocalContext();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    }
    return (
        <div>
            <Snackbar color='white' anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackbarOpen} autoHideDuration={6000} onClose={handleClose} message={snackbarMsg} action={
                <React.Fragment>
                    <Button color='secondary' size='small' onClick={handleClose}>UNDO</Button>
                    <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
                        <CloseIcon fontSize='small' />
                    </IconButton>
                </React.Fragment>
            } />
        </div>
    )
}