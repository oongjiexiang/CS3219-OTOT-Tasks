import { useState } from "react";

const AddStudent = () => {
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [spec, setSpec] = useState("Software Engineering")
  const [age, setAge] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isNaN(Number(age))) alert('Age must be an integer')
    else console.log("received value")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="text" required value={name} onChange={(e) => setName(e.target.value)}></input>
      <label>Username</label>
      <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}></input>
      <label>Age</label>
      <input type="text" required value={age} onChange={(e) => setAge(e.target.value)}></input>
      <label>Intended Specialisation</label>
      <select required value={spec} onChange={(e) => setSpec(e.target.value)}>
        <option>Software Engineering</option>
        <option>Data Science</option>
        <option>Artificial Intelligence</option>
      </select>
      <button type="submit">Create Student</button>
    </form>
  );
}
 
export default AddStudent;