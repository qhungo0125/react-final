import { Label } from "@mui/icons-material";
import classes from "../../utils/sampleData";

const sample_class = classes[0]

function General() {
    return (
        <>
            <Grid item xs={12} sm={12} md={6}>
                <Label>ID</Label>
                <TextField
                    fullWidth
                    variant="outlined"
                />
            </Grid>
        </>
    );
}

export default General;