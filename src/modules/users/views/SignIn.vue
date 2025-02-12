<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/modules/users/store/userStore'
import { push } from 'notivue'

const MainSpiner = defineAsyncComponent(() => import('@/components/commons/MainSpinner.vue'))
const MainForm = defineAsyncComponent(() => import('@/components/form/MainForm.vue'))
const InputField = defineAsyncComponent(() => import('@/components/form/InputField.vue'))
const SelectField = defineAsyncComponent(() => import('@/components/form/SelectField.vue'))
const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))
const userStore = useUserStore()

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
    password: yup.string().required('contraseña requerida').trim().min(6, 'Contraseña muy corta'),
    repassword: yup
      .string()
      .required('repetir contraseña requerida')
      .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
    email: yup.string().email('Debe ser un correo valido').required('Email requerido').trim(),
    rol: yup.string().required('Rol requerido').oneOf(['admin', 'tech', 'client'], 'Rol invalido'),
  }),
})

const [name] = defineField('name')
const [ci] = defineField('ci')
const [email] = defineField('email')
const [rol] = defineField('rol')
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
</script>

<template>
  <div class="w-full h-full flex items-center justify-center bg-primary-light/10">
    <div class="w-3/4 p-5 rounded-md shadow-xl bg-white">
      <h1 class="text-2xl text-center mb-5 mt-20">Registro de Usuario</h1>
      <MainForm @submit="onSubmit" :cols="2" id="form" class="w-full pt-2 pb-16 px-16 rounded-md">
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
            v-model="rol"
            name="rol"
            label="rol"
            :options="[
              { value: 'admin', label: 'Administrador' },
              { value: 'tech', label: 'Tecnico' },
              { value: 'client', label: 'Usuario' },
            ]"
            :error="errors.rol"
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
            :full-size="true"
            title="Iniciar Sesion"
            @click="onSubmit"
            class="col-span-2 text-center my-5 cursor-pointer"
          >
            <MainSpiner class="ml-[-15px]" />
          </submitButton>
        </template>
      </MainForm>
    </div>
  </div>
</template>

<style scoped lang="css"></style>
