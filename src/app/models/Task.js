import { model, Schema, models } from "mongoose";

const TaskSchema = new Schema({
    title:{
        type: String,
        required: [true, "El titulo es requerido"],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
},{
    timestamps: true,
})

//verifica si existe el modelo ya en toda la aplicacion de nextjs y si no, lo crea.
export default models.Tarea || model('Tarea', TaskSchema);