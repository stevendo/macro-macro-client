import apiUrl from '../apiConfig'
import axios from 'axios'

// GET Food Index
// ==============
export const foodIndex = (user) => {
  return axios({
    url: apiUrl + '/foods/',
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// GET Food Detail
// ===============
export const foodDetail = (user, foodId) => {
  return axios({
    url: apiUrl + `/foods/${foodId}`,
    method: 'GET',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// POST Food
// ========
export const foodCreate = (user, data) => {
  console.log(user, 'food api user')
  return axios({
    method: 'POST',
    url: apiUrl + '/foods/',
    headers: {
      'Authorization': `Token ${user.data.token}`
    },
    data: data
  })
}

// DELETE Food
// ===========
export const foodDelete = (user, id) => {
  return axios({
    url: apiUrl + `/foods/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token ${user.data.token}`
    }
  })
}

// PATCH Food
// ===========
export const foodEdit = (formData, foodId, user) => {
  console.log(formData, 'wut is form data')
  return axios({
    url: apiUrl + `/foods/${foodId}/`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token ${user.data.token}`
    },
    data: {
      food: formData
    }
  })
}
