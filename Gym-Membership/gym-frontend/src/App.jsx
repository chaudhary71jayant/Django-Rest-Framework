import { useState, useEffect } from 'react';
import API from './api';

function App() {
  const [members, setMembers] = useState([]);

  //from state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [membershipType, setMembershipType] = useState("Basic");

  //Fetching members when components mount
  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await API.get("members/");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members : " , error);
    }
  };

  //Add a new member
  const addMember = async (e) => {
    e.preventDefault();
    try{
      await API.post("members/", {
        name,age,gender,membership_type : membershipType,
      });
      fetchMembers();
      setName("");
      setAge(""),
      setGender("Male");
      setMembershipType("Basic");
    } catch (error){
      console.error("Error adding Member : ",error);
    }
  }

  return(
    <div>
      <h1>Gym members</h1>
      {members.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name} - {member.membership_type}
            </li>
          ))}
        </ul>
      )}

      {/* Add a Member Form */}
      <h2>Add Members</h2>
      <form onSubmit={addMember}>
        <input type="text"
              placeholder='Name'
              value={name}
              onChange={ (e) => setName(e.target.value)}
              required
        />

        <input type="number" placeholder='Age' value= {age} onChange={(e) => setAge(e.target.value)} required/>

        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select value={membershipType} onChange={(e) => setMembershipType(e.target.value)}>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="vip">VIP</option>
        </select>

        <button type='submit'>Add Members</button>
      </form>
    </div>
  );
}

export default App;