import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, TextField, IconButton } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';

export default function DecisionDialog({ open, handleCloseDialog, currentScore, expectedScore }) {
    const [score, setScore] = React.useState(expectedScore.toString())
    const [acceptChecked, setAcceptChecked] = React.useState(true)
    

    const handleCheckChange = () => {
        if (acceptChecked === true) {
            setScore(currentScore)

        } else {
            setScore(expectedScore)
        }
        setAcceptChecked(prev => !prev)

    }

    const handleSaveClick = () => {
        //send save request


        //close dialog
        handleCloseDialog()
    }

    console.log(acceptChecked)
    return (
        <Dialog
            open={open}
            sx={{ padding: '50px', "& .MuiPaper-root": { padding: "10px" } }}
        >
            <DialogTitle sx={{ width: "500px" }}>
                {"Review Decision"}
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="normal"
                    sx={{ position: 'absolute', right: '5px', top: '5px' }}
                    onClick={handleCloseDialog}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <FormGroup sx={{ paddingInline: "30px", flexFlow: "row", gap: "30px" }}>
                        <div style={{ display: "flex", flexFlow: "column" }}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={acceptChecked}
                                    onChange={handleCheckChange}
                                />}
                                label="Accept"
                            />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={!acceptChecked}
                                    onChange={handleCheckChange}
                                />}
                                label="Not Accept"
                            />
                        </div>


                        <TextField
                            label="Final score"
                            variant="outlined"
                            required
                            disabled={!acceptChecked}
                            value={score}
                            onChange={(e) => { setScore(e.target.value) }}
                            sx={{ marginTop: '20px', maxWidth: "150px", marginInline: 'auto' }}
                        />
                    </FormGroup>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleSaveClick }>Save</Button>
            </DialogActions>
        </Dialog>
    );
}