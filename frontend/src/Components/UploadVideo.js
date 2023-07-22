import { TextField , Button } from "@mui/material"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import "./UploadVideo.css"
import DialogContent from "@mui/material/DialogContent";
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import {config} from "../App"
import axios from "axios";
import{useSnackbar} from "notistack"
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react"
import Menu from '@mui/material/Menu';
const UploadVideo=(props)=>{
  
    //open, handletoClose ,genreoption ,ageoption ,uploadVideo ,videoObj , handleChange
    const{enqueueSnackbar} = useSnackbar();
    const[formData , setformData] = useState({ "videoLink":"",
    "title":"",
    "genre":"",
    "contentRating":"",
    "releaseDate":"",
    "previewImage":""})

    // console.log(genresoption)

    const handleChange=(event)=>{
        const newformData ={...formData , [event.target.name]:event.target.value};
        setformData(newformData)
      
    };
    const handleupload=()=>{
      uploadVideo(formData)
    }

    const uploadVideo=async(reqbody)=>{
      console.log(formData);
        try{
          await axios.post(`${config.endpoint}/v1/videos`,reqbody)
          setformData({ "videoLink":"",
          "title":"",
          "genre":"",
          "contentRating":"",
          "releaseDate":"",
          "previewImage":""})
          
        }catch(error){
          if(error.response){
            enqueueSnackbar(error.response.data.message , {variant:'error'})
          }
          else{
            enqueueSnackbar("Something went wrong. Check that backend is running" ,{variant:'error'})
          }
        }
  }

  
    return(
        <>
         <Dialog open={props.open} onClose={props.handletoClose} PaperProps={{sx:{width:"35%" , minHeight: '80vh',
        maxHeight: '80vh', backgroundColor:'darkgrey'}}}>
            <Stack direction="row" justifyContent="space-between" spacing={1}>
            <DialogTitle>upload</DialogTitle>
            <CloseIcon onClick={props.handletoClose}/>
            </Stack>
            
            <DialogContent>
            <Stack spacing={1}>
            <TextField 
            required
            id="dialog-title"
            label="videoLink"
            placeholder="VideoLink"
            variant="outlined" 
            helperText="This link will be used to derive the video"
            name="videoLink"
            fullWidth
            value={formData.videoLink}
            onChange={handleChange}/>

            <TextField 
            require
            id="dialog-thumbnail"
            label="previewImage"
            placeholder="previewImage"
            variant="outlined"
            helperText="This link will be used to preview the thumbnail preview image"
            name="previewImage"
            fullWidth
            value={formData.previewImage}
            onChange={handleChange}/>

            <TextField 
            required
            id="dialog-title"
            label="title"
            placeholder="Title"
            variant="outlined"
            helperText="The title will be representative text for video"
            name="title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            />

            <TextField
            select
            required
            id="dialog-genre"
            label="genre"
            variant="outlined"
            helperText="The genre will be representing genre for video"
            name="genre"
            fullWidth
            value={formData.genre}
            onChange={handleChange}>
           {props.genresoption.filter((ele)=> ele.value !== "All").map((ele)=>(
                <MenuItem key="genre-key" value={ele.value}>{ele.label}</MenuItem>
           ))}
           </TextField>

            <TextField
            select
            required
            id="dialog-rating"
            label="contentRating"
            variant="outlined"
            helperText="The contentRating will define suitable age group"
            name="contentRating"
            fullWidth
            value={formData.contentRating}
            onChange={handleChange}>
            
            {props.ageoption.map((ele)=>(
                <MenuItem key="age-key" value={ele.value}>{ele.label}</MenuItem>
            ))}
            
            </TextField>

            <TextField
            required
            type="date"
            id="release-date"
            label="release Date"
            
            helperText="This will be used for released date"
            variant="outlined"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}/>

          <Stack direction="row" spacing={2}>
            <Button variant="contained"
             color="error" 
             onClick={handleupload}>
             Submit</Button>

            <Button onClick={props.handletoClose}>Cancel</Button>
            
            </Stack>
            </Stack>
           </DialogContent>
        </Dialog>   
       
        </>
    )
}
export default UploadVideo