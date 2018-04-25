<template>
  <div id="app">
    <header>
      <h1>Beeseeking</h1>
      <h2>Community-sourced hive hosting</h2>
    </header>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import './styles/custom-bootstrap.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';

html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: rgba(249, 201, 1, 0.2);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 70vw;
  margin: 0 auto;
  color: #2c3e50;

  > header {
    padding: 0.5rem 0;

    h1 {
      font-size: 1.4rem;
    }

    h2 {
      font-size: 1rem;
    }
  }
}

#backpage {
  background: white;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  text-align: center;
  padding: 0.25rem 0;
  font-size: 0.8rem;
  box-shadow: 0 -0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  cursor: pointer;

  span {
    color: $primary;
  }

  &:hover span:last-child {
    text-decoration: underline;
  }
}

.with-backpage > .container {
  margin-top: 0 !important;
  background: white !important;
  box-shadow: 0 -0.1rem 0.1rem rgba(0, 0, 0, 0.2) !important;
  position: relative;
}

.step-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: $gray-light;
}
</style>