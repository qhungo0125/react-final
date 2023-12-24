import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import useGradeReview from './state';
import Loader from '../../../components/Loader';
import ReviewCard from './review';
import Box from '@mui/material/Box';


const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function Reviews() {
    const {
        open,
        anchorRef,
        selectedIndex,
        gradeTypes,
        loading,
        reviews,
        handleClick,
        handleMenuItemClick,
        handleToggle,
        handleClose,
    } = useGradeReview()



    return (

        <Box sx={{ maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', minWidth:{ sm:"500px", xs:"300px"} }}>
            {loading ?
                <Loader open={loading} />
                :
                <div>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: { sm: "center", md: 'space-between' },
                        marginBottom: "10px",
                        flexFlow: { xs:"column-reverse", sm: "column-reverse", md: "row" },
                        alignItems:"center"
                    }}>
                        <div>Grade composition: &nbsp;&nbsp;
                            <span style={{ fontWeight: "600", fontSize: "130%" }}>
                                {gradeTypes[selectedIndex].percentage}
                            </span>
                        </div>
                        <Box>
                            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                                <Button variant='outlined' onClick={handleClick} sx={{ minWidth: '110px !important' }} >
                                    {gradeTypes[selectedIndex].scoreTypeName}
                                </Button>
                                <Button
                                    size="small"
                                    aria-controls={open ? 'split-button-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-label="select merge strategy"
                                    aria-haspopup="menu"
                                    onClick={handleToggle}
                                >
                                    <ArrowDropDownIcon />
                                </Button>
                            </ButtonGroup>
                            <Popper
                                sx={{
                                    zIndex: 1,
                                    minWidth: '150px',
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                            >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{
                                            transformOrigin:
                                                placement === 'bottom' ? 'center top' : 'center bottom',
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList id="split-button-menu" autoFocusItem>
                                                    {gradeTypes.map((type, index) => (
                                                        <MenuItem
                                                            key={type.scoreTypeId}
                                                            disabled={index === 2}
                                                            selected={index === selectedIndex}
                                                            onClick={(event) => handleMenuItemClick(event, index)}
                                                        >
                                                            {type.scoreTypeName}
                                                        </MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            paddingBlock: '10px',
                            borderRadius: 2,
                            bgcolor: 'background.default',

                        }}
                    >
                        {reviews.map((review) => (
                            <ReviewCard key={review.id} info={review} />
                        ))}

                    </Box>

                </div>
            }
        </Box>
    );
}
