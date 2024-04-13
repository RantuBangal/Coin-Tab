
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Pages/HomePage'
import Navbar from '../Components/Navbar'
import PostsPage from '../Pages/PostsPage'

export default function AllRoutes() {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path={"/"} element={<HomePage/>} />
            <Route path={"/posts/:id"} element={<PostsPage/>} />
        </Routes>
    </div>
  )
}
