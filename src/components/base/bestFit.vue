<template>
  <div class="layout">
    <p>最佳匹配</p>
        <ul>
            <li v-for="(item,index) in bestList" :key="item.id">
                <seacher-item
                 :opt="item"
                  :num="index"
                  :class="key==index?'active':''"
                  @item-index="currentIndex"
                ></seacher-item>
            </li>
        </ul>
  </div>
</template>
<script>
import seacherItem from '../seacherItem.vue'
export default {
  data(){
     return{
       key:null
     }
  },
     components:{
         seacherItem
     },
     props:{
        keywords:{
          type:String
        },
        bestList:{
          type:Array
        }
     },
     watch:{
         keywords(){
          
         } 
     },
     mounted(){
     
     },
     methods:{
         currentIndex(obj){
          this.key = obj.num;
          let data = {
          num:obj.num,
          option:obj.option,
          newMusic:this.newMusicArr
        }
          this.$emit('best-music',data);

      
         

      }
     }
}
</script>
<style lang="less" scoped>
.layout {
  margin: 10px;
  p {
    font-size: 12px;
    color: #666666;
  }
  .message{
      span{
          display: inline-block;
      }
      .icon{
        
      }
      .singer{
    
      }
      width: 100%;
      height: 56px;
      border: 1px solid #000;
  }
 
}
</style>