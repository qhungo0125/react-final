import { } from "@mui/icons-material";
import { classes } from "../../utils/sampleData";
import { Box, TextField } from "@mui/material";
import "./styles.css"

const sample_class = classes[0]

function General() {

    return (
        <Box sx={{ maxWidth: '500px', marginLeft: 'auto',margiRight: 'auto'}}>
            <Box className="G-input">
                <label>ID</label>
                <TextField
                    multiline
                    variant="standard"
                    size='small'
                    sx={{ width: "140px" }}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={sample_class.id}
                />
            </Box>
            <Box className="G-input">
                <label>Class Name</label>
                <TextField
                    multiline
                    variant="standard"
                    size='small'
                    sx={{ width: "300px" }}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={sample_class.name}
                />
            </Box>
            <Box className="G-input">
                <label>Student number</label>
                <TextField
                    multiline
                    variant="standard"
                    size='small'
                    sx={{ width: "140px" }}
                    InputProps={{
                        readOnly: true,
                    }}
                    value={sample_class.student_number}
                />
            </Box>

        </Box >

    );
}

export default General;