import express from 'express';
import {createHistory,getHistories} from './../controllers/history-controller.js'
import { protect } from '../../middleware/auth.js';
import History from '../models/history.js';
import advancedResults from '../../middleware/advancedResults.js';

const router  = express.Router();

router.route('/')
    .post(protect,createHistory)
    .get(advancedResults(History,[{path:'videoId'},{path:'userId'}]),getHistories);


export default router;