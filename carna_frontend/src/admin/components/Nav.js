import React, { useEffect, useState } from 'react'
import { AuthUser, Logout } from '../../services'

export default function Nav() {
  let [user, setUser] = useState("")
  useEffect(() => {
    const getUser = async () => {
      const res = await AuthUser()
      setUser(res.data.user)
    }
    getUser()
  }, [])

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">CARNA E-LEARNING</a>
      <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        {/* <span className="navbar-toggler-icon"></span> */}
      </button>
      <input style={{ width: "70%" }} className="form-control form-control-dark" type="text" placeholder="Search" aria-label="Search" />
      {
        user ?
          <div className="row mr-3">
            <a href="/account" className="text-white mt-1">Hi, {user}</a>
            <a className="btn btn-sm ml-2 btn-danger" onClick={() => Logout()}>Logout</a>
          </div>
          :
          <a className="btn btn-sm mr-3 btn-danger" href="/admin/login">Login</a>
      }

    </header>
  )
}
