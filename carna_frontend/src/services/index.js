import {
    FetchCourses,
    DeleteCourse,
    FindCourse,
    UpdateCourse,
    CreateCourse,
    FetchUsers,
    CreateUser,
    UpdateUser,
    FindUser,
    LoginUser,

} from './axios-fetch-service'

import { auth } from './auth'

import { axiosInstance } from './axios'

export {
    FetchCourses,
    DeleteCourse,
    FindCourse,
    UpdateCourse,
    CreateCourse,
    FetchUsers,
    CreateUser,
    UpdateUser,
    FindUser,
    LoginUser,
    axiosInstance,
    auth
}