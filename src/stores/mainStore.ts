import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { logInService } from '@/services/userService'
import { useCookies } from 'vue3-cookies'
import type { userPayloadI } from '@/interfaces/userInterface'
import { useRouter } from 'vue-router'

export const useMainStore = defineStore('main', () => {
  // =======================================> STATES
  const router = useRouter()
  const { cookies } = useCookies()
  //esta propiedad es usada para hacer las busquedas en el componente searchBar
  const search = ref('')
  const isLoged = ref<boolean>(false)
  const logedUser = ref<userPayloadI>({
    id: 0,
    name: '',
    ci: '',
    role: '',
    email: '',
  })
  //propertys para las tablas y paginacion
  const page = ref(1) // pagina en la que comienza la pagination
  const totalPages = ref(0) //numero de paginas
  const perPage = ref(0)
  const totalResults = ref(0)
  const showPagination = ref(true)
  const pagingCounter = ref(0)

  //properti para las resp
  const requestIsLoading = ref(false)
  // =======================================> GETTERS

  // =======================================> ACTIONS
  const logIn = async (form: object) => {
    try {
      const data = await logInService(form)
      if (data.token) {
        //save the token in the cookies for the axios interceptor
        cookies.set('token', data.token, 60 * 60 * 12)
        //send the request again with the token in the header
        const payload = await logInService(form)
        // we get the payload of the user information and save it in the cookies for use it lately
        cookies.set('user', JSON.stringify(payload.user), payload.user.exp - payload.user.iat)
        //redirect to home view
        logedUser.value = payload.user
        isLoged.value = true
        return '200'
      }
      //goint this bloq if user error
      else if (data.response) {
        //set spinner in loggin vue  to false
        requestIsLoading.value = false
        return '401'
      }
      //goint this bloq if server error
      else {
        console.error(data)
        //set spinner in loggin vue to false
        requestIsLoading.value = false
        return '500'
      }
    } catch (err) {
      console.log(err)
    }
  }

  const logOut = () => {
    $reset()
    router.push({ name: 'login' })
  }

  const changeRequestStatus = (value: boolean) => {
    requestIsLoading.value = value
  }

  // autoinvoqued functions
  //this function have to validate if the token exp is valid then it would save the cookies data in the state of the store
  //fuction for reset the store

  const $resetPaginator = () => {
    page.value = 1 // pagina en la que comienza la pagination
    totalPages.value = 0 //numero de paginas
    perPage.value = 0
  }

  const $reset = () => {
    isLoged.value = false
    logedUser.value = {
      id: 0,
      name: '',
      ci: '',
      role: '',
      email: '',
    }
    search.value = ''
    page.value = 0 // pagina en la que comienza la pagination
    totalPages.value = 0 //numero de paginas
    perPage.value = 0

    cookies.remove('user')
    cookies.remove('token')
  }

  ;(function () {
    function isUserCookie(obj: unknown): obj is userPayloadI {
      if (typeof obj !== 'object' || obj === null) return false

      const requiredKeys: (keyof userPayloadI)[] = ['id', 'name', 'ci', 'role', 'email']

      return requiredKeys.every(
        (key) => key in obj && typeof (obj as Record<string, unknown>)[key] === 'string',
      )
    }

    // Obtener y verificar la cookie
    const userCookie = cookies.get('user')

    if (isUserCookie(userCookie)) {
      try {
        // Convertir y validar tipos
        const userId = Number(userCookie.id)
        if (isNaN(userId)) throw new Error('ID de usuario inválido')

        const parsedUser: userPayloadI = {
          id: userId,
          name: userCookie.name,
          ci: userCookie.ci,
          role: userCookie.role,
          email: userCookie.email,
        }

        // Actualizar estado
        isLoged.value = true
        logedUser.value = parsedUser
      } catch (err) {
        console.error('Error al procesar la cookie:', err)
        // Opcional: limpiar cookie inválida
        cookies.remove('user')
      }
    } else {
      console.log('No hay usuario autenticado')
    }
  })()

  return {
    logedUser,
    isLoged,
    requestIsLoading,
    search,
    showPagination,
    logIn,
    logOut,
    setRequestLoaderStatus: (value: boolean) => (requestIsLoading.value = value),
    setPage: (value: number) => (page.value = value),
    setPerPages: (value: number) => (perPage.value = value),
    setTotalPages: (value: number) => (totalPages.value = value),
    setTotalresults: (value: number) => (totalResults.value = value),
    setPagingCounter: (value: number) => (pagingCounter.value = value),
    nextPage: () => (page.value = page.value + 1),
    prevPage: () => (page.value = page.value - 1),
    $reset,
    $resetPaginator,
    getPage: computed(() => page.value),
    getPerPages: computed(() => perPage.value),
    getTotalPages: computed(() => totalPages.value),
    getTotalResults: computed(() => totalResults.value),
    getPagingCounter: computed(() => pagingCounter.value),
    getSearch: computed(() => search.value),
    changeRequestStatus,
  }
})
