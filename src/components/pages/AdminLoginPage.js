import { useFetcher, useNavigate } from 'react-router-dom'

const AdminLoginPage = () => {
  const navigate = useNavigate()
  const fetcher = useFetcher()

  return (
    <>
      <div role="alert" className="alert alert-warning mt-32 max-w-md mx-auto shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <span>Advertencia: el inicio de sesión esta disponible únicamente para administradores</span>
      </div>
      <section className="max-w-md p-6 mt-5 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Configuración de administrador</h2>
        <div>
          {isAuthenticated ? (
            <h1>Ya has iniciado sesión{navigate('/admin-panel')}</h1>
          ) : (

            <form>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label className="text-gray-700 dark:text-gray-200" for="username">Nombre de Usuario</label>
                  <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200" for="emailAddress">Contraseña</label>
                  <input id="emailAddress" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" type='submit'>Iniciar sesión</button>
              </div>
            </form>
          )}
        </div>
        {error && <div>error: {error} </div>}
      </section>
    </>
  )
}

export default AdminLoginPage
