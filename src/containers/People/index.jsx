import { Box, Typography } from "@mui/material";
import { students, teachers } from "../../utils/sampleData";

function People() {
    return (
        <Box sx={{width:'500px', marginLeft:'auto', marginRight:'auto'}}>
            <Box>
                <Typography variant="h5" component="div" sx={{ borderBottom: "2px solid black", marginBottom: '15px' }}>
                    Teachers
                </Typography>
                <Typography variant="body1" component="div">
                    {
                        teachers.map(teacher => (
                            <div>{teacher}</div>
                        ))
                    }
                </Typography>
            </Box>
            <Box sx={{marginTop:"40px"}}>
                <Typography variant="h5" component="div" sx={{ borderBottom: "2px solid black", marginBottom: '15px' }}>
                    Student
                </Typography>
                <Typography variant="body1" component="div">
                    {
                        students.map(student => (
                            <div>{student}</div>
                        ))
                    }
                </Typography>
            </Box>
        </Box>

    );
}

export default People;