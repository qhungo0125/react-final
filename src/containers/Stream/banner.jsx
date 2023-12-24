import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { classes } from "../../utils/sampleData";

const sample_class = classes[0]


export default function ClassBanner({ className }) {
    return (
        <Card sx={{
            maxWidth: "100%",
            height: "auto !important",
            maxHeight: "200px"
        }}>
            <div style={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    image="../class_banner.jpg"
                    title={className}
                    sx={{ position: "relative", maxHeight: "200px" }}
                />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            position: "relative",
                            width: "100%",
                            padding: "0",
                            paddingInline: "10px",
                            backgroundColor:"#1976d2",
                            color:"white",
                            "& .MuiAccordionSummary-expandIconWrapper": {color: 'inherit'}
                        }}
                    >
                        <Typography component={"div"}>
                            {className}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{backgroundColor:'aliceblue'}}>
                        <div style={{fontSize:"14px", marginBlock:"5px"}}>
                            Class ID: {sample_class.id}<br/>
                            Student number: {sample_class.student_number}
                        </div>
                    </AccordionDetails>
                </Accordion>

            </div>
        </Card >
    );
}