import './App.css';
import Courses from './admin/Courses'
import Main from './main/Main'
import CourseCreate from './admin/CourseCreate'
import CourseEdit from './admin/CourseEdit'
import Users from './admin/Users'
import UserCreate from './admin/UserCreate'
import UserEdit from './admin/UserEdit'
import CourseView from './admin/CourseView'
import Login from './admin/Login'
import { BrowserRouter, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

const auth = true
function App() {
  if (auth) {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path='/' exact component={Main} />
          <Route path="/admin/courses" component={Courses} />
          <Route path="/admin/course/create" component={CourseCreate} />
          <Route path="/admin/course/edit/:id" component={CourseEdit} />
          <Route path="/course/view/:id" component={CourseView} />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/user/create" component={UserCreate} />
          <Route path="/admin/user/edit/:id" component={UserEdit} />
          <Route path="/admin/login" component={Login} />
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

