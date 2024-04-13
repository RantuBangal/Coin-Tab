import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PostCard from '../Components/PostCard';


export default function PostsPage() {
  const [ posts, setPosts ] = useState([]);
  const [ currentUser, setCurrentUser ] = useState({});
  const [ bulkButtonstatus, setBulkButtonstatus ] = useState(true);
  const { id } = useParams();


  // posting all posts to internal db
  const handleAddToInternalDB = (e) => {
    setBulkButtonstatus(false);
    e.preventDefault();
    for(let i=0; i<posts.length; i++) {
      axios.post(`http://localhost:8080/posts/add`, posts[i])
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }
  }


  // fetching posts from external API
  const fetchPostsFunc = () => {
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then(res => {
      // console.log(res);
      setPosts(res.data) ;
    })
    .catch(err => console.log(err))
  };


  // fetching user from internal db
  const fetchUserFunc = () => {
    axios.get(`http://localhost:8080/users/${id}`)
      .then(res => {
        // console.log(res);
        setCurrentUser(res.data.User[0]) ;
      })
      .catch(err => console.log(err))
  };


  // fetching posts of user from internal db
  const fetchPostsOfUser = () => {
    axios.get(`http://localhost:8080/posts/${id}`)
    .then(res => {
      console.log(res);
      if(res.data.Posts.length === 0) {
        setBulkButtonstatus(true);
      } else {
        setBulkButtonstatus(false);
      }
    })
    .catch(err => console.log(err))
  };


  // handle fetching with button
  const handleDownloadExelFile = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/excel/${id}`, { responseType: 'blob' }) // Set responseType to 'blob'
    .then(res => {
      const url = window.URL.createObjectURL(new Blob([res.data])); // Create blob from response data
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Posts.xlsx'); // Set filename for the downloaded file
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => console.log(err))
  }


  // fetching from external API and internal DB using useEffect Hook
  useEffect(() => {
    fetchPostsFunc();
    fetchUserFunc();
    fetchPostsOfUser();
  }, []);





  return (
    <>
    <h2 style={{color:"white", margin: "20px"}} >Name: <span className="text-primary fs-1 fw-bold">{currentUser?.name}</span></h2>
    <h2 style={{color:"white", margin: "20px"}} >Company: <span className="text-primary fs-1 fw-bold">{currentUser?.company}</span></h2>
    
    {
      bulkButtonstatus && <button className="btn btn-primary fs-5" onClick={(e)=> handleAddToInternalDB(e)}>Bulk Add</button>
    }
    {
      !bulkButtonstatus && <button className="btn btn-info fs-5" onClick={(e)=> handleDownloadExelFile(e)}>Download in Excel Format</button>
    }
    <div className="d-flex justify-content-around flex-wrap gap-3 px-5 mt-5 mb-5 text-white">
      {
        posts?.map((item)=>{
          return <PostCard key={item.id} item={item} currentUser={currentUser} />
        })
      }
    </div>
    </>
  )
}
