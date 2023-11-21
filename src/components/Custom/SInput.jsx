import { TextField } from '@mui/material';

function SInput({ label, value, onInputChange, type='text' }) {
    return (
        <TextField
            size='small'
            label={label}
            value={value}
            onChange={onInputChange}
            type={type}
            variant="outlined"
            sx={{
                "& .MuiInputBase-root": {
                    height: 40,
                },
                width: '100%',
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "#5e9ca9"
                    }
                },
                "& .MuiInputLabel-root": {
                    "&.Mui-focused": {
                        color: "#187b87"
                    }
                }
            }}
            InputProps={{
                style: {
                    borderRadius: "30px",
                    fontSize: "12px",
                }
            }}
            InputLabelProps={{
                style: {
                    fontSize: "12px",
                    lineHeight: "20px",
                    '&:hover': {
                        color: 'red'
                    }
                }
            }}
        />
    );
}

export default SInput;
