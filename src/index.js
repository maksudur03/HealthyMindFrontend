import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './components/home/index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from './components/home/navbar/nav';
import Profile from './components/profile/Profile';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Post from './components/post/Post';
import Edit_Profile from './components/edit_Profile/Edit_Profile';
import Details_Post from './components/details_Post/Details_Post';
import AdminPage from './components/adminPage/AdminPage';
import ApprovalPage from './components/approvalPage/ApprovalPage';
import Edit_Post from './components/edit_Post/Edit_Post';
import Logout from './components/logout/Logout';
import Spec from './components/specialist/Spec';

class App extends React.Component{
    render(){
        return(
            <Router>

                <Nav />

                <Switch>
                    <Route exact path='/' component ={Index} />
                    <Route path='/profile' component ={Profile} />
                    <Route path='/login' component ={Login} />
                    <Route path='/register' component ={Register} />
                    <Route path='/post' component ={Post} />
                    <Route path='/edit_profile' component ={Edit_Profile} />
                    <Route path='/details_post' component ={Details_Post}/>
                    <Route path='/admin_page' component={AdminPage}/>
                    <Route path='/approval_page' component={ApprovalPage}/>
                    <Route path='/edit_post' component={Edit_Post}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/spec' component={Spec}/>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
