
const AdminPanelItem = ({ title }) => {
  return (
    <div className="flex w-full max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="w-1/3 bg-cover m-5 rounded-md" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80)` }}></div>

      <div className="w-2/3 p-4 md:p-4">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}titulo</h1>

        <h1 class="text-lg font-bold text-gray-700 dark:text-gray-200 md:text-xl">$220</h1>


        <div className="flex justify-between mt-3 gap-2 item-center">
          <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-blue-800 rounded dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:bg-blue-700 dark:focus:bg-blue-600">Marcar como Vendido</button>
          <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-yellow-800 rounded dark:bg-yellow-700 hover:bg-yellow-700 dark:hover:bg-yellow-600 focus:outline-none focus:bg-yellow-700 dark:focus:bg-yellow-600">Edit</button>
          <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-red-800 rounded dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 focus:outline-none focus:bg-gray-700 dark:focus:bg-red-600">Delete</button>
        </div>
      </div>
    </div >
  );
}

export default AdminPanelItem;
