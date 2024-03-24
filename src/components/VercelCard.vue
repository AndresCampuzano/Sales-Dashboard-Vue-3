<template>
  <div class="vercel-gradient">
    <div class="vercel-gradient-gradient"></div>
    <div class="vercel-gradient-content">
      <p>This is great</p>
      <p>more content</p>
      <p>To conclude, more useless content here</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.vercel-gradient {
  position: relative;
  display: inline-flex;
  border: none;
  min-width: 120px;
  min-height: 32px;
  width: 100%;
}

.vercel-gradient-gradient {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  border-radius: 6px;
  background: linear-gradient(-90deg, #007cf0, #00dfd8, #ff0080, #007cf0);
  background-size: 400% 100%;
  border: none;
  padding: 0;
  margin: 0;
  animation: backgroundAnimation 8s ease-in-out infinite;
}

@keyframes backgroundAnimation {
  50% {
    background-position: 140% 50%;
    transform: skew(-2deg);
  }
}

.vercel-gradient-gradient:after {
  content: '';
  position: absolute;
  background-size: inherit;
  background-image: inherit;
  -webkit-animation: inherit;
  animation: inherit;
  left: 0;
  right: 0;
  top: 2px;
  height: 100%;
  filter: blur(0.5rem);
}

.vercel-gradient-content {
  position: relative;
  flex: 1;
  background: black;
  border-radius: 4px;
}
</style>
