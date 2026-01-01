// src/components/Todo.js
import React, { useState } from "react";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import Modal from "../components/Modal";
import ButtonFlotant from "../components/ButtonFlotant";
import { useAuth } from "../hooks/useAuth";
import {
  useTasks,
  useCreateTask,
  useDeleteTask,
  useUpdateTask,
} from "../hooks/useTask"; // Ajusta la ruta si tu hook está en otro archivo

export default function Todo() {
  const { user, logout } = useAuth();

  // Hooks de datos
  const { tasks = [], loading: loadingTasks, error, refresh } = useTasks();
  const { create, loading: creating } = useCreateTask();
  const { remove, loading: deleting } = useDeleteTask();
  const { update, loading: updating } = useUpdateTask();

  // UI state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Crear tarea
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (newTitle.trim() === "") return;

    const payload = {
      title: newTitle.trim(),
      description: newDescription.trim(),
      completed: false,
      user: user.id,
    };

    try {
      await create(payload);
      // refrescar lista desde el server
      await refresh();
      // limpiar formulario y cerrar modal
      setNewTitle("");
      setNewDescription("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error creando tarea:", err);
      // opcional: mostrar notificación de error
    }
  };

  // Alternar completado
  const toggleTask = async (id) => {
    const key = id;
    const task = tasks.find((t) => t.id === key || t.pk === key);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };
    try {
      await update(key, updated);
      await refresh();
    } catch (err) {
      console.error("Error al actualizar tarea:", err);
    }
  };

  // Eliminar
  const deleteTask = async (id) => {
    const key = id;
    try {
      await remove(key);
      await refresh();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  return (
    <>
      <Header user={user} onLogout={logout}/>
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Mis Tareas
            </h1>

            {/* Estado carga / error */}
            {loadingTasks ? (
              <div className="text-center text-gray-500 p-8">Cargando…</div>
            ) : error ? (
              <div className="text-center text-red-500 p-8">
                Error al cargar tareas.
              </div>
            ) : tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task) => {
                  const key = task.id ?? task.pk;
                  return (
                    <TodoCard
                      key={key}
                      task={task}
                      onToggle={() => toggleTask(key)}
                      onDelete={() => deleteTask(key)}
                      // puedes pasar estados de loading si quieres desactivar botones dentro del card
                      deleting={deleting}
                      updating={updating}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center text-gray-500 bg-white p-8 rounded-lg shadow-md">
                <p className="text-lg">
                  ¡Felicidades! No tienes tareas pendientes. 🎉
                </p>
                <p className="mt-2">
                  Haz clic en el botón '+' para añadir tu primera tarea.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Botón flotante */}
      <ButtonFlotant onClick={() => setIsModalOpen(true)} />

      {/* Modal con formulario */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleAddTask} className="space-y-4">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="¿Qué necesitas hacer?"
              autoFocus
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Añade una descripción (opcional)..."
              rows="3"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              disabled={creating}
            >
              {creating ? "Guardando..." : "Guardar Tarea"}
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
