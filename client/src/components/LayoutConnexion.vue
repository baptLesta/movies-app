<template>
  <div class="LayoutConnexion">
    <ElRow :gutter="20" justify="center">
      <ElCol :span="12" :offset="6">
        <div class="title">Login</div>
        <ElCard>
          <TheFormLogin />
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<script>
import TheFormLogin from '@/components/TheFormLogin'

export default {
  name: 'LayoutConnexion',
  components: {
    TheFormLogin
  }
}
</script>

<style scoped lang="scss">

@import '@/assets/styles/main.scss';

.LayoutConnexion {
  margin-top: 10vh;
  padding: 24px;

  .title {
    @include recipe-title-big();
    margin-bottom: 25px;
  }
}
</style>