import axios from "axios";
import {useEffect, useState } from "react"
import Box from "@mui/material"
import Stack from "@mui/material/Stack"
import { config } from "../App";

import Button from "@mui/material/Button"
import "./genre.css"
import Dashboard from "./Dashboard";
const Genresection=({selectedgenre , genresoption ,handlechange,handlechangenext,handlesort,
    ageoption, selectedage , sortoption , sortoptionAll, selectedsort , videoList })=>{        
    return(
        <>
        <Stack direction="column" xs={12} sm={12} md={6} lg={3} xl={3} >
        <Stack  className="genreParent" mr={10} direction="row" >
         <Stack ml={50} direction="row" paddingBottom={1.5} spacing={2}>
            {genresoption.map((genre)=>(
                <Button key={genre._id}
                onClick={()=>handlechange(genre)}
                value={genre.value}
                
                className={selectedgenre.includes(genre.value)?"selected-genre-btn":"genre-btn"}>
                    {genre.label}
                </Button>
            ))}
         </Stack>
         <Stack ml={8} >
            <select className="sortbyoption" onChange={(e)=>{handlesort(e)}}>
                {sortoption.map((sort)=>(
                    <option value={sort.value} key={sort._id}>{sort.label}</option>
                ))}
            </select>
         </Stack>  
         </Stack>
         
         <Stack className="ageParent" ml={50} direction="row" >
            {ageoption.map((age)=>(
                <Button key={age._id}
                value={age.value}
                className={selectedage === age.value?"selected-age-btn":"age-btn"}
                onClick={()=>handlechangenext(age)}>
                    {age.label}
                </Button>
            ))}
         </Stack>
        </Stack>  
       {/* <Dashboard videoList={videoList}/> */}
        </>
    )

}
export default Genresection