import React ,{useEffect , useState} from"react";
import {Grid} from "@mui/material";
import {Box ,TextField} from "@mui/material";
import Stack from "@mui/material/Stack"
import Button from '@mui/material/Button';

import Header from "../Header";
import {config} from "../App"
import axios from "axios"
import "./Home.css"
import Genresection from "./genrelist";
import Dashboard from "./Dashboard";
import{useSnackbar} from "notistack"


    export default function Home(){

        const {enqueueSnackbar} = useSnackbar();

        const[videoList , setvideoList] = useState([])
    
        const[allvideos ,setallvideos] = useState([])
        const[debounceid , setdebounceid] = useState(0);

        const genresoption = [
            {label:"All",value:"All"},
            {label:"Education",value:"Education"},
            {label:"Sports" , value:"Sports"},
            {label:"Comedy" , value:"Comedy"},
            {label:"Lifestyle" , value:"Lifestyle"}
        ]

        const ageoption=[
            {label:'All' ,value:"All"},
            {label:'7+' , value:'7+'},
            {label:'11+' , value:'11+'},
            {label:'15+' , value:'15+'},
            {label:'18+' , value:'18+'}
        ]

        const sortoption=[
            {label:'Release Date', value:'release Date'},
            {label:'View Count' , value : 'View Count'},
        ]
        const[selectedsort , setselectedsort] = useState('releaseDate')
        const[selectedage , setselectedage] = useState('All');
        const[selectedgenre , setselectedgenre] =useState(['All']);


            const performAPIcall=async()=>{
            try{
            const res = await axios.get(`${config.endpoint}/v1/videos`)
            // const finalres = await res.json;
            const videos = res.data.videos;
            // console.log(videos);
            setvideoList(videos);
            setallvideos(videos);
            return videos;
            }
            catch(error){
                if(error.response){
                    enqueueSnackbar(error.response.data.message ,{variant:"error"})
                }else{
                    enqueueSnackbar("Something went wrong . Check that backend is running" ,{variant:"error"})
                }
            }
        }
        console.log(videoList);
        const performAPIsearch=async(text)=>{
            console.log(text);
            if(text !==''){
            try{
                const searchurl = await axios.get(`${config.endpoint}/v1/videos?title=${text}
                `)
                console.log(searchurl.data);
                setvideoList(searchurl.data.videos);
                // return searchurl.data;
            }catch(error){
                if(error.response){
                    enqueueSnackbar(error.response.data.message ,{variant:"error"})
                }else{
                    enqueueSnackbar("Something went wrong . Check that backend is running" ,{variant:"error"})
                }
            }
        }
     }
        const debounceSearch=(event, dtime)=>{
            if(debounceid)
                clearTimeout(debounceid);

            let timerid = setTimeout(()=>{
                performAPIsearch(event.target.value);
            },dtime)
            setdebounceid(timerid);
        }
        useEffect(()=>{
            performAPIcall();
        },[])

        

        const genreapisearch=async(selectedgenre)=>{
            // console.log(genselect)
            // if(genselect.length){
            try{
                const Gapi = await axios.get(`${config.endpoint}/v1/videos?genres=${selectedgenre.join(",")}`)
                setvideoList(Gapi.data.videos);
                
            }catch(error){
                if(error.response){
                    enqueueSnackbar(error.response.data.message ,{variant:"error"})
                }else{
                    enqueueSnackbar("Something went wrong . Check that backend is running" ,{variant:"error"})
                }
            }
      
        }
        const handlechange=(genre)=>{
            console.log(genre)
            const gval = genre.value;
            const all = "All"
        
        if(gval==="All")
            setselectedgenre(["All"]);
        else{
            const genrewithoutAll = selectedgenre.filter((ele)=>ele!==all)
            let nextgenreval;
            if(genrewithoutAll.includes(gval)){
                nextgenreval = genrewithoutAll.filter((ele)=>ele!==gval)}
            else{
                nextgenreval = [...genrewithoutAll , gval];
            }
            if(nextgenreval.length===0)
               setselectedgenre(["All"]);
            
            else{
                setselectedgenre(nextgenreval)
            }
        }
    }
            useEffect(()=>{
                genreapisearch(selectedgenre);
            },[selectedgenre])
        
            const genreAgeAPIcall=async(selectedage)=>{
           //in reference its given that browser converts that + into encoded form. we dont have to use it here
            try {
                const Ageapi = await axios.get(`${config.endpoint}/v1/videos?contentRating=${selectedage}%2B`);
                setvideoList(Ageapi.data.videos);
            }
            catch (error) {
               if(error.response){
                enqueueSnackbar(error.response.data.message,{variant:'error'})
               }else{
                enqueueSnackbar('Something went wrong. Check that Backend is running',{variant:'error'})
               }
            }
        }
        const handlechangenext = (age)=>{
            console.log(age.value)
            const aval = age.value
            const all= 'All'
            if(aval !== all){
                setselectedage(aval);
            }
            else{
                setselectedage(all)
            }
        }

        useEffect(()=>{
            genreAgeAPIcall(selectedage);
        },[selectedage])


        const handlesort=(e)=>{
            console.log(e.target.value);
            const sval = e.target.value
            if(sval !== 'releaseDate')
                setselectedsort(sval);
            else
                setselectedsort('releaseDate');
        }

        const sortByAPIcall=async(valuesorted)=>{
            console.log(valuesorted)
            try{
            const res =  await axios.get(`${config.endpoint}/v1/videos?sortBy=${valuesorted}`)
            setvideoList(res.data.videos);
            }catch(error){
                if(error.response){
                    enqueueSnackbar(error.response.data.message ,{variant:"error"})
                }else{
                    enqueueSnackbar("Something went wrong . Check that backend is running" ,{variant:"error"})
                }
            }
        }
        useEffect(()=>{
            sortByAPIcall(selectedsort);
        },[selectedsort]);
        

        return(
            <>
        <Header 
        genresoption={genresoption}
        ageoption={ageoption}>  
        <Stack>  
        <Box sx={{width:"100%"}}>
        <TextField  id="outlined-basic-fullWidth" variant="outlined"
        fullWidth 
        input="text"
        placeholder="type categories"
        name="search"
        inputProps={{ sx: {color: '#fff' , border: "2px solid grey",} }} 
        onChange={(event)=>debounceSearch(event , 500)}
        />
        </Box>
        </Stack>
            </Header>
           
          <Genresection  
            selectedgenre={selectedgenre}
            genresoption={genresoption}
            handlechange={handlechange}
            handlechangenext={handlechangenext}
            handlesort={handlesort}
            ageoption={ageoption}
            selectedage={selectedage}
            sortoption={sortoption} 
            selectedsort={selectedsort}
            videoList={videoList} 
            
           />  
         
                <Grid container display='flex' direction="row">
                    {videoList.length !==0 && (
                    <Dashboard videoList={videoList}/>)}
                </Grid>

            {/* <Dashboard videoList={allvideos}/> */}
            </>
        )
    }