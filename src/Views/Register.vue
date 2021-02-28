<template>
  <div class="container">
    <alert v-if="registrationFailed">An error occured while registration</alert>
    <form @submit.prevent="register()">
      <div class="form-group">
        <label for="login">Login</label>
        <input
          :class="{ 'is-invalid': errors.login && dirty.login }"
          @change="emitLogin()"
          v-model="login"
          type="text"
          name="login"
          id="login"
          class="form-control"
        />
        <div class="invalid-feedback d-block" :class="{ 'text-danger': errors.login && dirty.login }" v-if="errors.login && dirty.login">
          The login is required
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          :class="{ 'is-invalid': errors.password && dirty.password }"
          @change="emitPassword"
          v-model="password"
          type="password"
          name="password"
          id="password"
          class="form-control"
        />
        <div :class="{ 'text-danger': errors.password && dirty.password }" v-if="errors.password && dirty.password">
          The password is required
        </div>
      </div>
      <div class="form-group">
        <label for="birthYear">Birth Year</label>
        <input
          :class="{ 'is-invalid': errors.birthYear && dirty.birthYear }"
          @change="emitBirthYear()"
          v-model.number="birthYear"
          type="number"
          name="birthYear"
          id="birthYear"
          class="form-control"
        />
        <div :class="{ 'text-danger': errors.birthYear && dirty.birthYear }" v-if="errors.birthYear && dirty.birthYear">
          The birth year is required
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Let's go!</button>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { UserModel } from '@/models/UserModel';
import { useUserService } from '@/composables/UserService';
import { RegistrationResponse } from '@/models/RegistrationResponse';
import Alert from '@/components/Alert.vue';

export default defineComponent({
  name: 'Register',

  components: { Alert },

  setup() {
    const userCredentials = ref<RegistrationResponse | null>(null);
    const userService = useUserService();
    const registrationFailed = ref<boolean>(false);

    const userModel = reactive({
      login: '',
      password: '',
      birthYear: new Date().getFullYear() - 18
    });

    const errors = computed(() => {
      const errors: Partial<Record<keyof UserModel, boolean>> = {};

      if (!userModel.login) {
        errors.login = true;
      }
      if (!userModel.password) {
        errors.password = true;
      }
      if (!userModel.birthYear) {
        errors.birthYear = true;
      }
      return errors;
    });

    const dirty = reactive<{ [K in keyof UserModel]: boolean }>({
      login: false,
      password: false,
      birthYear: false
    });

    const emitLogin = () => {
      dirty.login = true;
    };

    const emitPassword = () => {
      dirty.password = true;
    };

    const emitBirthYear = () => {
      dirty.birthYear = true;
    };

    async function register() {
      try {
        userCredentials.value = await userService.register(userModel);
      } catch (error) {
        registrationFailed.value = true;
      }
    };

    return { ...toRefs(userModel), register, errors, dirty, emitLogin, emitPassword, emitBirthYear };
  }
});
</script>
