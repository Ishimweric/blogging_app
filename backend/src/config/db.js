import moongoose from "mongoose";

export const connectDB=async()=>{
    try{
        await moongoose.connect(process.env.MONGO_URI);

        console.log("Database Connected Successfuly!");
        
    }   
    catch(error){

        console.error("Error Connecting To Database", error);

        process.exit(1);
        }
}