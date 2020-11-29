import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList';
import EmployeeEdit from './EmployeeEdit';
import '../css/App.css';
import { v4 as uuidv4 } from 'uuid';

export const EmployeeContext = React.createContext()
const LOCAL_STORAGE_KEY = 'employeeDirectory.employees'


function App() {
  //set states
  const [selectedEmployeeId, setSelectedEmployeeId] = useState();
  const [employees, setEmployee] = useState(sampleEmployees);
  const [search, setSearch] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState();

  //Context
  const employeeContextValue = {
    handleEmployeeAdd,
    handleEmployeeDelete, 
    handleEmployeeSelect,
    handleEmployeeChange,
    handleEmployeeSearch
  }

  // sets filtered name to displayed list
  let activeList = employees;
  if(search !== ''){activeList = filteredEmployees;}

  // employee selected for edit
  const selectedEmployee = employees.find(employee => employee.id === selectedEmployeeId);

  // filter employees by name
  useEffect(()=> {
    setFilteredEmployees(
      employees.filter(employee => {
        if(search === ''){return true;}
        return employee.name.toLowerCase().startsWith(search.toLowerCase());
      })
    )
  }, [search, employees])

  // load from local storage
  useEffect(()=>{
    const employeeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (employeeJSON != null) setEmployee(JSON.parse(employeeJSON))
  }, [])

  // save to local storage
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees))
  }, [employees])

  // handle employee search
  function handleEmployeeSearch(name) {
    setSearch(name)
  }

  // handle selected employee
  function handleEmployeeSelect(id) {
    setSelectedEmployeeId(id)
  }

  // handle adding employee
  function handleEmployeeAdd(){
    const newEmployee = {
      id: uuidv4(),
      name: 'New',
      role: 1
    }
    setSelectedEmployeeId(newEmployee.id)
    setEmployee([...employees, newEmployee])
  }

  // handle employee edit
  function handleEmployeeChange(id, employee){
    const newEmployee = [...employees];
    const index = newEmployee.findIndex(r => r.id ===id);
    newEmployee[index] = employee;
    setEmployee(newEmployee)
  }

  // handle employee delete
  function handleEmployeeDelete(id){
    setEmployee(employees.filter(employee => employee.id !== id))
  }
  
  return (
    <EmployeeContext.Provider value={employeeContextValue}>
      <EmployeeList employees={activeList} />
      {selectedEmployee && <EmployeeEdit employee={selectedEmployee} />}
    </EmployeeContext.Provider>
  )
}

// sample data
const sampleEmployees = [
  {
    id: 1,
    name: 'Whos On Second',
    role: 'Engineer'
  },
  {
    id: 2,
    name: 'Jim Morrison',
    role: 'Programmer'
  },
  {
    id: 3,
    name: 'Stephen King',
    role: 'Accountant'
  },
  {
    id: 4,
    name: 'THE GarbageMan',
    role: 'Manager'
  },
  {
    id: 5,
    name: 'John Lennon',
    role: 'Designer'
  },
  {
    id: 6,
    name: 'Mario Luigi',
    role: 'IT'
  },

]

export default App;