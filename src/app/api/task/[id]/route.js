import { NextResponse } from "next/server";
import Task from "@/app/models/Task";
import { connectDB } from "@/app/utils/mongoose";
export async function GET(_req, {params}){
    try {
        const id = params.id
        const findTask = await Task.findOne({
            _id: id
        })
        return NextResponse.json(findTask);
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error interno del servidor"
        });
    }
}

export async function PUT(req, {params}){
    const id = params.id;
    const task = await Task.findOne({_id:id})
    if(!task){
        return NextResponse.json({
            message: "No se ha encontrado la tarea"
        });
    }
    const data = await req.json();
    const taskEdit = await Task.updateOne(
        {_id: id}, { $set: {
        title: data.title,
        description: data.description
    }});

    if (!taskEdit){
        return NextResponse.json({
            message: "Error al editar la tarea",
            status: 400
        })
    }
    return NextResponse.json({
        message:"Tarea Editada!"
    })
}

export async function DELETE(_req, {params}){
    connectDB();
    try {
        const id = params.id;
        const task = await Task.deleteOne({
            _id: id
        });
        if(!task){
            return NextResponse.json({
                message: "Task no encontrada!"
            },{
                status:404
            })
        }
        return NextResponse.json({
            message: "Tarea Eliminada"
        },{
            status: 200
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Error interno del servidor"
        },{
            status: 500
        })
    }
    
}