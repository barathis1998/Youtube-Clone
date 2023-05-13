
import History from "../models/history.js";
import Video from "../models/videos.js";

export const createHistory =async(videoId,userId)=>{
   const video = await Video.findById(videoId);
if (!video) {
  return;
}

const existingHistory = await History.findOne({ videoId, userId });
if (existingHistory) {
  return existingHistory;
}

const history = await History.create({
  type: 'watch',
  videoId,
  userId
});

return history;

} 

export const deleteHistory = async(videoId)=>{
  const deletedHistory = await History.deleteMany({ videoId });
  return deletedHistory;
}