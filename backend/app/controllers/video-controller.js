import express, { response } from 'express';
import responses from "./../utils/responses.js";
import asyncHandler from "../../middleware/async.js";
import Video from "../models/videos.js";
import mongoose from 'mongoose';
import * as Vs from "./../services/video-service.js";
import fs from 'fs';
import path from 'path';
import { request } from 'http';
import advancedResults from '../../middleware/advancedResults.js';
import * as Hs from "./../services/history-service.js"




export const getVideo = asyncHandler(async(req,res,next) =>{
   
    const video =await Vs.getVideoById(req.params.id);
    if (!video){
        responses.setErrorResponse({message: "Video not Found"}, res,404);
        return;
    }

responses.setSuccessfulResponse({ sucess: true, data: video }, res,200);
});

export const getVideoByUser = async(req,res,next)=>{
    console.log("inside video by user");
    //console.log(req.user);
    let userId = req.user._id;
    let videos = await Vs.getVideoByUserId(userId);
    //console.log(videos);
    if(videos){
        console.log("inside video if")
    responses.setSuccessfulResponse({message:"Successful",data:videos},res,400);
    }
    else{
        responses.setErrorResponse({message:"No Video found"},res,404);
    }

}

export const getVideos = async (req, res, next) => {
    // setSuccessfulResponse(res.advancedResults, res);
    //console.log("inside get videos");
    let params={};
    const videos = await Vs.getVideo(params);
    responses.setSuccessfulResponse({messages:'successful',data:res.advancedResults},res,400);
}




export const videoUpload = async (request, response, next) => {
  let videoModel = new Video({ userId: request.user._id });
  videoModel.save();

  if (!request.file) {
    responses.setErrorResponse({ message: 'Please upload a Video' }, response, 404);
    return;
  }

  const video = request.file;

  if (video.size > process.env.MAX_FILE_UPLOAD) {
    await videoModel.remove();
    responses.setErrorResponse('File is too big', response, 400);
    return;
  }

  video.originalname = video.originalname.split('.')[0];
  video.filename = `video-${videoModel._id}${path.parse(video.filename).ext}`;


  // Rename the file with the new filename
  const currentPath = video.path;
  const newPath = path.join(path.dirname(currentPath), video.filename);
  fs.renameSync(currentPath, newPath);

  const uploadedVideoModel = Vs.uploadVideo(videoModel._id, video);
  responses.setSuccessfulResponse({ message: 'Sucessfull', video: videoModel._id }, response, 200);
};


export const updateViews= async(request,response)=>{
    console.log
    let video = await Video.findById(request.params.id);

    if (!video){
        responses.setErrorResponse({message:"Video not found"},responses,404);
        return;
    }

    video.views++;

    video.save();
    responses.setSuccessfulResponse({message:"Views updated"},response,200);

}


export const uploadThumbnail = async(req,res,next)=>{
    // console.log(req);
    console.log(req.body.description);
    console.log("aaaaaaaaaaa inside thimbnail fun");
    console.log(req.params.id);

    const video = await Vs.getVideoById(req.params.id);
    if (!video){
        responses.setErrorResponse({message:"No Video found"},res,400);
    }

    if (!req.file){
        responses.setSuccessfulResponse({message:"upload a image"},res,400);
    }
   // console.log(video);
    const img = req.file;
    //console.log(req.file);

    img.filename = `thumbnail-${video._id}${path.parse(img.filename).ext}`;

    const currentPath = img.path;
    const newPath = path.join(path.dirname(currentPath), img.filename);
    fs.renameSync(currentPath, newPath);

    const thumb = await Vs.updateThumbnail(req.params.id,img.filename,req.body.description);

    responses.setSuccessfulResponse({message:"thumbnail upload sucessfully",data:thumb},res,200);



}

export const deleteVideo = (req,res,next)=> {
        const id = req.params.id;
        const video = Vs.deleteVideo(id);
        const deleteHistory = Hs.deleteHistory(id);
        responses.setSuccessfulResponse({message:"Video deleted Successfully",data:video},res,200);
}

