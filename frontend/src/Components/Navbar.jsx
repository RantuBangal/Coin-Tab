
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
        <div className='d-flex justify-content-around vw-100 p-3 bg-info'>
            <Link to="/" className='text-white text-decoration-none fs-2'>Home Page</Link>
            <h3 className='text-white fs-2'>Submitted by <span className='text-primary' >Rantu Bangal</span></h3>
        </div>
    </div>
  )
}
