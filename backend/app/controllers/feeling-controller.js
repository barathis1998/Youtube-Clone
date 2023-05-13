import Feeling from "../models/feeling.js";
import { getVideoById } from "../services/video-service.js";
import responses from "../utils/responses.js";
import * as fs from "../services/feeling-service.js"
import advancedResults from "../../middleware/advancedResults.js";
import Video from "../models/videos.js";
import advancedResultsFunc from "./../utils/advancedResultsFunc.js"

export const createFeeling = async (req,res,next) =>{
    console.log(req.body);
    const userId = req.user._id;
    const {videoId,type} = req.body;
    console.log(videoId,type);
    const video = await getVideoById(videoId);
    if (!video){
        
        responses.setErrorResponse({message:"Video not found"},res,404);
        return;
    }
    const feeling = await fs.findFeeling(videoId,userId);
    let createdFeeling;
    if (!feeling){
         createdFeeling = await fs.createFeeling(type,videoId,userId);
    }

    responses.setSuccessfulResponse({message:"Feeling created successfully",data:createdFeeling},res,200);
    
}


export const getLikedVideo = async (req,res,next) =>{
    const likes = await Feeling.find({
        userId: req.user._id,
        type:'like'
    })

    if (likes.length === 0){
        responses.setSuccessfulResponse({Message:'No Liked Videos'},res,200);
        return;
    }

    const  videosId = likes.map((video)=>{
        return {
            _id : video.videoId.toString()
        }
    })
    console.log(videosId);
    const populates = [{path:'userId',select:'firstName lastName'}];
    advancedResultsFunc(req,res,Video,populates,'draft', videosId);
}   