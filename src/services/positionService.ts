import AxiosInstance from '@/api/axios'

export const getPositionsService = async () => {
  try {
    const response = await AxiosInstance.get(`/position/getpositions`)
    return response.data
  } catch (e) {
    return e
  }
}
