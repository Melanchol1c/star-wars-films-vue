<template>
  <form novalidate class="md-layout auth-form" @submit.prevent="submit">
    <md-card class="md-layout-item md-size-50 md-elevation-7">
      <md-card-header>
        <div class="md-title">Register</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="getValidationClass('email')">
          <label for="email">Email</label>
          <md-input
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="form.email"
            :disabled="isLoading"
          />
          <span class="md-error" v-if="!$v.form.email.required" key="email-invalid-message">
            The email is required
          </span>
          <span class="md-error" v-else-if="!$v.form.email.email" key="email-invalid-message">
            Invalid email
          </span>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="getValidationClass('password')">
          <label for="password">Password</label>
          <md-input
            type="password"
            name="password"
            id="password"
            autocomplete="password"
            v-model="form.password"
            :disabled="isLoading"
          />
          <span class="md-error" v-if="!$v.form.password.required" key="password-invalid-message">
            The password is required
          </span>
          <span
            class="md-error"
            v-else-if="!$v.form.password.minLength"
            key="password-invalid-message"
          >
            Your password too short
          </span>
        </md-field>
      </md-card-content>

      <md-card-content>
        <md-field :class="getValidationClass('repeatPassword')">
          <label for="password">Repeat password</label>
          <md-input
            type="password"
            name="repeat-password"
            id="repeat-password"
            autocomplete="repeat-password"
            v-model="form.repeatPassword"
            :disabled="isLoading"
          />
          <span
            class="md-error"
            v-if="!$v.form.repeatPassword.required"
            key="repeat-password-invalid-message"
          >
            The password is required
          </span>
          <span
            class="md-error"
            v-else-if="!$v.form.repeatPassword.sameAsPassword"
            key="repeat-password-invalid-message"
          >
            Passwords are different
          </span>
        </md-field>
      </md-card-content>

      <md-card-content class="relative">
        <md-checkbox id="agree" name="agree" v-model="form.agree" :disabled="isLoading">
          <label for="agree">Agree with terms.</label>
        </md-checkbox>
        <span
          :class="$style.checkboxError"
          v-if="$v.form.$dirty && !$v.form.agree.checked"
          key="agree-invalid-message"
        >
          The agrement is required
        </span>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

      <md-card-actions>
        <div class="mr-20">
          Or
          <router-link :to="{ name: 'login' }" tag="b" class="link">
            <strong>login</strong>
          </router-link>
        </div>
        <md-button type="submit" class="md-raised" :disabled="isLoading">
          Register
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

import { REGISTER_WITH_EMAIL_AND_PASSWORD } from '@/app/auth/store/actionTypes';

export default {
  name: 'register-page',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
      repeatPassword: null,
      agree: false,
    },
    isLoading: false,
  }),

  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      agree: {
        checked: v => v,
      },
      repeatPassword: { required, sameAsPassword: sameAs('password') },
    },
  },

  methods: {
    ...mapActions({ signUp: `auth/${REGISTER_WITH_EMAIL_AND_PASSWORD}` }),

    /** Bing css class on form field when it invalid and dirty. */
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
    },

    /** Reset form fields and component state. */
    clearForm() {
      this.$v.$reset();
      this.form.email = this.form.password = this.form.repeatPassword = null;
    },

    /** Register method using store action change loading state. */
    async register() {
      const { email, password } = this.form;
      this.isLoading = true;

      try {
        await this.signUp({ email, password });
        this.isLoading = false;
        this.clearForm();
        this.$router.push({ name: 'films' });
      } catch (error) {
        this.isLoading = false;
      }
    },

    /** Form submit method. */
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.register();
      }
    },
  },
};
</script>

<style lang="scss" module>
.checkboxError {
  height: 20px;
  position: absolute;
  bottom: 0px;
  font-size: 12px;
  color: #ff1744;
  left: 15px;
}
</style>
