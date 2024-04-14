### DEMO Video <https://drive.google.com/file/d/1NLjFIG-7k7GGgNd8UMQxqh4uNNRbdwGQ/view?usp=sharing>

### Frontend Deployed Link <https://coin-tab-five.vercel.app/>

### Backend Deployed Link <https://coin-tab.onrender.com>

# Coin-Tab Assignment

This assignment focuses on fetching users and related posts details from external API, adding them to internal DB and downloading data in excel format.

## Getting Started

To get started with the API, follow the instructions below.

### Prerequisites

- Node.js installed on your machine
- mysql2 installed and running locally or remotely
- npm package manager

### Installation

1. Clone the repository: git clone <https://github.com/RantuBangal/Coin-Tab.git>
2. Install dependencies: npm install
3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Define the following variables:
    - `host`: host from aiven
    - `user`: username from aiven
    - `password`: password from aiven
    - `database`: Database name
    - `port`: port from aiven
4. Start the server: npm run server


## API Documentation

### User Routes

- **GET https://coin-tab.onrender.com/users**
  - Description: Get users from external API.
  
  - Response:
    - `200 OK`: Users List.
    - `400 Bad Request`: Error getting user.
    - `500 Internal Server Error`: Internal Server Error.

- **GET https://coin-tab.onrender.com/users/:id**
  - Description: Get user by id.
  - Request Parameters: "userId": "string".
  
  - Response:
    - `200 OK`: User details.
    - `400 Bad Request`: Error getting user by id.
    - `500 Internal Server Error`: Internal Server Error.

- **AddUser  POST https://coin-tab.onrender.com/users/add**
  - Description: Add user to the internal DB.
 
  - Response:
    - `200 OK`: Added User.
    - `400 Bad Request`: Error adding user.
    - `500 Internal Server Error`: Internal Server Error.

### Post Routes

- **GetPostByUserID GET https://coin-tab.onrender.com/users/:userId**
  - Description: Retrieve posts by userid of a single user.
  - Request Parameters: "userId": "string".

  - Response:
    - `200 OK`: All Posts.
    - `400 Bad Request`: Error getting posts for user.
    - `500 Internal Server Error`: Internal Server Error.

- **AddNewPosts POST https://coin-tab.onrender.com/posts/add**
  - Description: Add posts of the user to internal DB.
  
  - Response:
    - `200 OK`: Added all Posts.
    - `400 Bad Request`: Error while adding new post.
    - `500 Internal Server Error`: Internal Server Error.


## Author

- [Rantu Bangal](https://github.com/RantuBangal)
  - Email: rantubangal996@gmail.com
