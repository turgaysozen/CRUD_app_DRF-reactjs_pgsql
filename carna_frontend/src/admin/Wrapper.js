import React from 'react'
import Nav from './components/Nav'
import Menu from './components/Menu'

export default function Wrapper(props) {
    return (
        <div>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    <div />
                    <main className="col-md-12 ml-sm-auto col-lg-10 px-md-4">
                        {props.children}
                    </main >
                </div>
            </div>
        </div>
    )
}
