import Wrapper from './Wrapper'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FetchUsers } from '../services';
import { DeleteUser } from '../services/axios-fetch-service';

// user list page, renders all of users to the table
export default function Users() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([])

    // load users
    useEffect(() => {
        const loadUsers = async () => {
            const res = await FetchUsers()
            if (res.status === 200) {
                setUsers(res.data)
            } else alert('Something went wrong!')
        }
        loadUsers()
    }, [])

    // delete selected user
    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const res = await DeleteUser(id)
            if (res.status === 200) {
                alert('User deleted!')
            } else {
                alert('Something went wrong!')
            }
            setUsers(users.filter((c) => c.id !== id));
        }
    }
    
    // filter users on the table
    useEffect(() => {
        setFilteredUsers(
            users.filter((user) => {
                return (
                    user.name.toLowerCase().includes(search.toLowerCase()) || 
                    user.lastname.toLowerCase().includes(search.toLowerCase())) ||
                    user.school.toLowerCase().includes(search.toLowerCase()) ||
                    user.city.toLowerCase().includes(search.toLowerCase()) ||
                    user.country.toLowerCase().includes(search.toLowerCase())
            })
        )
    }, [search, users])

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/admin/user/create' className="btn btn-sm btn-success">Add</Link>
                </div>
            </div>
            <div>
                <h3>All Users</h3>
                <input onChange={(e) => setSearch(e.target.value)} className="form-control col-md-3" placeholder="Search name, lastname, school, city or country" style={{ float: 'right', fontSize: '14px' }} />
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Lastname</th>
                                <th>School</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredUsers.map(u => {
                                    return (
                                        <tr key={u.id}>
                                            <td>{u.id}</td>
                                            <td>{u.name}</td>
                                            <td>{u.lastname}</td>
                                            <td>{u.school}</td>
                                            <td>{u.city}</td>
                                            <td>{u.country}</td>
                                            <td>{u.created}</td>
                                            <td>
                                                <div className="btn-group mr-2">
                                                    <Link to={`/admin/user/edit/${u.id}`} className="btn btn-sm btn-primary">Update</Link>
                                                    <a onClick={() => deleteUser(u.id)} to={`/admin/user/delete/${u.id}`} style={{ marginLeft: '3px' }} className="btn btn-sm btn-danger">Delete</a>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Wrapper >

    )
}
