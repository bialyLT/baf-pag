import { useOutletContext } from 'react-router-dom'
import Header from '../header/Header'
import Publicaciones from './publicaciones/Publicaciones'

const Home = () => {
  const { propiedades } = useOutletContext()

  return (
    <div>
      <Header />
      <Publicaciones propiedades={propiedades} />
    </div>
  )
}

export default Home
