import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from '../config/axios'
import {onLoginUser} from '../actions/index'
import { connect } from 'react-redux';

class Login extends Component {

    onButtonClick = () => {
        const inputEmail = this.email.value
        const inputPassword = this.password.value

        this.props.onLoginUser(inputEmail, inputPassword)
    }


    render() {
        if(!this.props.id){
            return (
                <div className="mt-5 row animated bounceIn delay-2s">
                <div className="col-sm-3 mx-auto card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title">
                            <h1>Login</h1>
                        </div>
                        <div className="card-title mt-1">
                            <h4>Email</h4>
                        </div>
                        <form className="input-group"><input ref={input => this.email = input} className="form-control" type="text" /></form>
                        <div className="card-title mt-1">
                            <h4>Password</h4>
                        </div>
                        <form className="input-group"><input ref={input => this.password = input} className="form-control" type="password" /></form>
                        <div className="d-flex justify-content-center my-3">
                            <button className="btn btn-success btn-block" onClick={this.onButtonClick}>Login</button>
                        </div>
                        <p className="lead">Don't have account?  <Link to="/register">Sign up!</Link></p>
                        <p className="lead">homae <Link to="/">home</Link></p>
                    </div>
                </div>
            </div>
            )
        }
        return <Redirect to='/' />
    }
}

const mapStateToProps = state => {
    return{
        id : state.auth.id
    }

}



export default connect(mapStateToProps, {onLoginUser})(Login)