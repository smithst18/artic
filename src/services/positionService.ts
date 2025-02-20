import AxiosInstance from '@/api/axios'

export const getPositionsService = async () => {
  try {
    const response = await AxiosInstance.get(`/positions/positions-list`)
    return response.data
  } catch (e) {
    return e
  }
}
