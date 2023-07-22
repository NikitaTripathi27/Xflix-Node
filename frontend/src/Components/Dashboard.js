
import {Grid} from "@mui/material"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography,
  } from "@mui/material";
  import React from "react";
  import {useHistory} from "react-router-dom"
  import "./Dashboard.css"
  import {config} from "../App"
  
  import {Link} from "react-router-dom"

const Dashboard=({videoList})=>{
    console.log(videoList)
    const history = useHistory();
     const handlevideo=(vid)=>{
        console.log(vid);
        history.push(`/playvideo/${vid._id}`);
        // const url = `${config.endpoint}/videos:${vid.id}`
    }
    return(
        <>
        <Grid container spacing={2} display='flex' direction="row" p={2}>
       
            {videoList.map((vid)=>(
               
                <Grid item className="video-tile-link" xs={12} sm={12} md={6} lg={3} xl={3} key={vid._id}>
                     <Card className="card video-tile" onClick={()=>handlevideo(vid)}>
                        <CardMedia component="img" image={vid.previewImage} alt="images"/>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {vid.title}
                        </Typography>
                        <Typography component="legend">
                            {vid.releaseDate}</Typography>
                        </CardContent>
                     </Card>
                </Grid>
               
            ))
            }
    </Grid>
        </>
    )

}
export default Dashboard