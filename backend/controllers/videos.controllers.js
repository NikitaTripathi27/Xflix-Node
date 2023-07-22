const catchAsync = require('../utils/catchAsync')
const httpStatus = require('http-status')
const ApiError =require('../utils/ApiError')
const VideoService = require('../services/videoServices')
const VideoServiceInstance = new VideoService()

const getVideoController = catchAsync(async(req,res)=>{

    const Title = req.query.title
    const Content_Rating = req.query.contentRating
    const Genres = req.query.genres
    const Sortby = req.query.sortBy
    console.log(Title, Content_Rating, Genres, Sortby, "asdasdasdas")
  const title1 = Title ? Title : "";
  const contentRating1 = Content_Rating 
  const genres1 = Genres 
  const sortBy1 = Sortby ? Sortby : "releaseDate";

   const videos = await VideoServiceInstance.getAllVideos(
      title1,
      contentRating1,
      genres1,
      sortBy1
    );
 
  if (!videos.length) {
    res.status(404).json({ message: "No Videos Found" });
  } else {
    res.status(200).send({ videos: videos });
  }
})

const postVideoController = catchAsync(async(req,res)=>{
    console.log(req.body,"body")
    const newvideo =await VideoServiceInstance.postVideo(req.body)
 
    console.log(newvideo ,"new")
    if(!newvideo){
        throw new ApiError(httpStatus.BAD_REQUEST," failed posting a video")
    }
    res.status(httpStatus.CREATED).send(newvideo)
})

const specificVideoController = catchAsync(async(req ,res)=>{
    const {id} = req.params
    console.log(id)
    const video = await VideoServiceInstance.specificVideo(id)
    res.status(httpStatus.OK).send(video)
})
   
const votesVideoController = catchAsync(async(req,res)=>{
    const {id} =req.params
    console.log(id)
    const video = await VideoServiceInstance.updateVideo(req.params.id,req.body.vote ,req.body.change)
    res.status(httpStatus.OK).send()
})

const viewsVideoController = catchAsync(async(req,res) => {
    const {id} = req.params
    console.log(id)
    
    const video = await VideoServiceInstance.viewsUpdate(req.params.id)
    res.status(httpStatus.OK).send()
})
   
module.exports={getVideoController,
    postVideoController,
    specificVideoController,
    votesVideoController,
viewsVideoController
}