import Link from "next/link";

function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="bg-gray-800 p-6 sm:p-8 md:p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold truncate">{task.title}</h3>
        <p className="text-slate-300 text-sm sm:text-base overflow-hidden overflow-ellipsis">{task.description}</p>
        <p className="text-slate-400 my-2 text-xs sm:text-sm md:text-base truncate">
          <span className="mr-1">Creado:</span>
          {task.createdAt}
        </p>
      </div>
    </Link>
  );
}

export default TaskCard;
