import React, { useEffect, useState } from 'react'
import { FetchHomeCoursesByCategory } from '../services/'
import Wrapper from '../admin/Wrapper'

export default function CoursesByCategory(props) {
    const [coursesByCategory, setCoursesByCategory] = useState([])
    const [id, setId] = useState([])
    const [cat_name, setCatName] = useState([])

    console.log(props)
    useEffect(() => {
        const loadCoursesbyCat = async () => {
            let res = await FetchHomeCoursesByCategory(props)
            setCoursesByCategory(res.data)
            setId(props.match.params.id)
            setCatName(props.match.params.cat_name)
        }
        loadCoursesbyCat()
    }, [props.match.params.id])

    return (
        <Wrapper>
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">
                        <h4><span style={{color:"red"}}>{cat_name}</span> Courses</h4>
                        {coursesByCategory.map(c => {
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
                                        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/5AOn0BmSXyE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
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
