import { Schema, model, models } from 'mongoose'


const PollSchema = new Schema({
    title: { type: String, required: true },
    createdBy: { type: String },
    answers: { type: Map, of: Number }
})


export const Poll = models.Poll || model('Poll', PollSchema)
