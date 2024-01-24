import request from '../utils/request'

export const getTopicDetail = async () => {
  try {
    const response = await request.get('/TopicDetail/GetAll')
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
export const createTopicDetail = async (topicDetail) => {
  try {
    const response = await request.post('/TopicDetail/AddTopicDetail', topicDetail)
    //console.log(topicDetail)
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
export const getTopicDetailbyID = async (id) => {
  try {
    const response = await request.get(`/TopicDetail/GetTopicDetailByID/${id}`)
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
export const getTopicDetailbytagID = async (id) => {
  try {
    const response = await request.get(`/TopicDetail/GetTopicDetailByTag/${id}`)
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
export const updateTopicDetail = async (id, topicDetail) => {
  try {
    const response = await request.put(`/TopicDetail/UpdateTopicDetail/${id}`, topicDetail)
    //console.log(topicDetail)
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
export const deleteTopicDetail = async (id) => {
  try {
    const response = await request.delete(`/TopicDetail/DeleteTopicDetail/${id}`)
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
