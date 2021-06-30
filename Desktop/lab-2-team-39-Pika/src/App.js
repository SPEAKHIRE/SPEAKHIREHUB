import Header from "./component/header"
import './App.css';
import React from "react"

import axios from 'axios'

function App() {
  const [users,setUsers] = React.useState([])
  async function getuserList() {
    const response = await axios ({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "GET"
  })
  setUsers(response.data)
  }
  getuserList()

  // const user = users.forEach(user => {
  //   if(user.name === "Leanne Graham")
  //     console.log(user.name)
  //     return user.name    
  // });

  function del(id){
    // let remove = setUsers.users.slice()  
    // users.splice(users.indexOf(user), 1)
    // this.setState({remove})
    
    let update = [...users].filter((person) => person.id !== id)
    setUsers(update)

    //setUsers(users.filter(user => user.key !== id))
    // console.log(id)
    // const newList = users.filter((item) => item.id !== id)
    // setUsers(newList)

  }

  return (
    <div>
    <ul>
      {users.map(data => (
        <li key={data.id}> 
        <p >{data.name}</p>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.address.city}</p>
        <button type="button" onClick={() => del(data.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
    
    </div>
  );
}



export default App;