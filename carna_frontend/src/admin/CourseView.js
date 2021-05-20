import React, { useState, useEffect } from 'react'
import Wrapper from './Wrapper'
import { FindCourse, FetchCourses, FindCourseHome } from '../services';

export default function CourseView(props) {
    const [course, setCourse] = useState([])
    const [courses, setCourses] = useState([])
    const [video_src, setVideoSrc] = useState("")

    // find selected course to view
    useEffect(() => {
        const loadCourse = async () => {
            const res = await FindCourseHome(props)
            if (res.status === 200) {
                setCourse(res.data)
                const src = `https://www.youtube.com/embed/${res.data.video_id}`
                setVideoSrc(src)
                
            }
        }
        loadCourse()
    }, [])

    // load all courses
    useEffect(() => {
        const loadCourses = async () => {
            const res = await FetchCourses()
            if (res.status === 200) {
                setCourses(res.data)
            } else alert('Something went wrong!')
        }
        loadCourses()
    }, [])

    return (
        <Wrapper>
            <div style={{ marginTop: '10px' }}>
                <main className="col-md-12">
                    <h2>{course.name}</h2>
                    <iframe width="760" height="505" src={video_src} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
