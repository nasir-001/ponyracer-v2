<template>
  <div class="container">
    <Alert :variant="danger" v-if="authenticationFailed" class="mt-4" @dismissed="authenticationFailed = false" dismissible
      >Nope, try again</Alert
    >
    <Form @submit="authenticate($event)" v-slot="{ meta: formMeta }">
      <Field name="login" rules="required" v-slot="{ field, meta }">
        <div class="form-group">
          <label :class="{ 'text-danger': meta.dirty && !meta.valid }" for="login-input">Login</label>
          <input :class="{ 'is-invalid': meta.dirty && !meta.valid }" id="login-input" class="form-control" v-bind="field" />
          <ErrorMessage name="login" class="invalid-feedback" />
        </div>
      </Field>
      <Field name="password" rules="required" v-slot="{ field, meta }">
        <div class="form-group">
          <label :class="{ 'text-danger': meta.dirty && !meta.valid }" for="password-input">Password</label>
          <input
            :class="{ 'is-invalid': meta.dirty && !meta.valid }"
            type="password"
            id="password-input"
            class="form-control"
            v-bind="field"
          />
          <ErrorMessage name="password" class="invalid-feedback" />
        </div>
      </Field>
      <button class="btn btn-primary" :class="{ disabled: !formMeta.valid }" type="submit">Let's go</button>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import '@/forms';
import { Form, Field } from 'vee-validate';
import { AuthenticateModel } from '@/models/UserModel';
import { RegistrationResponse } from '@/models/RegistrationResponse';
import { useUserService } from '@/composables/UserService';
import Alert from '@/components/Alert.vue';
import router from '@/router';

export default defineComponent({
  name: 'Login',

  components: {
    Form,
    Field,
    Alert
  },

  setup() {
    const loginCresentials = ref<RegistrationResponse | null>(null);
    const userService = useUserService();
    const authenticationFailed = ref<boolean>(false);

    async function authenticate(loginDetails: AuthenticateModel) {
      try {
        loginCresentials.value = await userService.authenticate(loginDetails);
        if (loginCresentials.value) {
          router.push({ name: 'home' });
        }
      } catch (error) {
        authenticationFailed.value = true;
      }
    }

    return { authenticate, authenticationFailed };
  }
});
</script>
