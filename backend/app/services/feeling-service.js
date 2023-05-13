import Feeling from "../models/feeling.js";

export const findFeeling = async(videoId,userId) =>{
    const feeling = Feeling.findOne({videoId,userId});
    return feeling;
    
}

export const createFeeling = async(type,videoId,userId) =>{
    const feeling = Feeling.create({
        type:type,
        videoId:videoId,
        userId:userId
    })
    return feeling;
}