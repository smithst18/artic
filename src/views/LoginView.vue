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
const error = ref(false)
const apiServerError = ref(false)

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
  <div class="h-screen w-screen flex items-center justify-center" id="login">
    <div
      class="sm:w-full md:w-[50%] lg:w-[30%] sm: md: lg: bg-white flex flex-col justify-center items-center rounded shadow-xl"
    >
      <!-- LOGO -->
      <div class="w-[50%] mx-auto mt-5">
        <img src="@/assets/imgs/arctic.webp" alt="SGTI logo" class="w-full h-auto" />
      </div>
      <MainForm
        @submit="onSubmit"
        :cols="1"
        id="form"
        class="w-full pt-2 pb-16 px-16 bg-white rounded-md"
      >
        <template v-slot:content>
          <p class="text-center text-2xl text-primary my-8">Inicia sesión en tu cuenta</p>
          <InputField
            v-model="ci"
            type="text"
            name="ci"
            autocomplete="username"
            label="Cedula"
            :error="errors.ci"
          />
          <InputField
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            autocomplete="current-password"
            label="contraseña"
            :error="errors.password"
          >
            <transition name="fade">
              <span
                class="material-symbols-outlined absolute top-2.5 right-3 cursor-pointer text-primary"
                @click="handleShowPassword"
                v-if="showPassword"
              >
                visibility
              </span>
            </transition>
            <transition name="fade">
              <span
                class="material-symbols-outlined absolute top-2.5 right-3 cursor-pointer text-primary"
                @click="handleShowPassword"
                v-if="!showPassword"
              >
                visibility_off
              </span>
            </transition>
          </InputField>
          <span class="text-sm text-green-400 text-opacity-90 text-center mb-3"
            >Sesion Iniciada</span
          >
          <span class="text-sm text-red-400 text-opacity-90 text-center"
            >Usuario o contraseña invalidos</span
          >
          <span class="text-sm text-red-400 text-opacity-90 text-center"
            >Error en la Conexion con Servidor</span
          >
          <submitButton
            :full-size="true"
            title="Iniciar Sesion"
            @click="onSubmit"
            class="mt-10 h-12"
          >
            <MainSpiner class="ml-[-15px]" />
          </submitButton>
        </template>
      </MainForm>
    </div>
  </div>
</template>

<style scoped lang="css">
#login {
  background-image: url('../assets/imgs/loginBackground.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
