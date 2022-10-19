<template>
  <div
    class="vertical-container background"
  >
    <div class="vertical-body">
      <div class="container">
        <h2 class="title">
          Coming Soon
        </h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vertical-container {
  display: table;
  width: 100%;
  height: 100%;
}

.vertical-body {
  display: table-cell;
  width: 100%;
  vertical-align: middle;
}

.background {
  background: url('../assets/comingsoon.jpeg');
  background-size: cover;
  animation: popup 2s;
}

.container {
  max-width: 960px;
  padding: 0 10px;
  margin: 0 auto;
  text-align: center;
  animation: blur 2s;
}

.title {
  margin-bottom: 0;
  font-size: 70px;
  animation: popup 2s;
}

@keyframes blur {
  0% {
    filter: blur(12px);
  }

  100% {
    filter: blur(0);
  }
}

@keyframes popup {
  0% {
    opacity: 0;
    transform: scale(1.2);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
