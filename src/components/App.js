import React, { Component } from 'react'
import Register from './Register'
import Login from './Login'
import Home from './Home';
import Header from './Header'
import Profile from './Profile'
import EditProfile from './EditProfile'

import {BrowserRouter,Route} from 'react-router-dom'
import cookies from 'universal-cookie'
import {keepLogin} from '../actions/index'
import {connect} from 'react-redux'


const cookie = new cookies()




class App extends Component {

    componentWillMount(){
        var usercookie = cookie.get('userDataCookie')
    
        if(usercookie){
            //keepLogin (kirim id dan name ke redux)
            this.props.keepLogin(usercookie)
        }
    }


    render() {
        return (
            
            <BrowserRouter>
                <Header />
                <Route path ='/' exact component={Home} />
                <Route path ='/login' component={Login} />
                <Route path ='/register' component={Register} />
                <Route path ='/profile' component={Profile} />
                <Route path ='/editprofile' component={EditProfile} />
            </BrowserRouter>
            
        )
    }
}

export default connect(null, {keepLogin})(App)