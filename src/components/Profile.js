import React, { Component } from 'react'
import axios from '../config/axios';
import { Jumbotron} from 'reactstrap';
import {connect} from 'react-redux'

class Profile extends Component {
    state = {
        data: null,
        avatar : null
    }



    arrayBufferToBase64(buffer) {
        let binary = '';
        let bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach( (byte) => binary = binary + String.fromCharCode(byte) );
        // console.log(binary)
        return window.btoa(binary);
    };

    displayPicture = async () => {
        // Get Profile
        const res = await axios.get('/users/' + this.props.user.id)
        this.setState({data : res.data})
            
        const base64Flag = 'data:image/jpeg;base64,';
        const imageStr = this.arrayBufferToBase64(res.data.avatar.data);    
        console.log(imageStr);
        const picture = base64Flag+imageStr
        // console.log(picture)

        this.setState( { avatar: picture } )

    }

    componentDidMount() {
        this.displayPicture()
        console.log(this.state.data)
    }

    render() {
        if(this.state.data){
            return (
                <div className="container mt-5">
                    <Jumbotron >
                        {/* cara senior developer */}
                        {/* <img src={this.state.avatar} alt="Please choose your avatar" key={new Date()} /> */}
                        <img src={'http://localhost:2019/users/' + this.props.user.id + `/avatar`} alt="Please choose your avatar" key={new Date()} />
                        <h1 className="display-3">Hello, {this.state.data.name}!</h1>
                        
                        
                        <p className="lead"></p>
                    </Jumbotron>
                </div>
            )
        }

        return <h1>Loading</h1>
    }
}

const mps = state => {
    return {
        user: state.auth
    }
}

export default connect(mps)(Profile)