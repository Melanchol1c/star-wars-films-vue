<template>
  <form novalidate class="md-layout auth-form" @submit.prevent="submit">
    <md-card class="md-layout-item md-size-50 md-elevation-7">
      <md-card-header>
        <div class="md-title">Login</div>
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
          <span class="md-error" v-else-if="!$v.form.minLength" key="password-invalid-message">
            Your password too short
          </span>
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="isLoading" />

      <md-card-actions>
        <div class="mr-20">
          Or
          <router-link :to="{ name: 'register' }" tag="b" class="link">
            <strong>register</strong>
          </router-link>
        </div>
        <md-button type="submit" class="md-raised" :disabled="isLoading">
          Login
        </md-button>
      </md-card-actions>
    </md-card>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

import { LOGIN_WITH_EMAIL_AND_PASSWORD } from '@/app/auth/store/actionTypes';

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    isLoading: false,
  }),

  computed: {
    /** Prop choose what url will be after login. */
    redirectPath() {
      return this.$route.query.redirect || { name: 'films' };
    },
  },

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
    },
  },
  methods: {
    ...mapActions({ signIn: `auth/${LOGIN_WITH_EMAIL_AND_PASSWORD}` }),

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
      this.form.email = this.form.password = null;
    },

    /** Login method using store action change loading state. */
    async login() {
      const { email, password } = this.form;
      this.isLoading = true;

      try {
        await this.signIn({ email, password });
        this.isLoading = false;
        this.clearForm();
        this.$router.push(this.redirectPath);
      } catch (error) {
        this.isLoading = false;
      }
    },

    /** Form submit method. */
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.login();
      }
    },
  },
};
</script>
