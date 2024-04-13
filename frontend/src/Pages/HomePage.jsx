import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../Components/UserCard";


export default function HomePage() {
  const [userList, setUserList] = useState([]);
  const [databaseUsersMap, setDatabaseUsersMap] = useState({});
  const [flag, setFlag] = useState(false);


  // fetching from external API
  const fetchFuncFromExternalAPI = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => {
      console.log(res);
      setUserList(res.data);
    })
    .catch((err) => console.log(err));
  };


  // fetching from internal DB
  const fetchFuncFromInternalDB = () => {
    axios.get(`http://localhost:8080/users`)
    .then((res) => {
      const usersMap = res.data.Users.reduce((map, user) => {
        map[user.id] = user;
        return map;
      }, {});
      setDatabaseUsersMap(usersMap);
    })
    .catch((err) => console.log(err));
  };


  // handle fetching with button
  const handleUsersFetch = (e) => {
    e.preventDefault();
    setFlag(true);
  };


  // fetching from external API and internal DB using useEffect Hook
  useEffect(() => {
    fetchFuncFromInternalDB();
    fetchFuncFromExternalAPI();
  }, []);



  return (
    <div style={{ backgroundColor: "#242424"}} >
      <h2 className="text-center my-4 text-light " >Cointab SE-ASSIGNMENT.</h2>
      <button className="btn btn-primary fs-5" onClick={(e) => handleUsersFetch(e)}>All Users</button>

      <div className="d-flex justify-content-around flex-wrap px-5 mt-5 mb-5 text-white">
        {flag &&
          userList?.map((item) => {
            return <UserCard key={item.id} item={item} addButton={!databaseUsersMap[item.id]} />;
          })}
      </div>
    </div>
  );
}
