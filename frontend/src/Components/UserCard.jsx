import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './UserCard.css';

export default function UserCard({ item, addButton }) {
  const navigate = useNavigate();
  const [ Button, setButton ] = useState(addButton);

  const handleNavigate = () => {
    navigate(`/posts/${item.id}`);
  };


  const handleAddUserToDB = (item) => {
    setButton(false);

    let userObj = {
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      website: item.website,
      company: item.company.name,
      city: item.address.city
    };

    axios.post(`http://localhost:8080/users/add`, userObj)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    
  };



  return (
    <div id="userCard" className="border border-primary p-3 mb-4 rounded text-start px-5 ">
      <p><span className="text-primary fw-bold">Name:</span>  <b>{item.name}</b></p>
      <p><span className="text-primary fw-bold">Email: </span> {item.email}</p>
      <p><span className="text-primary fw-bold">Phone: </span> {item.phone}</p>
      <p><span className="text-primary fw-bold">Website: </span> {item.website}</p>
      <p><span className="text-primary fw-bold">City: </span> {item.address.city}</p>
      <p><span className="text-primary fw-bold">Company: </span> {item.company.name}</p>
      
      { Button && <button style={{width: "40%"}} className="btn btn-primary" onClick={() => handleAddUserToDB(item)}>Add</button>}
      { !Button && <button style={{width: "40%"}} className="btn btn-info" onClick={() => handleNavigate()}>Open</button>}
    </div>
  );
}
