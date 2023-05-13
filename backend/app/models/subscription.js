import mongoose from 'mongoose';

const { Schema } = mongoose;

const SubscriptionSchema = new Schema(
{
subscriberId: {
type: Schema.Types.ObjectId,
ref: 'User',
// required: [true, 'Subscriber id is required']
},
channelId: {
type: Schema.Types.ObjectId,
ref: 'User',
// required: true
}
},
{ timestamps: true }
);

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

export default Subscription;