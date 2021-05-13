// course fetch funcs.

// get all courses
export const FetchCourses = async () => {
    const res = await fetch('http://localhost:8000/api/course')
    if (res.status === 200) {
        const data = await res.json()
        return data
    } else console.log({ 'message': 'Error while loading courses' }, res.status)
}

// delete specific course
export const DeleteCourse = async (id) => {
    await fetch(`http://localhost:8000/api/course/delete/${id}`, {
        method: 'DELETE'
    })
}

// create course
export const CreateCourse = async (course_name, description, price) => {
    const res = await fetch('http://localhost:8000/api/course/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: course_name,
            description: description,
            price: price
        })
    })
    return res
}

// update selected course
export const UpdateCourse = async (props, course_name, description, price) => {
    const res = await fetch(`http://localhost:8000/api/course/update/${props.match.params.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: course_name,
            description: description,
            price: price
        })
    })
    return res
}

// find selected course
export const FindCourse = async (props) => {
    const res = await fetch(`http://localhost:8000/api/course/${props.match.params.id}`)
    const course = await res.json()
    return course
}

// user fetch funcs.

// get all users
export const FetchUsers = async () => {
    const res = await fetch('http://localhost:8000/api/user')
    if (res.status === 200) {
        const data = await res.json()
        return data
    } else console.log({ 'message': 'Error while loading users' }, res.status)
}

// delete specific user
export const DeleteUser = async (id) => {
    await fetch(`http://localhost:8000/api/user/delete/${id}`, {
        method: 'DELETE'
    })
}

// create user
export const CreateUser = async (name, lastname, school, city, country) => {
    const res = await fetch('http://localhost:8000/api/user/create', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            lastname: lastname,
            school: school,
            city: city,
            country: country
        })
    })
    return res
}

// update selected user
export const UpdateUser = async (props, name, lastname, school, city, country) => {
    const res = await fetch(`http://localhost:8000/api/user/update/${props.match.params.id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            lastname: lastname,
            school: school,
            city: city,
            country: country
        })
    })
    return res
}

// find user
export const FindUser = async (props) => {
    const res = await fetch(`http://localhost:8000/api/user/${props.match.params.id}`)
    const user = await res.json()
    return user
}

// login
export const LoginUser = async (username, password) => {
    const res = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
    console.log(res)
}