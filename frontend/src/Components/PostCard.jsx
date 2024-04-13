import './PostCard.css'

export default function PostCard({ item , currentUser }) {

  
  return (
    <div id="postCard" className="border border-primary p-3 mb-3 rounded text-start px-5 ">
      <p><span className="text-primary fw-bold" >Name:</span> {currentUser.name}</p>
      <p><span className="text-primary fw-bold" >Title:</span> {item.title}</p>
      <p><span className="text-primary fw-bold" >Body:</span> {item.body}</p>
      <p><span className="text-primary fw-bold" >Company:</span> {currentUser.company}</p>
    </div>
  );
}
