import './App.css';
import {useState} from 'react';
import Axios from 'axios';


function App() {
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [country, setCountry] = useState("");
const [position, setPosition] = useState("");
const [wage, setWage] = useState(0);

const [newWage, setNewWage] = useState(0);

const [employeeList, setEmployeeList] = useState([]);

const addEmployee = () => {
  console.log(name);
  Axios.post('http://localhost:3002/create', {
    name: name, 
    age: age, 
    country: country, 
    position: position, 
    wage: wage
  }).then(() => {
    setEmployeeList([
      ...employeeList, 
      {
        name: name, 
        age: age, 
        country: country, 
        position: position, 
        wage: wage
      },
    ]);
  });
};

const getEmployees = () => {
  Axios.get("http://localhost:3002/employees").then((response) => {
    setEmployeeList(response.data);
 }); 
}

const updateEmployeeWage = (id) => {
  Axios.put("http://localhost:3002/update", {wage: newWage, id: id}).then(
    (response) => {
      setEmployeeList(employeeList.map((val) => {
        return val.id === id 
        ? {
            id: val.id, name: val.name, 
            country: val.country, 
            age: val.age, 
            position: val.position, 
            wage: newWage
          }
          : val;
        })
      );
    }
  );
};

const deleteEmployee = (id) => {
  // console.log(["holi2", id]);
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) => {
      // console.log("holi3", response);
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <div className='header'>
          <h1>Employee Manager</h1>
          <p>Your system for manage employees</p>
        </div>
        <article className='form'>
        <label>Name: </label>
        <input 
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input 
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input 
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input 
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />    
        <label>Wage(year): </label>
        <input 
          type="text"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add employee</button>
        </article>
      </div>

      <hr></hr>

      <div className='employees'>
        <button onClick={getEmployees}className='show-employees'>Show Employees</button>
        
        {employeeList.map((val, key) => {
          return (
            <div className='employee'>
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>              
              <div className='changes'>
                {""}
                <input 
                  type="text" 
                  placeholder="New wage" 
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                  <button onClick={() => {  
                    updateEmployeeWage(val.id);
                    }}
                  > 
                  {" "}
                   Update
                  </button>
                  <button onClick={() => {(deleteEmployee(val.id))}}>Delete</button>
              </div>
            </div>
          );
          
        })}
      </div>
    </div>
  );
}

export default App;
