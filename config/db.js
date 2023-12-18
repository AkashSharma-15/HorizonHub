import mongoose from "mongoose";
import colors from 'colors'

const connectDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Mern-Ecommerce').then(() => {
            console.log("mongodb Successfully connected".bgMagenta.white)
        })

    } catch (error) {
        console.log(`${error}`.bgRed.white)
    }
}
export default connectDB