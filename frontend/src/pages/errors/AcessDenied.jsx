function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col px-6 background:gray-100 items-center justify-center">
      <div className="flex flex-col text-center sm:mt-8">
        <h1 className="text-9xl font-bold mb-10">DENEGADO</h1>
        <h1 className="text-3xl font-semibold mb-4">Pagina No Autorizada</h1>
        <p className="text-gray-700 mb-6 text-green text-2xl">
          Lo sentimos, no tiene autorizacion para ver esta página.
        </p>
      </div>
    </div>
  );
}
export default AccessDenied;
