import { Snackbar, Alert } from '@mui/material';

import PropTypes from 'prop-types';


SnackbarAlert.propTypes = {
  showSnackBarAlert: PropTypes.object,
  handleSnackbarClose: PropTypes.func
};


export default function SnackbarAlert({showSnackBarAlert,handleSnackbarClose} : { showSnackBarAlert: any; handleSnackbarClose: any }) 
  
 {
  const vertical = 'bottom';
  const horizontal = 'right';
  return (
    <>
      {showSnackBarAlert.type ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
          open={showSnackBarAlert.status}
          autoHideDuration={3000}
          // severity={showSnackBarAlert.type}
          onClose={handleSnackbarClose}
        >
          <Alert
            variant="filled"
            onClose={handleSnackbarClose}
            severity={showSnackBarAlert.type}
            sx={{ width: '100%' }}
          >
            {showSnackBarAlert.message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}
