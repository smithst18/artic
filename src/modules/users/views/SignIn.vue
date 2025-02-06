<script setup lang="ts">
import { ref, reactive } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const MainSpiner = defineAsyncComponent(() => import('@/components/commons/MainSpinner.vue'))
const MainForm = defineAsyncComponent(() => import('@/components/form/MainForm.vue'))
const InputField = defineAsyncComponent(() => import('@/components/form/InputField.vue'))
const submitButton = defineAsyncComponent(() => import('@/components/commons/MainButton.vue'))

const { values, errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    ci: yup.string().required('Cedula de indentidad requerida'),
    password: yup.string().required('contraseña requerida').trim(),
  }),
})

const [ci] = defineField('ci')
const [password] = defineField('password')
const formData = reactive({ ci: '', password: '' })
const showPassword = ref(false)

// FUNCTIONS
const handleShowPassword = () => (showPassword.value = !showPassword.value)

const onSubmit = handleSubmit(async (values) => {
  alert('form enviado')
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center bg-primary-light/10">
    <div class="w-3/4 p-5 rounded-md shadow-xl bg-white">
      <h1 class="text-2xl text-center mb-5 mt-20">Registro de Usuario</h1>
      <MainForm @submit="onSubmit" :cols="2" id="form" class="w-full pt-2 pb-16 px-16 rounded-md">
        <template v-slot:content>
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="nombre"
            :error="errors.ci"
          />
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="cedula"
            :error="errors.ci"
          />
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="email"
            :error="errors.ci"
          />
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="permisos"
            :error="errors.ci"
          />
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="contraseña"
            :error="errors.ci"
          />
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="contraseña"
            :error="errors.ci"
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
