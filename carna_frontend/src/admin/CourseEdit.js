import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import Wrapper from './Wrapper'
import { axiosInstance } from '../services';

// update course component
export default function CourseEdit(props) {
    const [course_name, setCourseName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [redirect, setRedirect] = useState(false)

    // find selected course to update
    useEffect(() => {
        (
            async () => {
                axiosInstance.get(`/course/${props.match.params.id}`)
                    .then((res) => {
                        setCourseName(res.data.name)
                        setDescription(res.data.description)
                        setPrice(res.data.price)
                    }).catch((err) => {
                        if (err.response.status === 401) {
                            window.location.href = '/admin/login'
                        }
                    })
            }
        )()
    }, [])

    // update selected course
    const handleSubmit = async (e) => {
        e.preventDefault()
        axiosInstance.put(`course/update/${props.match.params.id}`,
            {
                name: course_name,
                description: description,
                price: price
            }).then((res) => {
                if (res.status === 200) {
                    setRedirect(true)
                }
            }).catch((err) => {
                console.log(err)
                alert('Something Went Wrong!')
            })
    }

    // redirect the page if update successfull
    if (redirect) return <Redirect to="/admin/courses" />
    
    return (
        <Wrapper>
            <form onSubmit={handleSubmit} style={{ width: '70%' }}>
                <h4>Update Course</h4>
                <div className="form-group">
                    <label>Course Name</label>
                    <input type="text" className="form-control" name="course_name"
                        defaultValue={course_name}
                        onChange={e => setCourseName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input type="text" className="form-control" name="description"
                        defaultValue={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" className="form-control" name="price"
                        defaultValue={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </Wrapper>
    )
}