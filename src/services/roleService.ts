import AxiosInstance from '@/api/axios'

export const getrolesService = async () => {
  try {
    const response = await AxiosInstance.get(`/roles/roles-list`)
    return response.data
  } catch (e) {
    return e
  }
}
