import AxiosInstance from '@/api/axios'

export const getrolesService = async () => {
  try {
    const response = await AxiosInstance.get(`/role/getroles`)
    return response.data
  } catch (e) {
    return e
  }
}
