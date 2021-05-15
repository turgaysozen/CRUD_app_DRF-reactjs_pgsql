import React, { useState, useEffect } from 'react'
import { LoginUser } from '../services';

export default function Login() {
    const [username, setUserName] = useState()
    const [password, setUserPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();
        LoginUser(username, password)
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '20%', marginLeft: '40%', marginTop: '40px' }}>
            <h4>Login</h4>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" name="name"
                    onChange={e => setUserName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" name="lastname"
                    onChange={e => setUserPassword(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}
