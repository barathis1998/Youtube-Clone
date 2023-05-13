import Video from '../models/videos.js';
import Subscription from '../models/subscription.js';
import * as ss from '../services/subscription-service.js';
import responses from '../utils/responses.js';
import advancedResultsFunc from '../utils/advancedResultsFunc.js'

export const getSubscriber = async(req,res,next)=>{
    responses.setSuccessfulResponse({message:"Fetched Subscribers",data:res.advancedResults},res,200);
}

export const createSubscription = async(req,res,next)=>{
    const {channelId} = req.body;
    let subscription = await ss.createSubscriber(channelId,req.user._id);
    responses.setSuccessfulResponse({message:"Successful",data:subscription},res,200);

}

export const getSubscribedVideos = async (req,res,nexy)=>{
    const channels = await ss.findChannels(req.user._id);

    if(channels.length === 0 ){
        responses.setSuccessfulResponse({message:"no channel"},res,200);
        return;
    }

    const channelsId = channels.map((channel)=>{
        return {
            userId:channel.channelId.toString()
        }
    })

    const populates = [{path:'userId', select :'firstName lastName'}]
    advancedResultsFunc(req,res,Video,populates,'draft', channelsId);

}