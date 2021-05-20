import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import Wrapper from './Wrapper'
import { CreateCourse, FetchCategories } from '../services';
import { Multiselect } from 'multiselect-react-dropdown';

export default function CourseCreate() {
    const [course_name, setCourseName] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [redirect, setRedirect] = useState(false)
    const [duration, setDuration] = useState()
    const [video_id, setVideoID] = useState()
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])

    // load all categories to fill dropdown selectbox
    useEffect(() => {
        const loadCategories = async () => {
            const res = await FetchCategories()
            if (res.status === 200) {
                setCategories(res.data)
            }
        }
        loadCategories()
    }, [])

    // add selected categories
    const onSelect = (selectedList, selectedItem) => {
        setSelectedCategories(selectedList)

    }
    // remove from selected categories
    const onRemove = (selectedList, removedItem) => {
        setSelectedCategories(selectedList)

    }

    // create course
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await CreateCourse({ name: course_name, description: description, price: price, duration: duration, video_id: video_id.split('/')[3], categories: selectedCategories.map(c => c.id) })
        if (res.status === 201) {
            setRedirect(true)
        } else alert('Something Went Wrong!')
    }

    // redirect the page if creation successfull
    if (redirect) return <Redirect to="/admin/courses" />

    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className="col-md-6 mt-4">
                <h4>Add Course</h4>
                <label>Categories</label><br></br>
                <Multiselect
                    options={categories} // Options to display in the dropdown
                    selectedValues={selectedCategories} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                />
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
                    <input type="number" step="any" className="form-control" name="price"
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Duration</label>
                    <input type="number" className="form-control" name="duration"
                        onChange={e => setDuration(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Video ID</label>
                    <input type="text" className="form-control" name="video_id"
                        onChange={e => setVideoID(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </Wrapper>
    )
}