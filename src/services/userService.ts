import AxiosInstance from '@/api/axios'

export const logInService = async (form: object) => {
  try {
    const response = await AxiosInstance.post('/login', form)
    return response.data
  } catch (e: unknown) {
    console.log(e)
    return e
  }
}

export const signUpService = async (form: object) => {
  try {
    const response = await AxiosInstance.post('/signup', form)
    return response.data
  } catch (e) {
    return e
  }
}

export const getOneUserService = async (id: number) => {
  try {
    const response = await AxiosInstance.get(`/users/${id}`)
    return response.data
  } catch (e) {
    return e
  }
}

export const getUsersListService = async (page: string, filter: string = '') => {
  try {
    const response = await AxiosInstance.get(`/users-list/${page}/${filter}`)
    return response.data
  } catch (e) {
    return e
  }
}

export const updateUserService = async (form: object) => {
  try {
    const response = await AxiosInstance.put('/users', form)
    return response.data
  } catch (e) {
    return e
  }
}

export const deleteUserService = async (id: number) => {
  try {
    const response = await AxiosInstance.delete(`/users/${id}`)
    return response.data
  } catch (e) {
    return e
  }
}
