import mongoose, { connection } from "mongoose";

const conn = {
    isConnected: false
};

export const connectDB = async () => {
    //si la base de datos ya esta conectada, se saltea.
    if(conn.isConnected) return;
    const db = await mongoose.connect('mongodb://127.0.0.7:27017/nextjs')
    console.log(db.connection.db.databaseName);
    conn.isConnected = true;
};



connection.on('connected', () => { 
    console.log("Mongoose connected");
});

connection.on('error', (error) => { 
    console.log("Mongoose connection error: ", error);
});
