import User from "../models/user.js";
import Video from "../models/videos.js";

export const search = async (text,page,limit) => {
    let channels = await User.find({ $text: { $search: text } }).populate({
        path: 'videos',
      });
      let videos = await Video.find({ $text: { $search: text } }).populate({
        path: 'userId',
      });
      
      // Concatenate the channels and videos into a single array
      let search = [...channels, ...videos];
      
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = search.length;
      const totalPage = Math.ceil(total / limit);
      
   
      

//   if (parseInt(limit) !== 0) {
//     search = search.slice(startIndex, endIndex)
//   }

//   const pagination = {}

//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit
//     }
//   }

//   if (startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit
//     }
//   }
     return search;

}

