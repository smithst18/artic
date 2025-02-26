import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMainStore } from '@/stores/mainStore'
import type { userI } from '@/interfaces/userInterface'
import type { RoleI } from '@/interfaces/roleI'
import type { OfficeI } from '@/interfaces/officeI'
import type { PositionI } from '@/interfaces/positionI'

import {
  updateUserService,
  getUsersListService,
  deleteUserService,
  signUpService,
  getOneUserService,
} from '@/services/userService'
import { getOfficeService } from '@/services/officeService'
import { getrolesService } from '@/services/roleService'
import { getPositionsService } from '@/services/positionService'

export const useUserStore = defineStore('user', () => {
  const mainStore = useMainStore()
  // =======================> STATE
  const pickedUser = ref<userI>({
    id: 0,
    ci: '',
    email: '',
    name: '',
    office: { id: 0, name: '' },
    position: { id: 0, name: '' },
    role: { id: 0, name: '' },
  })
  const userListFilter = ref<string>('')
  const usersList = ref<userI[]>([]) //lista de usuarios
  const rolesList = ref<RoleI[]>([]) //lista de roles
  const officesList = ref<OfficeI[]>([]) //lista de roles
  const positionsList = ref<PositionI[]>([]) //lista de roles

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

  const setPickedUser = async (id: number) => {
    const { data } = await getOneUserService(id)
    if (data) {
      pickedUser.value = data
      return '200'
    } else return '500'
  }

  const setUserList = async () => {
    //lamamos esta funcion cuando se monta el componente para cargar la tabla y steamos todos los valores
    const { data, meta } = await getUsersListService(
      mainStore.getPage.toString(),
      userListFilter.value,
    )
    if (data && meta) {
      mainStore.showPagination = true
      mainStore.setPage(meta.page)
      mainStore.setPerPages(meta.limit)
      mainStore.setTotalPages(meta.totalPages)

      usersList.value = data
      return '200'
    } else return '500'
  }

  const updateUser = async (userId: object) => {
    const data = await updateUserService(userId)
    if (data.updatedUser) {
      pickedUser.value = data.updatedUser
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

  const deleteUser = async (userId: number) => {
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

  const setRolesList = async () => {
    try {
      const { data } = await getrolesService()
      if (data && data.length > 0) {
        rolesList.value = data
      }
    } catch (e: unknown) {
      console.error('Error at set roles:', e) // Mensaje corregido
      throw e // Propaga el error para que Promise.all lo detecte
    }
  }

  const setOfficesList = async () => {
    try {
      const { data } = await getOfficeService()
      if (data && data.length >= 1) {
        officesList.value = data
      }
    } catch (e: unknown) {
      console.error('Error at set offices:', e) // Mensaje corregido
      throw e // Propaga el error
    }
  }

  const setPositionsList = async () => {
    try {
      const { data } = await getPositionsService()
      if (data && data.length > 0) {
        positionsList.value = data
      }
    } catch (e: unknown) {
      console.error('Error at set positions:', e) // Mensaje corregido
      throw e // Propaga el error
    }
  }

  //this function is to set the form entitys roles positions and offices
  const setFormEntitys = async (): Promise<boolean> => {
    try {
      // Ejecutar todas las promesas en paralelo
      await Promise.all([setRolesList(), setOfficesList(), setPositionsList()])
      return true
    } catch (e: unknown) {
      console.error('Error al obtener datos de la API:', e)
      return false
    }
  }
  const $reset = () => {
    usersList.value = [] //lista de usuarios
    rolesList.value = []
    officesList.value = []
    positionsList.value = []
    pickedUser.value = {
      id: 0,
      ci: '',
      email: '',
      name: '',
      office: { id: 0, name: '' },
      position: { id: 0, name: '' },
      role: { id: 0, name: '' },
    }
  }
  // =======================> GETTERS
  const getOneUser = computed(() => {
    return (id: string) => usersList.value.find((elm) => elm.id === Number(id))
  })

  return {
    usersList,
    pickedUser,
    userListFilter,
    setListFilter: (value: string) => (userListFilter.value = value),
    setPickedUser,
    setUserList,
    updateUser,
    deleteUser,
    signUp,
    setFormEntitys,
    $reset,
    getUserList: computed(() => usersList.value),
    getOneUser,
    getOfficeList: computed(() =>
      officesList.value.map((office) => ({ value: office.id, label: office.name })),
    ),
    getRoleList: computed(() =>
      rolesList.value.map((role) => ({ value: role.id, label: role.name })),
    ),
    getpositionList: computed(() =>
      positionsList.value.map((position) => ({ value: position.id, label: position.name })),
    ),
  }
})
