
function NotFound() {
  return (
    <div className="min-h-screen flex flex-col px-6 background:gray-100 items-center justify-center">
      <div className="flex flex-col text-center sm:mt-8">
        <h1 className="text-9xl font-bold mb-10">ERROR 404</h1>
        <h1 className="text-3xl font-semibold mb-4">
          Página No Encontrada
        </h1>
        <p className="text-gray-700 mb-6 text-green text-2xl">
          Lo sentimos, la página que buscas no existe o ha sido movida :(
        </p>
      </div>
    </div>
  );
}
export default NotFound;
