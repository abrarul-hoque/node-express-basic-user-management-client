import { useEffect, useRef, useState } from "react"

function App() {
  const [users, setUsers] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then((data => setUsers(data)))

  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user)
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      })
  }

  return (
    <>
      <h1>Users Management System</h1>
      <h1>Total Users: {users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
