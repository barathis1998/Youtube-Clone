import Video from "../models/videos.js";
import Subscription from "../models/subscription.js";

export const createSubscriber = async (channelId, userId) => {
  let subscription = await Subscription.findOne({
    channelId: channelId,
    subscriberId: userId,
  }).exec();

  console.log("subscription " + subscription);

  if (subscription) {
    await Subscription.findByIdAndDelete(subscription._id);
  } else {
    subscription = await Subscription.create({
      subscriberId: userId,
      channelId: channelId,
    });
  }

  return subscription;
};

export const findChannels = async (userId) =>{
    const channels = await Subscription.find({
      subscriberId: userId
    })

    return channels;
}
