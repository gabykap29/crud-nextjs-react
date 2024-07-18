import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/mongoose";
import Task from "@/app/models/Task";
// para un metodo get con la palabra reservada GET
export async function GET (){
    connectDB();

    const tareas =  await Task.find()
    console.log(tareas);
    return NextResponse.json(tareas);
}

export async function POST(req){
    connectDB();
    const data = await req.json();
    const newTask = new Task(data)
    const saveTask = await newTask.save()

    if(saveTask){
        return NextResponse.json({
            message: "Tarea creada con exito!"
        },{
            status:201
        });
    }else{
        return NextResponse.json({
            message: "Error al crear la tarea"
        },{
            status: 400
        })
    }
}