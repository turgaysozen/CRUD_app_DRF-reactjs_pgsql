import React, { useState, useEffect } from 'react'
import { LoginUser, auth } from '../services';
import { Redirect } from 'react-router-dom'

export default function Login(props) {
    const [username, setUserName] = useState()
    const [password, setUserPassword] = useState()
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await LoginUser(username, password)
        setMessage(res)
    };

    return (
        <div>
            {!auth() ?
                <form onSubmit={handleSubmit} style={{ width: '20%', marginLeft: '40%', marginTop: '40px' }}>
                    <h4>Login</h4>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name"
                            onChange={e => setUserName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="lastname"
                            onChange={e => setUserPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button><br></br><br></br>
                    {
                        message ?
                            <label className="alert alert-danger">{message}</label>
                            : ""
                    }
                </form>

                :
                <Redirect to={"/"} />
            }
        </div>

    )
}
