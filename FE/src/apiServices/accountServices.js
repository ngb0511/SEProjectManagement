import request from '../utils/request'

export const getAccount = async () => {
  try {
    const response = await request.get('/Account/getAll')
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
export const createAccount = async (account) => {
  try {
    const response = await request.post('/Account/AddAccount', account)
    //console.log(account)
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

export const checkAccount = async (account) => {
  try {
    const response = await request.post('/Account/CheckAccount', account)
    //console.log(account)
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

export const getAccountbyID = async (id) => {
  try {
    const response = await request.get(`/Account/GetAccountByID/${id}`)
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

export const GetAccountByEmail = async (email) => {
  try {
    const response = await request.get(`/Account/GetAccountByEmail/${email}`)
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

export const updateAccount = async (id, account) => {
  try {
    const response = await request.put(`/Account/UpdateAccount/${id}`, account)
    //console.log(account)
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
export const deleteAccount = async (id) => {
  try {
    const response = await request.delete(`/Account/DeleteAccount/${id}`)
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
