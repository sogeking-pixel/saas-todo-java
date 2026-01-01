export default function ButtonFlotant({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="fixed bottom-8 right-8 bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        title="Añadir nueva tarea"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    );
}