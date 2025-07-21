import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

axios.interceptors.request.use(function (config) {
  config.baseURL = import.meta.env.VITE_API_BASE_URL || '/api'

  const accessToken = localStorage.getItem('auth_token')

  config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : null
  
  return config
}, function (error) {
  console.log('error', error)

  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (error.response.status === 401 && error.response.data.message == "Unauthenticated.") {
    toast.error("Unauthenticated", {
      autoClose: 3000,
      theme: 'colored',
    })

    // useCookie('accessToken').value = null
    localStorage.clear()
    window.location.href = '/'
  }

  // Do something with response error
  return Promise.reject(error)
})

export default axios
