import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  updateUserService,
  userListService,
  deleteUserService,
  signUpService,
} from '@/services/userServices'

import { useMainStore } from '@/stores/mainStore'

export const useUserStore = defineStore('user', () => {
  const mainStore = useMainStore()
  // =======================> STATE

  const usersList = ref([]) //lista de usuarios

  // =======================> SETTERS
  const signUp = async (form: object) => {
    const data = await signUpService(form)
    if (data.savedUser) return '200'
    else if (data.response) {
      return '403'
    } else {
      return '500'
    }
  }

  const setUserList = async () => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { paginatedData } = await userListService(mainStore.getPage.toString())

    if (paginatedData && paginatedData.users.length > 0) {
      if (paginatedData && paginatedData.paginator) {
        mainStore.showPagination = true
        mainStore.setPage(paginatedData.paginator.currentPage)
        mainStore.setPerPages(paginatedData.paginator.perPage)
        mainStore.setTotalPages(paginatedData.paginator.totalPages)
      }

      usersList.value = paginatedData.users
      return '200'
    } else return '500'
  }

  const updateUser = async (userId: object) => {
    const data = await updateUserService(userId)
    console.log(data)
    if (data.updatedUser) {
      setUserList()
      return '200'
    }
    //goint this bloq if user error
    else if (data.response) {
      console.log(data.response)
      return '403'
    }
    //goint this bloq if server error
    else {
      return '500'
    }
  }

  const deleteUser = async (userId: string) => {
    const data = await deleteUserService(userId)
    if (data.deletedUser) {
      setUserList()
      return '200'
    }
    //goint this bloq if user error
    else if (data.response) {
      return '403'
    }
    //goint this bloq if server error
    else {
      return '500'
    }
  }

  const $reset = () => {
    usersList.value = [] //lista de usuarios
  }
  // =======================> GETTERS

  return {
    usersList,
    setUserList,
    updateUser,
    deleteUser,
    signUp,
    $reset,
    getUserList: computed(() => usersList.value),
  }
})
