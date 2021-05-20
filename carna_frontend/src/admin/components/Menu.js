import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FetchCategories } from '../../services'

export default function Menu() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const loadCategories = async () => {
            const res = await FetchCategories()
            if (res.status === 200) {
                setCategories(res.data)
            }
        }
        loadCategories()
    }, [])

    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <h5>Categories</h5>
                    {categories.map(c => {
                        if(c.course_count > 0)
                        return (
                            <li key={c.id}  className="nav-item">
                                <Link style={{fontSize:"15px"}} className="nav-link" to={`/courses/category/${c.id}/${c.name}`}>{c.name} ({c.course_count})</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}
