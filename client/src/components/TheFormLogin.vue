<template>
  <div class="TheFormLogin">
    <FormLoginStepCtn 
      ref="panelEmail" 
      v-if="state == 'step1'" 
      class="panel-email"
      :placeholder="'Email'"
      :buttonLabel="'Continue'"
      :errorMessage="'Veuillez rentrer un email valide.'"
      :checkValidation="validateEmail"
      :onNextStep="onStep2"
    />
    <transition>
      <div ref="panel2" v-if="state == 'step2'" :class="classPanelEmail">
        <ElInput
          class="row"
          placeholder="Password"
          v-model="password"
         />
         <ElButton class="row" type="primary">
           Continue
         </ElButton>
      </div>
    </transition>
  </div>
</template>

<script>
import FormLoginStepCtn from '@/components/FormLoginStepCtn'

export default {
  name: 'TheFormLogin',
  data: function () {
      return {
        state: 'step1',
        email: null,
        password: null
      }
  },
  computed: {
    classPanelEmail: function() {
      return {
        'panel-email': true,
        'has-error': this.hasError && this.state === 'step-1'
      }
    },
    classPanelPassword: function() {
        return {
          'panel-password': true,
          'has-error': this.hasError && this.state === 'step-2'
        }
    }
  },
  methods: {
    validateEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase())
    },
    onStep2: function() {
        this.state = 'step2'
    },
    validatePassword: function(password) {
        return true
    }
  },
  components: {
    FormLoginStepCtn
  }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/main.scss';

.TheFormLogin {
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
}
</style>