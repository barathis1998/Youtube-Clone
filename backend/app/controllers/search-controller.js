import User from "../models/user.js";
import Video from "../models/videos.js";
import * as ss from "../services/search-service.js";
import responses from '../utils/responses.js'


export const search = async (request, response, next) => {
    try {
      const text = request.body.text;
      console.log(request.body);
      const page = parseInt(request.query.page, 10) || 1
      const limit = parseInt(request.query.limit, 10) || 12
      const obj = await ss.search(text, page, limit);
  
      responses.setSuccessfulResponse({ message: "fetched successfully", data: obj }, response, 200);
    } catch (err) {
      console.error(err);
      responses.setErrorResponse({ message: "Something went wrong  in search" }, response, 500);
    }
  }
  