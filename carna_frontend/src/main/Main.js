import React, { useState, useEffect } from 'react'
import Wrapper from '../admin/Wrapper'
import { Link, Redirect } from "react-router-dom";
import { FetchHomeCourses } from '../services'

// main component, it shows courses on http://localhost:3000/

export default function Main() {
    const [courses, setCourses] = useState([])

    // get all courses
    useEffect(() => {
        const loadCourses = async () => {
            const res = await FetchHomeCourses()
            if (res.status === 200) {
                setCourses(res.data)
            } else alert('Something went wrong!')
        }
        loadCourses()
    }, [])

    return (
        <Wrapper>
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">
                        <h4>All Courses</h4>
                        {courses.map(c => {
                            const thumb = `https://img.youtube.com/vi/${c.video_id}/mqdefault.jpg`
                            const alt = c.name
                            c.student_count = Math.floor(Math.random() * 50); // total enrolled student, the number created randomly
                            return (
                                <div style={{ cursor: "pointer" }} key={c.id} onClick={() => window.location.href = `/course/${c.id}`} className="row col-md-12">
                                    <hr />
                                    <div className="row align-items-center col-md-12 mt-2">
                                        <div className="col-md-3 pt-2"><img alt={alt} className="img-fluid rounded" src={thumb} /></div>
                                        <div className="col-lg-9 pl-2">
                                            <div className="pb-3"><h5 style={{ display: "inline" }}>{c.name.substr(0, 70)}..</h5><h5 className="bg bg-success rounded text-white" style={{ float: "right" }}>${c.price}</h5></div>
                                            <div>{c.description.substr(0, 220)}...</div>
                                            <span>Total Student: {c.student_count}</span><br></br>
                                            <span>Created Time: {String(c.created).split('T')[0]}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
        </Wrapper>

    )
}
