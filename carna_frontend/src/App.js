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
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
import { ProtectedRoute } from './admin/protected_route'
import { auth } from './services';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/admin/login" component={Login} />
        <ProtectedRoute path="/admin/courses" exact component={Courses} />
        <ProtectedRoute path="/admin/course/edit/:id" component={CourseEdit} />
        <ProtectedRoute path="/admin/course/create" component={CourseCreate} />
        <ProtectedRoute path="/course/view/:id" component={CourseView} />
        <ProtectedRoute path="/admin/users" exact component={Users} />
        <ProtectedRoute path="/admin/user/create" component={UserCreate} />
        <ProtectedRoute path="/admin/user/edit/:id" component={UserEdit} />
      </Switch>

    </div>
  );
}
export default App;

