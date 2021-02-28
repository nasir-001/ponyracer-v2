<template>
  <div class="container">
    <Alert :variant="danger" v-if="registrationFailed" class="mt-4" @dismissed="registrationFailed = false" dismissible
      >Nope, try again</Alert
    >
    <Form @submit="register($event)" v-slot="{ meta: formMeta }" :initialValues="initialValues">
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
      <Field name="birthYear" rules="required" v-slot="{ field, meta }">
        <div class="form-group">
          <label :class="{ 'text-danger': meta.dirty && !meta.valid }" for="birthYear-input">Birth Year</label>
          <input
            :class="{ 'is-invalid': meta.dirty && !meta.valid }"
            type="birthYear"
            id="birthYear-input"
            class="form-control"
            v-bind="field"
          />
          <ErrorMessage name="birthYear" class="invalid-feedback" />
        </div>
      </Field>
      <button class="btn btn-primary" :class="{ disabled: !formMeta.valid }">Let's go!</button>
    </Form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { UserModel } from '@/models/UserModel';
import { useUserService } from '@/composables/UserService';
import { RegistrationResponse } from '@/models/RegistrationResponse';
import Alert from '@/components/Alert.vue';
import { Form, Field } from 'vee-validate';
import router from '@/router';

export default defineComponent({
  name: 'Register',

  components: {
    Alert,
    Form,
    Field
  },

  setup() {
    const userCredentials = ref<RegistrationResponse | null>(null);
    const userService = useUserService();
    const registrationFailed = ref<boolean>(false);
    const initialValues = { birthYear: new Date().getFullYear() - 18 };

    async function register(registrationDetails: UserModel) {
      try {
        userCredentials.value = await userService.register(registrationDetails);
        if (userCredentials.value) {
          router.push({ name: 'home' });
        }
      } catch (error) {
        registrationFailed.value = true;
      }
    }

    return { register, registrationFailed, initialValues };
  }
});
</script>
