import Wrapper from './Wrapper'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FetchCourses, DeleteCourse } from '../services';

// course list page, renders all of courses to the table
export default function Courses() {
    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState("")
    const [filteredCourses, setFilteredCourses] = useState([])

    // load courses
    useEffect(() => {
        const loadCourses = async () => {
            const res = await FetchCourses()
            if (res.status === 200) {
                setCourses(res.data)
            } else alert('Something went wrong!')
        }
        loadCourses()
    }, [])

    // delete selected course
    const deleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            const res = await DeleteCourse(id)
            if (res.status === 200) {
                alert('Course deleted!')
            } else {
                alert('Something went wrong!')
            }
            setCourses(courses.filter((c) => c.id !== id));
        }
    }

    // filter courses on the table
    useEffect(() => {
        setFilteredCourses(
            courses.filter((course) => {
                return (
                    course.name.toLowerCase().includes(search.toLowerCase()) ||
                    course.description.toLowerCase().includes(search.toLowerCase()) ||
                    course.price.toString().toLowerCase().includes(search.toLowerCase())
                )
            })
        )
    }, [search, courses])

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <div className="btn-toolbar mb-2 mb-md-0">
                    <Link to='/admin/course/create' className="btn btn-sm btn-success">Add</Link>
                </div>
            </div>
            <div>
                <h3>All Courses</h3>
                <input onChange={(e) => setSearch(e.target.value)} className="form-control col-md-3" placeholder="Search course name, description or price" style={{ float: 'right', fontSize: '14px' }} />

                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Duration</th>
                                <th>Created Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCourses.map(c => {
                                return (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.name}</td>
                                        {/* <td><img height="60px" width="60px" src="https://img.youtube.com/vi/5AOn0BmSXyE/default.jpg"/></td> */}
                                        <td>${c.price}</td>
                                        <td>{c.duration} min.</td>
                                        <td>{c.created}</td>
                                        <td>
                                            <div className="btn-group mr-2">
                                                <Link to={`/admin/course/edit/${c.id}`} className="btn btn-sm btn-primary">Update</Link>
                                                <a onClick={() => deleteCourse(c.id)} to={`/admin/course/delete/${c.id}`} style={{ marginLeft: '3px' }} className="btn btn-sm btn-danger">Delete</a>
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
