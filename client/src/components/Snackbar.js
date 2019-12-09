import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function Snackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = variant => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { color: "red" });
  };

  const styles = {
    success: { backgroundColor: 'purple' },
  }

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant()}>Show success snackbar</Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider 
    classes={{
      variantSuccess: {backgroundColor: "purple"}
    }}    
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
  }} maxSnack={3}>
      <Snackbar color="red" />
    </SnackbarProvider>
  );
}