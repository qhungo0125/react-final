import { } from "@mui/icons-material";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import "./styles.css"

function AddClass() {
    const [info, setInfo] = useState({
        id: "",
        name: "",
        student_number: "",
    })

    return (
        <Box sx={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }}>
            <Box sx={{ height: "450px" }}>
                <Box className="G-input">
                    <label>ID</label>
                    <TextField
                        multiline
                        variant="standard"
                        size='small'
                        sx={{ width: "140px" }}
                        value={info.id}
                        onChange={(e) => { setInfo({ ...info, id: e.target.value }) }}
                    />
                </Box>
                <Box className="G-input">
                    <label>Class Name</label>
                    <TextField
                        multiline
                        variant="standard"
                        size='small'
                        sx={{ width: "300px" }}
                        value={info.name}
                        onChange={(e) => { setInfo({ ...info, name: e.target.value }) }}
                    />
                </Box>
                <Box className="G-input">
                    <label>Student number</label>
                    <TextField
                        multiline
                        variant="standard"
                        size='small'
                        sx={{ width: "140px" }}
                        value={info.student_number}
                        onChange={(e) => { setInfo({ ...info, student_number: e.target.value }) }}
                    />
                </Box>
            </Box>

            <Box sx={{ textAlign: "center" }}>
                <Button variant="contained">
                    Create
                </Button>
            </Box>


        </Box >

    );
}

export default AddClass;