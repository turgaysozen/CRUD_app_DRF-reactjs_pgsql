import React, { useState } from 'react'
import { Redirect } from 'react-router'
import Wrapper from './Wrapper'
import { CreateUser } from '../services';

// create user
export default function UserCreate() {
    const [name, setUserName] = useState()
    const [lastname, setUserLastname] = useState()
    const [school, setUserSchool] = useState()
    const [city, setUserCity] = useState()
    const [country, setUserCountry] = useState()
    const [redirect, setRedirect] = useState(false)

    // create new user
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await CreateUser({ name: name, lastname: lastname, school: school, city: city, country: country })
        if (res.status === 201) {
            setRedirect(true)
        } else alert('Something Went Wrong!')
    }

    // redirect the page if creation successfull
    if (redirect) return <Redirect to="/admin/users" />

    return (
        <Wrapper>
            <form onSubmit={handleSubmit} style={{ width: '30%' }}>
                <h4>Add User</h4>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name"
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" name="lastname"
                        onChange={e => setUserLastname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>School</label>
                    <input type="text" className="form-control" name="school"
                        onChange={e => setUserSchool(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" className="form-control" name="city"
                        onChange={e => setUserCity(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" className="form-control" name="country"
                        onChange={e => setUserCountry(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Wrapper>
    )
}