import { useState, useEffect } from 'react';
import API from './api';
import './App.css';

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
    <div className='main'>
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

      <div className="formInputs">
      <form onSubmit={addMember}>
        Name : <input type="text"
              value={name}
              onChange={ (e) => setName(e.target.value)}
              required
        />
        <br /><br />
        
        Age : <input type="number" value= {age} onChange={(e) => setAge(e.target.value)} required/>
        <br /><br />

        Gender : <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option>Male</option>
          <option>Female</option>
        </select>
        <br /><br />

        Membership Type : <select value={membershipType} onChange={(e) => setMembershipType(e.target.value)}>
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="vip">VIP</option>
        </select>
        <br /><br /><br />

        <button type='submit' className='button'>Add Members</button>
      </form>

      </div>
    </div>
  );
}

export default App;