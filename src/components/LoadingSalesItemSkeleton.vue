<template>
  <div
    v-for="(_, index) in 15"
    class="my-3 p-2.5 bg-gray-800 rounded-md cursor-pointer"
    :key="index"
  >
    <div class="animate-pulse flex space-x-4">
      <div class="rounded-full bg-slate-700 h-16 w-16"></div>
      <div class="flex-1 space-y-6 py-2">
        <div class="h-2 bg-slate-700 rounded"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-slate-700 rounded col-span-2"></div>
            <div class="h-2 bg-slate-700 rounded col-span-1"></div>
          </div>
          <div class="h-2 bg-slate-700 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>
