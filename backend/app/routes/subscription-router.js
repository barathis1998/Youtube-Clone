import express from 'express';
import * as subscriptionController from './../controllers/subscription-controller.js';
import { protect } from '../../middleware/auth.js';
import advancedResults from '../../middleware/advancedResults.js';
import Subscription from '../models/subscription.js';

const router = express.Router();

router.route('/')
    .post(protect, subscriptionController.createSubscription);
router.route('/subscribers')
    .get(protect,advancedResults(Subscription,[{path:'subscriberId'}]),subscriptionController.getSubscriber)

router.route('/videos')
    .get(protect,subscriptionController.getSubscribedVideos)

export default router;