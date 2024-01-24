import request from '../utils/request'

export const getProject = async () => {
  try {
    const response = await request.get('/Project/GetAll')
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
export const GetYearOfProject = async () => {
  try {
    const response = await request.get('/Project/GetYearOfProject')
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
export const GetProjectsByYearAndSemesterAndSubject = async (object) => {
  try {
    const response = await request.get(`/Project/GetProjectsByYearAndSemesterAndSubject?semester=${object.semester}&year=${object.year}&subjectID=${object.subjectId}`)
    return response.data
  } catch (error) {
    if (error.response) {
    } else if (error.request) {
    } else {
    }
  }
}
export const createProject = async (project) => {
  try {
    const response = await request.post('/Project/AddProject', project)
    //console.log(project)
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
export const GetProjectForInstructor = async (projectForInstructor) => {
  try {
    const response = await request.get(`/Project/GetProjectForInstructor?semester=${projectForInstructor.semester}&year=${projectForInstructor.year}&instructorId=${projectForInstructor.instructorId}`)
    return response.data
  } catch (error) {
    if (error.response) {
    } else if (error.request) {
    } else {
    }
  }
}
export const getProjectbyID = async (id) => {
  try {
    const response = await request.get(`/Project/GetProjectByID/${id}`)
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
export const CheckProjectExist = async (id) => {
  try {
    const response = await request.get(`/Project/CheckProjectExist/${id}`)
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
export const GetCurrentProject = async (id) => {
  try {
    const response = await request.get(`/Project/GetCurrentProject/${id}`)
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
export const getProjectbyStudent = async (id) => {
  try {
    const response = await request.get(`/Project/GetProjectByStudentID/${id}`)
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
export const getProjectbyInstructor = async (id) => {
  try {
    const response = await request.get(`/Project/GetProjectByInstructorID/${id}`)
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
export const updateProject = async (id, project) => {
  try {
    const response = await request.put(`/Project/UpdateProject/${id}`, project)
    //console.log(project)
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
export const deleteProject = async (id) => {
  try {
    const response = await request.delete(`/Project/DeleteProject/${id}`)
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
