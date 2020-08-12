import apiUrl from '../apiConfig'
import axios from 'axios'

// GET Logs Index
// ==============
export const logIndex = (user) => {
  return axios({
    url: apiUrl + '/logs/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// GET Logs by Day
// ===============
export const logByDay = (user, year, month, day) => {
  return axios({
    url: apiUrl + `/logs/${year}/${month}/${day}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// GET Log Detail
// ===============
export const logDetail = (user, logId) => {
  return axios({
    url: apiUrl + `/logs/${logId}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// POST Log
// ========
export const logCreate = (user, data) => {
  console.log(user, 'log api user')
  return axios({
    method: 'POST',
    url: apiUrl + '/logs/',
    headers: {
      'Authorization': `Token ${user.data.token}`
    },
    data: {
      log: data
    }
  })
}

// DELETE Log
// ===========
export const logDelete = (user, id) => {
  return axios({
    url: apiUrl + `/logs/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// PATCH Log
// ===========
export const logEdit = (formData, logId, user) => {
  console.log(formData, 'wut is form data')
  return axios({
    url: apiUrl + `/logs/${logId}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.data.token}`
    },
    data: {
      log: formData // log? food? wut?
    }
  })
}
