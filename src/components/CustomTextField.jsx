// components/CustomTextField.jsx
import { TextField } from "@mui/material";

const CustomTextField = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...props}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& .MuiOutlinedInput-input' : {padding: '12px', height: '25px',fontSize : '14px', lineHeight : '24px'},
          '& fieldset': { borderColor: '#99a1af' }, // gray-400
          '&:hover fieldset': { borderColor: '#0ea5e9' }, // sky-500
          '&.Mui-focused fieldset': { borderColor: '#0ea5e9' },
        },
        '& .MuiInputLabel-root': {
            fontFamily :'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            fontSize : '14px',
            lineHeight : '24px',
            color: '#4a5565',
            top: '-4px'
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: '#0ea5e9', // sky-500
        },
      }}
    />
  );
};

export default CustomTextField;
