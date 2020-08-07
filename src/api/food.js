import apiUrl from '../apiConfig'
import axios from 'axios'

// Add Food
// ========
export const foodCreate = (data, user) => {
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
