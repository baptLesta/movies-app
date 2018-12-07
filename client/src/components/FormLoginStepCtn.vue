<template>
  <div :class="hasError ? 'FormLoginStepCtn has-error' : 'FormLoginStepCtn'">
    <ElInput
     class="row"
     :placeholder="placeholder"
     v-model="value"
     @blur="handleCheckValidation"
    />
    <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
    <ElButton class="row" type="primary" @click="onClick">
      {{ buttonLabel }}
    </ElButton>
  </div>
</template>

<script>
export default {
  name: 'FormLoginStepCtn',
  props: {
    placeholder: String,
    buttonLabel: String,
    errorMessage: String,
    checkValidation: true,
    onNextStep: true,
  },
  data: function () {
    return {
      value: '',
      hasError: false,
    }
  },
  methods: {
    handleCheckValidation: function() {
        if (Boolean(this.checkValidation()) === false) {
          this.hasError = true;
        } 
    },
    onClick() {
      if (Boolean(this.checkValidation())) {
        this.onOnextStep()
      } else {
        this.hasError = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/main.scss';

.FormLoginStepCtn {
  .row {
    margin-top: 20px;
  }

  .error-message {
    color: $red;
    @include recipe-text();
  }
}
</style>


<style lang="scss">
// Override Child Element

@import '@/assets/styles/main.scss';

.FormLoginStepCtn {
  &.has-error {
    .el-input__inner {
      border-color: $red;
    }
  }
}
</style>
