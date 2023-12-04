import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ClassBanner({ className }) {
    return (
        <Card sx={{
            maxWidth: "100%",
            height: "auto !important",
        }}>
            <div style={{ position: "relative" }}>
                <Typography sx={{ position: "absolute", zIndex:2 }}>{className}</Typography>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="auto"
                    image="../class_banner_default.png"
                    title={className}
                    sx={{ position: "relative" }}
                />
            </div>

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}