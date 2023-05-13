import express from "express";
import Video from "../models/videos.js";
import responses from "../utils/responses.js";

export const getVideoById = (id) =>{
const video =Video.findById(id)
 .populate({path:'userId', select: 'firstName lastName subscribers photoUrl'})
 .populate({path:'likes'})
 .populate({path:'dislikes'})
 .populate({path:'comments',select: 'commentText userId'})
    return video;
}

export const uploadVideo = (id,model) =>{
        console.log(model.originalname);
        const video = Video.findByIdAndUpdate(id,
            {url: model.filename,
            title: model.originalname},{
                new:true,runValidators: true
            }
            ).exec();
            return video;
}


export const getVideo = async (params) =>{
    const video = Video.find(params).exec();
    return video;
}

export const updateThumbnail = async(id,url,description)=>{
    console.log("inside thumbnail");
    console.log("description:"+description)
    const video = Video.findByIdAndUpdate(id,{thumbNailUrl:url,description:description});
    return video;

}

export const getVideoByUserId = async (userId) =>{
    const videos = Video.find({userId}).exec();
    return videos;
}

export const deleteVideo = async(id)=>{
    const video = Video.findByIdAndDelete(id).exec();
    return video
}
