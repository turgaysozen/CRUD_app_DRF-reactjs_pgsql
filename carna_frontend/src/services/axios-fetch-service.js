import { axiosInstance } from './axios'

// course fetch funcs.

// get all courses
export const FetchCourses = async () => {
    return await axiosInstance.get('/course')
}

// delete specific course
export const DeleteCourse = async (id) => {
    return await axiosInstance.delete(`/course/delete/${id}`)
}

// create course
export const CreateCourse = async (data) => {
    return await axiosInstance.post('course/create', data)
}

// update selected course
export const UpdateCourse = async (props, data) => {
    return await axiosInstance.put(`course/update/${props.match.params.id}`, data)
}

// find selected course
export const FindCourse = async (props) => {
    return await axiosInstance.get(`/course/${props.match.params.id}`)

}

// user fetch funcs.

// get all users
export const FetchUsers = async () => {
    return await axiosInstance.get('/user')
}

// delete specific user
export const DeleteUser = async (id) => {
    return await axiosInstance.delete(`/user/delete/${id}`)
}

// create user
export const CreateUser = async (data) => {
    return await axiosInstance.post('user/create', data)
}

// update selected user
export const UpdateUser = async (props, data) => {
    return await axiosInstance.put(`user/update/${props.match.params.id}`, data)
}

// find user
export const FindUser = async (props) => {
    return await axiosInstance.get(`/user/${props.match.params.id}`)
}

// login

export const LoginUser = (username, password) => {
    axiosInstance
        .post(`account/token/`, {
            username: username,
            password: password,
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token'); // JWT => Bearer ??
            // history.push('/');
            window.location.href = '/'

        })
}

export const Logout = () => {
    axiosInstance.post('account/logout', {
        refresh_token: localStorage.getItem('refresh_token'),
    });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    axiosInstance.defaults.headers['Authorization'] = null;
    window.location.href = 'admin/login'
}

// get authenticated user
export const AuthUser = async () => {
    return await axiosInstance.get("/account/user")
}