const httpStatus = require('http-status')
const { votesVideoController } = require('../controllers/videos.controllers')
const {Video} =  require('../models/video.models')
const ApiError = require('../utils/ApiError')
class VideoServices{

 getAllVideos = async(title ,Content_Rating ,Genres , Sortby) => {
   
    let obj={};
    obj={...obj , title:{$regex:title , $options:"i"}} 
    
    if(Content_Rating){
        const list = ['All' , '7+' ,'12+' ,'16+' ,'18+']
        if(list.includes(Content_Rating)){
            console.log("list")
            obj={...obj , contentRating:{ $in : Content_Rating}}
            console.log(obj,"obj")
        }
    }

    
    if(Genres){
    const genrelist=['All','Comedy','Education','Lifestyle','Movies','Sports']
    if(Genres === 'All'){ 
        const vid = await Video.find({})
        console.log(vid)
        return vid
    }
    let genreArray = Genres
    if (Genres.includes(',')) {
        genreArray = Genres.split(',');
       
      } else {
        genreArray = [Genres];
      }
        // let genreArray = Genres.split(',');
        let check = genreArray.some((item) => !genrelist.includes(item))
        console.log("check",check)
        if(check){
            throw new ApiError(httpStatus.BAD_REQUEST,"Genre does not exist")
        }else{
            obj={...obj, genre: { $in: genreArray }}
        }
}
      

     let videos = await Video.find(obj)
     console.log(videos,"vids")
        if(Sortby){
            if(Sortby == 'viewCount'){
             
                videos = videos.sort((a,b)=>b.viewCount - a.viewCount)
            }
            else{
                videos = videos.sort((a,b)=> b.releaseDate.getTime() - a.releaseDate.getTime())
            }
        }
    return videos
 }
       

 postVideo = async(body) => {
    const{title , videoLink ,  releaseDate,previewImage , contentRating ,genre} = body
    const postVideo =  new Video({ 
        title,
        videoLink,
        contentRating,
        genre,
        previewImage,
        releaseDate
    })
    await postVideo.save()
    return postVideo
 }

 specificVideo = async(id)=>{
    const video = await Video.findById(id)
    return video
 }

 updateVideo = async(id ,votesObj ,changes)=>{
    const user =await Video.findById(id)
    let changeVoteType;
    if(votesObj === 'upVote'){
        changeVoteType = 'upVotes'
    }else{
        changeVoteType = 'downVotes'
    }
    let voteValue = user.votes[changeVoteType]
    let val = voteValue
    if( changes === 'increase'){
        val += 1
    }else{
        val -= 1
    }

    val = Math.max(val,0)
    user.votes[changeVoteType] = val
    await user.save()
    return
 }

 viewsUpdate = async(id )=>{
  
    const video= await Video.findById(id)
    let val = video.viewCount
    let count = val
    count += 1
    video.viewCount =count
    await video.save()
   
 }

}

module.exports = VideoServices