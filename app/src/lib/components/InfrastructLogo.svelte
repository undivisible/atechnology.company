<script lang="ts">
  import { onMount } from 'svelte';
  
  let isHovered = false;
  let randomValues: { [key: string]: number } = {};
  
  const SHAPE_SIZE = 60; // px - much bigger to fill the logo block
  const diamondSize = Math.round(SHAPE_SIZE / Math.sqrt(2));
  
  function generateRandomValues() {
    const values: { [key: string]: number } = {};
    // Animate shapes
    for (let i = 1; i <= 4; i++) {
      values[`rotate${i}`] = Math.floor(Math.random() * 201) - 100;
      values[`x${i}`] = Math.floor(Math.random() * 41) - 20;
      values[`y${i}`] = Math.floor(Math.random() * 41) - 20;
    }
    randomValues = values;
  }
  
  $: if (isHovered) {
    generateRandomValues();
  }
  
  function handleMouseEnter() {
    isHovered = true;
  }
  
  function handleMouseLeave() {
    isHovered = false;
  }
</script>

<div class="w-full h-full flex items-center justify-center">
  <div
    class="cursor-pointer select-none"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="button"
    tabindex="0"
    style="
      display: grid;
      grid-template-columns: repeat(2, {SHAPE_SIZE}px);
      grid-template-rows: repeat(2, {SHAPE_SIZE}px);
      gap: 0;
      width: {SHAPE_SIZE * 2}px;
      height: {SHAPE_SIZE * 2}px;
    "
  >
    <!-- Circle -->
    <div
      class="transition-all duration-300 ease-out"
      style="
        width: {SHAPE_SIZE}px;
        height: {SHAPE_SIZE}px;
        border-radius: 50%;
        background: {isHovered ? '#ef4444' : '#fff'};
        grid-column: 1;
        grid-row: 1;
        transform: rotate({isHovered ? randomValues['rotate1'] || 0 : 0}deg) 
                  translateX({isHovered ? randomValues['x1'] || 0 : 0}px) 
                  translateY({isHovered ? randomValues['y1'] || 0 : 0}px);
      "
    ></div>
    
    <!-- Triangle -->
    <div
      class="transition-all duration-300 ease-out"
      style="
        width: {SHAPE_SIZE}px;
        height: {SHAPE_SIZE}px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        grid-column: 2;
        grid-row: 1;
        transform: rotate({isHovered ? randomValues['rotate2'] || 0 : 0}deg) 
                  translateX({isHovered ? randomValues['x2'] || 0 : 0}px) 
                  translateY({isHovered ? randomValues['y2'] || 0 : 0}px);
      "
    >
      <div
        class="transition-all duration-300 ease-out"
        style="
          width: 0;
          height: 0;
          border-left: {SHAPE_SIZE / 2}px solid transparent;
          border-right: {SHAPE_SIZE / 2}px solid transparent;
          border-bottom: {SHAPE_SIZE}px solid {isHovered ? '#3b82f6' : '#fff'};
        "
      ></div>
    </div>
    
    <!-- Square -->
    <div
      class="transition-all duration-300 ease-out"
      style="
        width: {SHAPE_SIZE}px;
        height: {SHAPE_SIZE}px;
        background: {isHovered ? '#10b981' : '#fff'};
        grid-column: 1;
        grid-row: 2;
        transform: rotate({isHovered ? randomValues['rotate3'] || 0 : 0}deg) 
                  translateX({isHovered ? randomValues['x3'] || 0 : 0}px) 
                  translateY({isHovered ? randomValues['y3'] || 0 : 0}px);
      "
    ></div>
    
    <!-- Diamond -->
    <div
      class="transition-all duration-300 ease-out"
      style="
        width: {diamondSize}px;
        height: {diamondSize}px;
        background: {isHovered ? '#f59e0b' : '#fff'};
        margin: {(SHAPE_SIZE - diamondSize) / 2}px;
        grid-column: 2;
        grid-row: 2;
        transform: rotate({isHovered ? randomValues['rotate4'] || 45 : 45}deg) 
                  translateX({isHovered ? randomValues['x4'] || 0 : 0}px) 
                  translateY({isHovered ? randomValues['y4'] || 0 : 0}px);
      "
    ></div>
  </div>
</div>
