<template>
     <div class="seacherMsg">
      <p>热门搜索</p>
      <ul >
        <li v-for="item in hotArr" 
         :key="item.id"
         @click="currentName(item.name)"
         >
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
    props:{
        hotArr:{
            type:Array
        }
    },
    methods:{
       currentName(value){
        this.$emit("hotM-music",value);
       }
    }
}
</script>
<style lang="less" scoped>

.seacherMsg {
    
    p{
       font-size: 12px; 
       color:#666666;
    }
    margin: 10px ;
  ul {
      margin: 5px 0;
    li { 
         margin: 2px 5px;
        display: inline-block;
        border: 1px solid #d3d4da;
        padding: 5px 10px;
        text-align: center;
        border-radius: 15px;
        font-size: 12px;
    }
  }
}
</style>