import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:5263/api',
})

export default request
