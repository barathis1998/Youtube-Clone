import mongoose from 'mongoose';

const { Schema } = mongoose;

const feelingSchema = new Schema({
  type: {
    type: String,
    enum: ['like', 'dislike'],
    required: [true, 'Type is required'],
  },
  videoId: {
    type: Schema.Types.ObjectId,
    ref: 'Video',
    required: [true, 'VideoId is required'],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'UserId is required'],
  },
}, { timestamps: true });

const Feeling = mongoose.model('Feeling', feelingSchema);

export default Feeling;
