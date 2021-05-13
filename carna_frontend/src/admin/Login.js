import React, { useState, useEffect } from 'react'
import { axiosInstance } from '../services';
import { useHistory } from 'react-router-dom';

export default function Login() {
    const history = useHistory();
    const [username, setUserName] = useState()
    const [password, setUserPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`token/`, {
                username: username,
                password: password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token'); // JWT => Bearer ??
                history.push('/');
                console.log(res)

            })

    };

    // check user authenticated or not
    useEffect(() => {        
        LoginCheck()
    }, [])

    const LoginCheck = () => {
        axiosInstance.get('/course')
            .then((res) => {
                if (res.status !== 401) {
                   window.location.href = '/'
                }
            }).catch((err) => {
                if (err.response.status === 401) {
                   window.redirect = '/admin/login'
                }
            })
    }

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
