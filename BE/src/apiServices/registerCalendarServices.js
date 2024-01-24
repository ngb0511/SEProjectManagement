import request from '../utils/request'

export const getRegisterCalendar = async () => {
  try {
    const response = await request.get('/RegisterCalendar/GetAll')
    // Success 🎉
    //console.log(response)
    return response.data
  } catch (error) {
    if (error.response) {
      //console.log(error.response.data)
      //console.log(error.response.status)
      //console.log(error.response.headers)
    } else if (error.request) {
      //console.log(error.request)
    } else {
      //console.log('Error', error.message)
    }
    //console.log(error)
  }
}

export const GetNewestRegisterCalendar = async () => {
    try {
      const response = await request.get('/RegisterCalendar/GetNewestRegisterCalendar')
      // Success 🎉
      //console.log(response)
      return response.data
    } catch (error) {
      if (error.response) {
        //console.log(error.response.data)
        //console.log(error.response.status)
        //console.log(error.response.headers)
      } else if (error.request) {
        //console.log(error.request)
      } else {
        //console.log('Error', error.message)
      }
      //console.log(error)
    }
  }
export const createRegisterCalendar = async (registerCalendar) => {
  try {
    const response = await request.post('/RegisterCalendar/AddRegisterCalendar', registerCalendar)
    //console.log(registerCalendar)
    return response.data
  } catch (error) {
    if (error.response) {
      //console.log(error.response.data)
      //console.log(error.response.status)
      //console.log(error.response.headers)
    } else if (error.request) {
      //console.log(error.request)
    } else {
      //console.log('Error', error.message)
    }
    //console.log(error)
  }
}
export const CheckRegisterCalendar = async (id) => {
  try {
    const response = await request.get(`/RegisterCalendar/CheckRegisterCalendar/${id}`)
    //console.log(response)
    return response.data
  } catch (error) {
    if (error.response) {
      //console.log(error.response.data)
      //console.log(error.response.status)
      //console.log(error.response.headers)
    } else if (error.request) {
      //console.log(error.request)
    } else {
      //console.log('Error', error.message)
    }
    //console.log(error)
  }
}
export const updateRegisterCalendar = async (id, registerCalendar) => {
  try {
    const response = await request.put(`/RegisterCalendar/UpdateRegisterCalendar/${id}`, registerCalendar)
    //console.log(registerCalendar)
    return response.data
  } catch (error) {
    if (error.response) {
      //console.log(error.response.data)
      //console.log(error.response.status)
      //console.log(error.response.headers)
    } else if (error.request) {
      //console.log(error.request)
    } else {
      //console.log('Error', error.message)
    }
    //console.log(error)
  }
}
export const deleteRegisterCalendar = async (id) => {
  try {
    const response = await request.delete(`/RegisterCalendar/DeleteRegisterCalendar/${id}`)
    return response.data
  } catch (error) {
    if (error.response) {
      //console.log(error.response.data)
      //console.log(error.response.status)
      //console.log(error.response.headers)
    } else if (error.request) {
      //console.log(error.request)
    } else {
      //console.log('Error', error.message)
    }
    //console.log(error)
  }
}
