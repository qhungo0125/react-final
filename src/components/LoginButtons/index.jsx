import { Button, Icon } from '@mui/material';

function SButton({styles, onButtonClick}) {
    return (
        <Button
            variant="contained"
            onClick={onButtonClick}
            sx={{
                backgroundColor: styles.bgColor,
                borderRadius: '20px',
                width: '100%',
                paddingInline:'10px',
                fontSize:'inherit',
                textTransform:'none',
                height:'38px',
                color:styles.color,
                '&:hover': {
                    backgroundColor: styles.hoverColor,
                    boxShadow: 'none',
                },
            }}
        >
            <div style={{marginRight:'8px',fontSize:'18px', marginTop:'3px'}}>{styles.icon}</div>{styles.text}
        </Button>
    );
}

export default SButton;