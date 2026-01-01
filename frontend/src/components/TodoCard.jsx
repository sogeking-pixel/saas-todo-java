// src/components/TodoCard.js
import React, { useState } from "react";

export default function TodoCard({ task, onToggle, onDelete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 transition-all duration-300 ${
        task.completed ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex items-start justify-between">
        {/* Checkbox y Título */}
        <div className="flex items-start space-x-3 min-w-0">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer flex-shrink-0"
          />
          <span
            className={`font-semibold text-lg flex-grow ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            } truncate`}
            title={task.title}
          >
            {task.title}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
          {task.description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-indigo-600 transition p-1 rounded-full hover:bg-gray-100"
              title={isExpanded ? "Ocultar contenido" : "Ver contenido"}
            >
              {isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600 transition p-1 rounded-full hover:bg-gray-100"
            title="Eliminar tarea"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && task.description && (
        <div className="mt-4 pl-8 text-gray-600 border-l-2 border-gray-200 ml-2.5 whitespace-pre-wrap break-words">
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
}