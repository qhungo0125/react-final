import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Comment from './comment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DecisionDialog from './decisionDialog';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
    lineHeight: '60px',
    marginBottom: '30px',
    paddingInline: '50px',
    paddingBlock: '30px',
    position: 'relative'
}));


export default function ReviewCard({ info }) {

    const [openDialog, setOpenDialog] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    return (
        <Item elevation={2}>
            <Box sx={{ display: { xs: 'block', md: 'flex' }, gap: '70px', color: 'black' }}>
                <Box sx={{ width: { xs: '100%', md: "200px" } }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontSize: '1.1rem' }}>
                        Student Info
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        ID: {info.student.id}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Name: {info.student.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Current score:
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Expected Score: {info.expectedScore}
                    </Typography>

                </Box>
                <Box sx={{ width: { xs: '100%', md: "500px" } }}>
                    <div>
                        <Typography variant="subtitle2" sx={{ fontSize: '1.1rem' }} gutterBottom>
                            Explaination
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {info.explain}
                        </Typography>
                    </div>
                    <Divider variant="middle">Comments</Divider>
                    <div sx={{ width: '100%' }}>
                        <Comment />
                    </div>
                </Box>
            </Box>
            <IconButton
                aria-label="close"
                color="inherit"
                size="normal"
                sx={{ position: 'absolute', right: '15px', top: '15px' }}
                onClick={handleClickOpenDialog}
            >
                <RateReviewIcon fontSize="inherit" />
            </IconButton>
            <DecisionDialog
                open={openDialog}
                handleCloseDialog={handleCloseDialog}
                currentScore={"5"}
                expectedScore={info.expectedScore}
            />
        </Item>
    );
}