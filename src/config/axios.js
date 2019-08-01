import axios from 'axios'

export default axios.create(
    {
        baseURL : 'https://weldi9mongoose.herokuapp.com'
    }
)