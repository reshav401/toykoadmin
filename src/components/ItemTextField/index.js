import { Grid, TextField, Typography } from '@mui/material'
import { withStyles } from '@mui/styles';
import React from 'react'

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#D3D3D3',
      }
    },
  },
})(TextField);

function ItemTextField({label, value}) {
  return (
    <Grid 
      container 
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h4" component="h5" gutterBottom>
          {label}:
        </Typography>
      </Grid>

      <Grid item>
        <CssTextField
          variant="outlined"
          value={value || ""}
          InputProps={{
            readOnly: true,
          }}
          size="small"
        />
      </Grid>
    </Grid>
  )
}

export default ItemTextField
