import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect('process.env.example.MONGODB_URI');
        console.log("connection established! "+ connectionInstance.connection.host);
    }
    catch(error){
        console.log("Connection Failed! E:", error);
        process.exit(1);
    }
}