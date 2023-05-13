import { response } from "express";
import * as hs  from "../services/history-service.js"
import responses from "../utils/responses.js";
import advancedResults from "../../middleware/advancedResults.js";


export const getHistories = async(req,res,next)=>{
  responses.setSuccessfulResponse({message:"fetched all histories",data:res.advancedResults},res,200);
}

export const createHistory = async (req, res, next) => {
    if (req.body.type == 'watch') {
    //   const video = await Video.findById(req.body.videoId)
      const createdHistory = hs.createHistory(req.body.videoId,req.user._id);

      if (!createHistory){
        responses.setErrorResponse({message:"No Video found"},res,400);
        return;
      }
      responses.setSuccessfulResponse({message:"successfull",data:createdHistory},res,200);
    }
    else{
      responses.setErrorResponse({message:"not a watch "},res,400);
    }
      
  }
