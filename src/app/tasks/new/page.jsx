"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Alert from "@/components/Alert";

function FormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  
  const router = useRouter();
  const params = useParams()
  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };
  const handleDelete = async () => {
    if(window.confirm("Estas seguro de querer eliminar una tarea?...")){
        const res = await fetch(`/api/task/${params.id}`,{
            method: 'DELETE',
        })
        const data = await res.json()
        console.log(data);
        if(res.status === 200){
            setAlertType("success");
            setAlertMessage("Tarea eliminada!");
            setShowAlert(true);
            setTimeout(() => {
            router.push("/");
            }, 2000); // Redirect after 2 seconds
        }else{
            setAlertType("error");
            setAlertMessage("ocurrió un error al eliminar la tarea!");
            setShowAlert(true);
        }
    }else{
        setAlertType("error");
        setAlertMessage("cancelado!");
        setShowAlert(true);
    }
  }

  const createTask = async () => {
    try {
        const res = await fetch("/api/task", {
          method: "POST",
          body: JSON.stringify(newTask),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.status === 201) {
          setAlertType("success");
          setAlertMessage("Task created successfully!");
          setShowAlert(true);
          setTimeout(() => {
            router.push("/");
          }, 2000); // Redirect after 2 seconds
        } else {
          setAlertType("error");
          setAlertMessage("Failed to create task!");
          setShowAlert(true);
        }
      } catch (error) {
        setAlertType("error");
        setAlertMessage("An error occurred!");
        setShowAlert(true);
      }
  }
  const getTask = async () => {
    const res = await fetch('/api/task/'+ params.id)
    const data = await res.json();
    setNewTask({
        title: data.title,
        description: data.description
    });
  }
  const updateTASK = async () => {
    try {
        const res = await fetch('/api/task/' + params.id, {
            method:'PUT',
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type" : "application/json"
            }
        });
        const data = await res.json();
        if(res.status === 200){
            setAlertType("success");
            setAlertMessage(data.message);
            setShowAlert(true);
            setTimeout(() => {
            router.push("/");
          }, 2000); // Redirect after 2 seconds
        }else{
            setAlertType("error");
            setAlertMessage("A ocurrido un error!, " + data.message);
            setShowAlert(true);
        }
        
    } catch (error) {
        setAlertType("error");
        setAlertMessage("A ocurrido un error!");
        setShowAlert(true);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!params.id){
        await createTask()
    }else{
        await updateTASK();
    }
   
  };
  useEffect(()=>{
    if(params.id){
        getTask()
    }
  },[])
  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between my-4">
        <h1 className="font-bold text-3xl">
            { !params.id ? "Crear Tarea" : "Editar Tarea" }
        </h1>
        <button
        type="button"
            className="bg-red-500 px-3 rounded-md"
            onClick={handleDelete}
        >
            Delete
        </button>
        </header>
        {showAlert && (
          <Alert type={alertType} message={alertMessage} onClose={handleClose} />
        )}
        <input
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          type="text"
          name="title"
          placeholder="titulo"
          onChange={handleChange}
          value={newTask.title}
        />
        <textarea
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          name="description"
          placeholder="una descripción"
          onChange={handleChange}
          value={newTask.description}
        ></textarea>
        <button 
        type="submit"
        className= {!params.id ? "bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg" : "bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg"}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default FormPage;
