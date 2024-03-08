import { useContext } from "react"
import { TokenContext } from "../../context/tokenAdmin";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {

  const navigate = useNavigate()
  const { getAdminUser, error } = useContext(TokenContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    const user = await getAdminUser(data)
    if (!user) {
      navigate('/admin')
    } else {
      navigate('/admin-panel')
    }
  }

  return (
    <section className="max-w-md p-6 mt-32 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Configuración de administrador</h2>
      <form method="POST" onSubmit={(e) => handleSubmit(e)}>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="username">Nombre de usuario</label>
            <input id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
          </div>
          <div>
            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">Contraseña</label>
            <input id="password" type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Iniciar sesion</button>
        </div>
      </form>
      {error ? <p>error</p> : <p></p>}
    </section>
  )
}

export default AdminLoginPage
