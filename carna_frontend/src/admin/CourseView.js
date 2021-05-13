import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { axiosInstance } from '../services';

export default function CourseView(props) {
    const [course, setCourse] = useState([])
    const [courses, setCourses] = useState([])
    const [random_courses, setRandomCourses] = useState([])

    // find selected course to view
    useEffect(() => {
        const loadCourse = async () => {
            axiosInstance.get(`/course/${props.match.params.id}`)
            .then((res) => {
                setCourse(res.data)
            }).catch((err) => {
                if(err.response.status === 401){
                    window.location.href = '/admin/login'
                }
            })
        }
        loadCourse()
    }, [])

    // load all courses
    useEffect(() => {
        const loadCourses = async () => {
            await axiosInstance.get('/course')
            .then((res) => {
                setCourses(res.data)
            }).catch((err) => {
                if(err.response.status === 401){
                    window.location.href = '/admin/login'
                }
            })
            // var rndCourses = [];
            // for (var i = 0; i < 2; i++) {
            //     var rand = courses[Math.floor(Math.random() * courses.length)];
            //     rndCourses.push(rand)

            // }
            // setRandomCourses(rndCourses)
        }
        loadCourses()
    }, [])

    return (
        <Wrapper>
            <div style={{ marginTop: '10px' }}>
                <main>
                    <h2>{course.name} Details</h2>
                    <p className="fs-5 col-md-8">{course.description}</p>
                    <div className="mb-5">
                        <a onClick={() => alert('Enrolled!')} className="btn btn-primary btn-lg px-4">${course.price} BUY NOW!</a>
                    </div>
                    <h3>Similar Courses</h3>
                    <hr />
                    <div className="row g-5">
                        {courses.map(c => {
                            return (
                                <div key={c.id} className="col-md-5">
                                    <h4>{c.name}</h4>
                                    <p>{c.description}</p>
                                    <a onClick={() => alert('Enrolled!')} className="btn btn-sm btn-primary btn-lg px-4">${c.price} BUY NOW!</a>

                                </div>
                            )
                        })}
                    </div>
                </main>
            </div>
        </Wrapper>
    )
}
