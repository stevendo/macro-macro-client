import apiUrl from '../apiConfig'
import axios from 'axios'

// Add Food
// ========
export const addFood = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/foods/',
    headers: {
      'Authorization': `Token ${user.token}`
    },
    data: data
  })
}
