import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

class Home extends Component {

    state = {
        tasks : []
    }

    getTask = async () => {
        var ambilTask = await axios.get('/task/' + this.props.user.id)
        console.log(ambilTask.data.tasks)
        this.setState({tasks : ambilTask.data.tasks})
    }
    componentDidMount(){
        this.getTask()
        console.log()
    }

    deleteTask = async (userid,taskid) => {
        var deletetask = await axios.delete('/users/' + userid + '/' + taskid)
        console.log(deletetask)
        this.getTask()

    }

    renderTask = () => {
        var hasil = this.state.tasks.map(item => {
            if(!item.completed){
            return(
                <li className= 'list-group-item d-flex justify-content-between' onDoubleClick={() => {this.deleteTask(this.props.user.id,item._id)}} key={item._id}>
                    <span>{item.description}</span>
                    <span>
                        <button className='btn btn-primary' onClick={() => {this.taskDone(this.props.user.id,item._id)}}>
                            DONE
                        </button>
                    </span>
                </li>
            )
            }
            return(
            <li className= 'list-group-item d-flex justify-content-between' onDoubleClick={() => {this.deleteTask(this.props.user.id,item._id)}} key={item._id}>
                <span>{item.description}</span>
                <span>
                    <button className='btn btn-primary' onClick={() => {this.taskDone(this.props.user.id,item._id)}} >
                        NOT DONE
                    </button>
                </span>
            </li>
            )
        
    })
    return hasil
}
    
    addTask = async (userid) => {
        const description = this.task.value
        
        //post task baru

    var nambahTask = await axios.post('/task/' + userid,
        {
            description
        })
    var ambilTask = await axios.get('task/' + userid)
    this.setState({tasks : ambilTask.data.tasks})                            
    }

    taskDone = async (userid,taskid) => {
        console.log(taskid)
        console.log(userid)
        var ubahTask = await axios.patch('/task/' + userid + '/' + taskid)
        console.log(ubahTask)

        var ambilTask = await axios.get('task/' + userid)
    this.setState({tasks : ambilTask.data.tasks}) 
        
        
    }



    render() {
        if(this.props.user.id){
            return (
                <div className="container">
                        
                        <form className="form-group mt-5">
                            <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.task = input}/>
                        </form>
                        <button type="submit" className="btn btn-block btn-primary mt-3" onClick={() => this.addTask(this.props.user.id)}>Up !</button>

                        <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                        {this.renderTask()}
                        <ul className="list-group list-group-flush mb-5"></ul>
                    </div>
            )
        }

        return <Redirect to='/login'/>
        
    }
    }


const mapStateToProps = state => {
    return{
      user: state.auth //berisi id dan username
    }
  }
  
  export default connect(mapStateToProps)(Home)