<template>
  <div class="flex-none w-24 bg-gray-800 flex flex-col items-center">
    <sidebar-link link="/" :exact="true">
      <SolidHomeIcon class="text-white"></SolidHomeIcon>
    </sidebar-link>
    <sidebar-link link="/read">
      <SolidBookmarkIcon class="text-white"></SolidBookmarkIcon>
    </sidebar-link>
    <sidebar-link link="/groups" :exact="true">
      <SolidUserGroupIcon class="text-white"></SolidUserGroupIcon>
    </sidebar-link>
    <sidebar-link link="/settings" class="mt-auto" :exact="true">
      <SolidAdjustmentsIcon class="text-white"></SolidAdjustmentsIcon>
    </sidebar-link>
  </div>
</template>

<script>
import sidebarLink from './sidebarLink.vue'
export default {
  components: { sidebarLink },
}
</script>
