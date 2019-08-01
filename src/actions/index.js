import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onLoginUser = (inputEmail, inputPassword) => {

    return async (dispatch) => {
    var getUser = await axios.post('/users/login',
        {
            email : inputEmail,
            password : inputPassword
        })
    
    if(typeof(getUser.data) == 'string'){
        console.log ('error')
    } 
    else {
        cookie.set('userDataCookie',
            {
                id: getUser.data._id,
                name: getUser.data.name
            }
        )
        console.log('berhasil')
        dispatch({
            type : 'LOGIN_SUCCESS',
            payload : {
                id: getUser.data._id,
                name: getUser.data.name
            }
        })
    }

    }

}

export const keepLogin = (usercookie) => {
    return{
        type : 'LOGIN_SUCCESS',
        payload : {
            id: usercookie.id,
            name: usercookie.name
        }
    }
}

export const onLogoutUser = () => {
    cookie.remove('userDataCookie')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}