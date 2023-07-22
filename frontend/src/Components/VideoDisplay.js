import {Grid,Button} from "@mui/material";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Header from "../Header"
import { useEffect  , useState} from "react";
import {config} from "../App"
import axios from "axios"

import { useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import "./VideoDisplay.css"
import{useSnackbar} from "notistack"
import { useHistory } from "react-router-dom";
const VideoDisplay=()=>{
    const {enqueueSnackbar} =useSnackbar()
    const[videoInFrame , setvideoInFrame] = useState(null);
    const[videosBelowDisplay , setVideosBelowDisplay] = useState([]);
    const params  = useParams();
    const[positive , setpositive]=useState(0);
    const [view , setview] = useState(0);
    const[increaseReview ,setincreaseReview] =useState(0);

    const history = useHistory();
    const performDashboardvideosCall =async()=>{
        try{
            const dashurl = await axios.get(`${config.endpoint}/v1/videos`)
            setVideosBelowDisplay(dashurl.data.videos);
        }catch(error){
            if(error.response){
                enqueueSnackbar(error.response.data.message ,{variant:"error"})
            }else{
                enqueueSnackbar("Something went wrong . Check that backend is running" ,{variant:"error"})
            }
            history.push('./')
        }
    }

    useEffect(()=>{
        performDashboardvideosCall();
    },[])
  
 const getvideoOnDisplay=async()=>{
    try{
        const urlvideo = await axios.get(`${config.endpoint}/v1/videos/${params.id}`)
        console.log(urlvideo , "checkpoint")
        console.log(urlvideo.data);
        setvideoInFrame(urlvideo.data);
        setview(urlvideo.data.viewCount + 1);
        
    }
    catch(error){
        console.log(error);  
    }
 }
const getviewCount=async()=>{
    try{
    await axios.patch(`${config.endpoint}/v1/videos/${params.id}/views`,view)
    }
    catch(error){
        if(error.response){
            enqueueSnackbar(error.response.data.message ,{variant:'error'})
        }
        else{
            enqueueSnackbar("Something went wrong. Check that backend is running",{variant:'error'})
        }
    }
}

useEffect(()=>{
    getviewCount();
    getvideoOnDisplay()
},[params.id])


const handlereview=async(id, vote , change)=>{
   
    let reqobj = {
        vote: vote,
                    change: change
                }
   try{
    await axios.patch(`${config.endpoint}/v1/videos/${id}/votes`,reqobj)
    getvideoOnDisplay();
   }catch(error){
    if(error.response){
        enqueueSnackbar(error.response.data.message, {variant:"error"})
    }else{
        enqueueSnackbar('Something went wrong. Check that Backend is running', {variant:"error"})
    }
   }
}

return(
    <>
    <Header hasHiddenAuthButtons/>
    
    {videoInFrame?(<div><iframe width ="100%"  height="400"  src={`https://${videoInFrame.videoLink}`} title={videoInFrame.title} frameBorder='0' autoPlay allowFullScreen></iframe>
     <Grid container direction="row" spacing={2} padding={1} className="videochild" >
        <Grid item container direction="column" spacing={1}>
        <Grid item className="headchild">
         {videoInFrame?.title}
         </Grid>
         <Grid item container spacing={3} className="child" direction="row">
         <Grid  item>{videoInFrame.contentRating}</Grid>
        <Grid item>{videoInFrame.genre}</Grid>
        
        <Grid item><span className="dot"></span>{videoInFrame.releaseDate}</Grid>
        </Grid>
        </Grid>
        <Grid item direction="row" spacing={3}>
            <div className="vote-container">
        <Button
          onClick={()=>handlereview( videoInFrame._id ,"upVote" , "increase")}
          className="vote-pill increase-btn">
            
            <ThumbUpIcon/><span>{videoInFrame.votes.upVotes}</span></Button>
        <Button 
        
         onClick={()=>handlereview(videoInFrame._id , "downVote" ,"increase")}
         className="vote-pill decrease-btn">
            <ThumbDownIcon/><span>{videoInFrame.votes.downVotes}</span></Button>
            </div>
        </Grid>
        </Grid></div>):(null)} 
     <hr
        width="98%"
        style={{
          color: 'white',
        }}
      />
    <Dashboard videoList={videosBelowDisplay}/>
  
    </>
)

}
export default VideoDisplay;