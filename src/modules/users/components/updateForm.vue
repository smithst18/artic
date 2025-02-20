<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUpdated, ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/modules/users/store/userStore'
import { push } from 'notivue'

const props = defineProps<{
  id: string
}>()

const MainForm = defineAsyncComponent(() => import('@/components/form/MainForm.vue'))
const InputField = defineAsyncComponent(() => import('@/components/form/InputField.vue'))
const SelectField = defineAsyncComponent(() => import('@/components/form/SelectField.vue'))
const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))
const FormSkeleton = defineAsyncComponent(() => import('@/components/skeletons/FormSkeleton.vue'))
const userStore = useUserStore()
const userId = ref(props.id)

const { errors, defineField, handleSubmit, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Nombre requerido').max(50, 'Nombre Demasialo largo').trim(),

    ci: yup
      .string()
      .required('Cedula de indentidad requerida')
      .min(6, 'Cedula muy corta')
      .max(9, 'Cedula muy larga')
      .matches(/^[0-9]+$/, 'Cedula invalida')
      .trim(),

    email: yup.string().email('Debe ser un correo valido').required('Email requerido').trim(),

    role: yup.number().required('Rol requerido'),

    password: yup.string().required('contraseña requerida').trim().min(6, 'Contraseña muy corta'),

    repassword: yup
      .string()
      .required('repetir contraseña requerida')
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),

    office: yup.number().required('Departamento requerido'),

    position: yup.number().required('Cargo requerido'),
  }),
})

const [name] = defineField('name')
const [ci] = defineField('ci')
const [email] = defineField('email')
const [role] = defineField('role')
const [office] = defineField('office')
const [position] = defineField('position')
const [password] = defineField('password')
const [repassword] = defineField('repassword')

const onSubmit = handleSubmit(async (values) => {
  const notification = push.promise({
    title: 'Esperanda',
    message: 'Creando Usuario...',
  })
  try {
    const response = await userStore.signUp(values)

    console.log(response)
    if (response == '200') {
      notification.resolve({
        title: 'Usuario Creado',
        message: 'El usuario ha sido creado Exitosamente!',
      })
      resetForm()
    } else if (response == '403')
      return notification.reject({
        title: 'Ha ocurrido un error',
        message: 'El usuario ya ha sido registrado previamente!',
      })
    else
      notification.reject({
        title: 'Ha ocurrido un error',
        message: 'Error Inexperado del servidor!',
      })
  } catch (err: unknown) {
    notification.reject('Ha ocurrido un error inesperado.')
    console.log(err)
  }
})

const deleteUser = async () => {
  console.log('user deleted id : ', userId)
}
onUpdated(async () => {
  await userStore.setPickedUser(Number(props.id))
  resetForm({
    values: {
      ...userStore.pickedUser,
      role: userStore.pickedUser.role.id,
      office: userStore.pickedUser.position.id,
      position: userStore.pickedUser.position.id,
    },
  })
})
onMounted(async () => {
  await userStore.setFormEntitys()
})
</script>

<template>
  <FormSkeleton v-if="userStore.pickedUser.id <= 0" class="w-[500px]" />
  <MainForm @submit="onSubmit" :cols="2" id="form" class="w-full" v-else>
    <template v-slot:content>
      <InputField
        v-model="name"
        type="text"
        name="name"
        autocomplete="name"
        label="nombre"
        :error="errors.name"
      />
      <InputField
        v-model="ci"
        type="text"
        name="ci"
        autocomplete="off"
        label="cedula"
        :error="errors.ci"
      />
      <InputField
        v-model="email"
        type="text"
        name="email"
        autocomplete="email"
        label="email"
        :error="errors.email"
      />
      <SelectField
        v-model="role"
        name="role"
        label="role"
        :options="userStore.getRoleList"
        :error="errors.role"
      />
      <SelectField
        v-model="office"
        name="office"
        label="Departamento"
        :options="userStore.getOfficeList"
        :error="errors.office"
      />
      <SelectField
        v-model="position"
        name="position"
        label="Cargo"
        :options="userStore.getpositionList"
        :error="errors.position"
      />
      <InputField
        v-model="password"
        type="text"
        name="password"
        autocomplete="off"
        label="contraseña"
        :error="errors.password"
      />
      <InputField
        v-model="repassword"
        type="text"
        name="repassword"
        autocomplete="off"
        label=" repetir contraseña"
        :error="errors.repassword"
      />
      <submitButton
        @click="deleteUser"
        type="button"
        :full-size="false"
        title="borrar"
        class="text-center my-5 bg-red-400 hover:bg-red-300 active:bg-red-300 focus:ring-red-300"
      >
      </submitButton>
      <submitButton
        type="submit"
        :full-size="true"
        title="Guardar"
        class="text-center my-5 cursor-pointer"
      >
      </submitButton>
      <div class="col-span-2"></div>
    </template>
  </MainForm>
</template>

<style scoped lang="scss"></style>
