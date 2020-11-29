import React, { useContext } from 'react'
import Employee from './Employee'
import { EmployeeContext } from './App'

export default function EmployeeList({ employees }) {
    const { handleEmployeeAdd } = useContext(EmployeeContext);
    const { handleEmployeeSearch } = useContext(EmployeeContext);
    
    return (
        <div className="">
            <h1>Employee Directory</h1>
            <input type="text" name="search" id="search" className="" placeholder="search" value={employees.name} onChange={e =>handleEmployeeSearch(e.target.value)}/>
            <div>
                {employees.map(data => {
                    return (
                        <Employee key={data.id} {...data}/>
                    )
                })}
            </div>
            <div className="">
                <button className="" onClick={handleEmployeeAdd}>
                    Add Employee
                </button>
            </div>
        </div>
    )
}