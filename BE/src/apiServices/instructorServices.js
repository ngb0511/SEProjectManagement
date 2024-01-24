import request from '../utils/request'

export const getInstructor = async () => {
  try {
    const response = await request.get('/Instructor/GetAll')
    // Success 🎉
    //console.log(response)
    return response.data
  } catch (error) {
    if (error.response) {
    } else if (error.request) {
    } else {
    }
  }
}
export const createInstructor = async (instructor) => {
  try {
    const response = await request.post('/Instructor/AddInstructor', instructor)
    //console.log(instructor)
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
export const getInstructorbyID = async (id) => {
  try {
    const response = await request.get(`/Instructor/GetInstructorByID/${id}`)
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

export const GetInstructorByAccount = async (id) => {
  try {
    const response = await request.get(`Instructor/GetInstructorByAccount/${id}`)
    return response.data
  } catch (error) {
    if (error.response) {
    } else if (error.request) {
    } else {
    }
  }
}

export const updateInstructor = async (id, instructor) => {
  try {
    const response = await request.put(`/Instructor/UpdateInstructor/${id}`, instructor)
    //console.log(instructor)
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
export const deleteInstructor = async (id) => {
  try {
    const response = await request.delete(`/Instructor/DeleteInstructor/${id}`)
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
