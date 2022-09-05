import mongoose from 'mongoose';

const CanvasSchema = new mongoose.Schema({
    canvas:{},
    userid:{
        type:String
    }
})

export const CanvasModel=mongoose.model('canvas',CanvasSchema);