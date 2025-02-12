import AxiosInstance from '@/api/axios'

export const getOfficeService = async () => {
  try {
    const response = await AxiosInstance.get(`/office/getoffices`)
    return response.data
  } catch (e) {
    return e
  }
}
