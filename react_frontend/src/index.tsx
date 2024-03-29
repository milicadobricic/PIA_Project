import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import {Switch} from "react-router";
import * as serviceWorker from './serviceWorker';
import App from "./App";
import HomePage from "./components/home/HomePage";
import NotFound from "./components/general/NotFound";
import PrivateRoute from "./components/general/PrivateRoute";
import RegisterPage from "./components/register/RegisterPage";
import CurrentUserProfilePage from "./components/profile/CurrentUserProfilePage";
import EmployeesPage from "./components/employees/EmployeesPage";
import UserProfilePage from "./components/profile/UserProfilePage";
import EditProfilePage from "./components/profile/EditProfilePage";
import DashboardPage from "./components/admin/DashboardPage";
import AddStudentPage from "./components/admin/AddStudentPage";
import StudentListPage from "./components/admin/StudentListPage";
import EditStudentPage from "./components/admin/EditStudentPage";
import AddEmployeePage from "./components/admin/AddEmployeePage";
import EmployeeListPage from "./components/admin/EmployeeListPage";
import EditEmployeePage from "./components/admin/EditEmployeePage";
import MasterStudiesPage from "./components/studies/MasterStudiesPage";
import BachelorStudiesPage from "./components/studies/BachelorStudiesPage";
import CreateClassPage from "./components/admin/CreateClassPage";
import EditClassPage from "./components/admin/EditClassPage";
import ClassListPage from "./components/admin/ClassListPage";
import ClassInfoPage from "./components/class/ClassInfoPage";
import CreateNotificationPage from "./components/class/CreateNotificationPage";
import EditNotificationPage from "./components/class/EditNotificationPage";
import ClassNotificationsPage from "./components/class/ClassNotificationsPage";
import CurrentUserNotificationsPage from "./components/profile/CurrentUserNotificationsPage";
import UpdatePasswordPage from "./components/profile/UpdatePasswordPage";
import LecturesPage from "./components/class/LecturesPage";
import ExercisesPage from "./components/class/ExercisesPage";
import ExamsPage from "./components/class/ExamsPage";
import ContactPage from "./components/general/ContactPage";
import AddStudentsToClassesPage from "./components/admin/AddStudentsToClassesPage";
import LecturersPage from "./components/class/LecturersPage";
import PracticalLessonsPage from "./components/class/PracticalLessonsPage";
import SciencePage from "./components/general/SciencePage";
import AddGroupPage from "./components/admin/AddGroupPage";

const generalRoutes: Array<{path: string, component: any}> = [
    {path: '/', component: HomePage},
    {path: '/register', component: RegisterPage},
    {path: '/employees', component: EmployeesPage},
    {path: '/user/:username', component: UserProfilePage},
    {path: '/master', component: MasterStudiesPage},
    {path: '/bachelor/:group', component: BachelorStudiesPage},
    {path: '/contact', component: ContactPage},
    {path: '/science', component: SciencePage},
    {path: '/not-found', component: NotFound},
]

const loggedInRoutes: Array<{path: string, component: any}> = [
    {path: '/profile', component: CurrentUserProfilePage},
    {path: '/edit-profile', component: EditProfilePage},
    {path: '/class/info/:id', component: ClassInfoPage},
    {path: '/class/lecturers/:id', component: LecturersPage},
    {path: '/class/notifications/:id', component: ClassNotificationsPage},
    {path: '/class/lectures/:id', component: LecturesPage},
    {path: '/class/exercises/:id', component: ExercisesPage},
    {path: '/class/exams/:id', component: ExamsPage},
    {path: '/class/practical/:id', component: PracticalLessonsPage},
    {path: '/edit-class/:id', component: EditClassPage},
    {path: '/create-notification', component: CreateNotificationPage},
    {path: '/my-notifications', component: CurrentUserNotificationsPage},
    {path: '/edit-notification/:id', component: EditNotificationPage},
    {path: '/update-password', component: UpdatePasswordPage},
]

const adminRoutes: Array<{path: string, component: any}> = [
    {path: '/dashboard', component: DashboardPage},
    {path: '/register-student', component: AddStudentPage},
    {path: '/students', component: StudentListPage},
    {path: '/student/:id', component: EditStudentPage},
    {path: '/register-employee', component: AddEmployeePage},
    {path: '/manage-employees', component: EmployeeListPage},
    {path: '/employee/:id', component: EditEmployeePage},
    {path: '/create-class', component: CreateClassPage},
    {path: '/manage-classes', component: ClassListPage},
    {path: '/student-classes', component: AddStudentsToClassesPage},
    {path: '/add-group', component: AddGroupPage},
]

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                {
                    generalRoutes.map(route => <Route exact path={route.path} component={route.component}/>)
                }
                {
                    loggedInRoutes.map(route => <Route exact path={route.path} render={props =>
                        <PrivateRoute roles={["student", "employee", "admin"]}>
                            {React.createElement(route.component, props)}
                        </PrivateRoute>
                    }/>)
                }
                {
                    adminRoutes.map(route => <Route exact path={route.path} render={props =>
                        <PrivateRoute roles={["admin"]}>
                            {React.createElement(route.component, props)}
                        </PrivateRoute>}/>)
                }
                <Route render={() => <Redirect to={"/not_found"}/>}/>
            </Switch>
        </App>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
