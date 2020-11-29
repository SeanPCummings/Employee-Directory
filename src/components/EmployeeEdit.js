import React, { useContext } from 'react'
import { EmployeeContext } from './App'

export default function EmployeeEdit({ employee }) {
    const { handleEmployeeChange, handleEmployeeSelect } = useContext(EmployeeContext);

    //creates a brand new object that saves the changes user makes to employee
    function handleChange(changes) {
        handleEmployeeChange(employee.id, { ...employee, ...changes })
    }

    return (
        <div className="employee-edit">
            <div className="employee-edit__remove-button-container">
                <button className="btn employee-edit__remove-button" onClick={()=> handleEmployeeSelect(undefined)}>&times;</button>
            </div>
            <div className="employee-edit__grid">
                <label htmlFor="name" className="employee-edit__label">Name</label>
                <input type="text" name="name" id="name" className="employee-edit__input" value={employee.name} onInput={e => handleChange({ name: e.target.value })} />
                <label htmlFor="role" className="employee-edit__label">Role</label>
                <input type="text" name="role" id="role" className="employee-edit__input" value={employee.role} onInput={e => handleChange({ role: e.target.value })} />
            </div>
        </div>
    )
}