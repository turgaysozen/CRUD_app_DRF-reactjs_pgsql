import React, { useState } from 'react'
import { Redirect } from 'react-router'
import Wrapper from './Wrapper'
import { axiosInstance } from '../services';

export default function CourseCreate() {
    const [course_name, setCourseName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [redirect, setRedirect] = useState(false)

    // create course
    const handleSubmit = async (e) => {
        e.preventDefault()
        axiosInstance.post('course/create',
            {
                name: course_name,
                description: description,
                price: price
            }).then((res) => {
                if (res.status === 201) {
                    setRedirect(true)
                } else alert('Something Went Wrong!')
            })
    }

    // redirect the page if creation successfull
    if (redirect) return <Redirect to="/admin/courses" />

    return (
        <Wrapper>
            <form onSubmit={handleSubmit} style={{ width: '70%' }}>
                <h4>Add Course</h4>
                <div className="form-group">
                    <label>Course Name</label>
                    <input type="text" className="form-control" name="course_name"
                        onChange={e => setCourseName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description"
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" name="price"
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Wrapper>
    )
}