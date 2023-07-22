import {Link} from "react-router-dom";
import {Box,Grid} from "@mui/material";
import Stack from '@mui/material/Stack';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
// import axios from "axios";
import {config} from "./App"
import { useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import{useSnackbar} from "notistack"
import MenuItem from '@mui/material/MenuItem';
import UploadVideo from "./Components/UploadVideo";
import Flix from "./assets/Flix.png"
import X from "./assets/X.png"
import DialogContent from "@mui/material/DialogContent";

export default function Header({children , hasHiddenAuthButtons ,genresoption , ageoption}){
  const{enqueueSnackbar} = useSnackbar();
    const [ open , setopen] = useState(false);
    const handleupload=()=>{
        setopen(true);
    }
    const handletoClose=()=>{
      setopen(false);
    }
  
    return(
        <>
       
        <Stack direction="row" justifyContent="space-between" spacing={3} p={3}>
        
        <Box ml={2} mt={2} sx={{height:70 , width:100}}>
            <img src={X} alt="ximg"/>
            <img src={Flix} alt="fliximg"/>
        </Box>
       {children}
      { !hasHiddenAuthButtons && (
        <Button marginright ={1} 
      className ="upload-btn" 
      style={{height: '30px', width : '100px'}} 
      variant="contained" startIcon={<FileUploadIcon />}
      onClick={()=>handleupload()}>
        Upload
      </Button>)}
      </Stack>
  
      {!hasHiddenAuthButtons && (<UploadVideo genresoption={genresoption}
        ageoption={ageoption}
        setopen={setopen}
        open={open}
        handletoClose={handletoClose}/>)}
       
      
        </>
    )
}