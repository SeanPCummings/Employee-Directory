import React, { useContext } from 'react'
import { EmployeeContext } from './App'

export default function Employee(props) { 
    const { handleEmployeeDelete, handleEmployeeSelect } = useContext(EmployeeContext);
    const {
        id,
        name, 
        role
    } = props;
    return (
        <div className="">
            <div className="">
                <h3 className="">{name}</h3>
                <div>
                    <button className="" onClick={()=> handleEmployeeSelect(id)}>Edit</button>
                    <button className="" onClick={()=> handleEmployeeDelete(id)}>Delete</button>
                </div>
            </div>
            <div className="">
                <span className="">Role:</span>
                <span className="">{role}</span>
            </div>
        </div>
    )
}