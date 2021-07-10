<template>
        <div >
           <div class="top">
              <div class="top-left">
                   <slot name="left"></slot>
              </div>
              <div class="top-right">
                   <slot name="right"></slot>
              </div>
             
           </div>
        </div>
</template>

 <script>
 export default {
    name:'appleTop',
    
 }
 </script>

<style lang="less" scoped>
@import url(../assets/base.less);
 .top{
     width: 100%;
     height: 50px;
     background-color: @mainColor;
     padding: 0 10px;
     display: flex;
     justify-content: space-between;
     justify-items: center;
      .top-left{
         background-color: transparent;
      }
      .top-right{
           background-color: transparent;
      }
    
 }
</style>
