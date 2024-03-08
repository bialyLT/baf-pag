import { useContext } from "react"
import { PublicacionesContext } from "../../context/Publicaciones"
import AdminPanelItem from "../adminPanel/AdminPanelItem"
import AdminPanelSidebar from "../adminPanel/AdminPanelSidebar"

const AdminPanelPage = () => {
  const { publicaciones } = useContext(PublicacionesContext)
  return (
    <div className="mt-16 flex justify-between">
      <AdminPanelSidebar />
      <ul className="flex justify-center items-center flex-col gap-2">
        <AdminPanelItem />
        <AdminPanelItem />
        <AdminPanelItem />
        <AdminPanelItem />
        <AdminPanelItem />
        <AdminPanelItem />
      </ul>
    </div>
  )
}

export default AdminPanelPage

