import {
    Button,
    Box,
    Modal,
    Typography,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid grey',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    minHeight: '300px',
    minWidth: '400px'
};

function AvatarModal({ open, closeModel, setNewAvatarFile, currentAvatar }) {
    const [avatar, setAvatar] = useState({ preview: currentAvatar })

    useEffect(() => {
        setAvatar({ preview: currentAvatar });
    }, [currentAvatar]);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]

        file.preview = URL.createObjectURL(file)

        setAvatar(file)
    }

    console.log(avatar)

    const handleClose = () => {
        closeModel()
        setAvatar({ preview: currentAvatar })
    }

    const handleSaveAvatar = () => {
        setNewAvatarFile(avatar)
        closeModel()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <CloseIcon fontSize="inherit" />
                </IconButton>
            }
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Upload Avatar
                </Typography>
                <Box sx={{ display: 'flex', marginTop: '15px', gap: '20px' }}>
                    <img
                        src={avatar.preview}
                        style={{ borderRadius: '10px', maxHeight: '300px', maxWidth: '300px' }}
                    />
                    <div>
                        <Button size='small' variant="outlined">
                            <label htmlFor="file" style={{ textTransform: 'none' }}>
                                Browse
                            </label>
                        </Button>
                        <input
                            id="file"
                            type='file'
                            onChange={handlePreviewAvatar}
                            style={{ display: 'none' }}
                        >
                        </input>
                    </div>
                </Box>
                <div style={{ marginTop: "30px", textAlign: "center" }}>
                    <Button size='small' variant="text" sx={{ marginRight: '15px' }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button size='small' variant="contained" onClick={handleSaveAvatar}>
                        Save
                    </Button>
                </div>

            </Box>
        </Modal>
    );
}

export default AvatarModal;