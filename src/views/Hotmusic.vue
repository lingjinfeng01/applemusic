<template>
    <div>
      <div class="header">
           <hot-music></hot-music>
        </div>

        <div class="main">
          <ul>
              <li v-for="(item,index) in hotMusicArr" :key="item.id">
                  <hot-item
                  :opt="item"
                  :num="index"
                  @item-index="currentIndex"
                  :class="key==index?'active':''"
                  ></hot-item>
              </li>
          </ul>
        </div>
        <section class="footer">

    </section>
    </div>
</template>
<script>
//热歌榜
import hotMusic from '../components/hotMusic.vue'
//
import hotItem from '../components/hotItem.vue'


export default {
    data(){
          return{
              hotMusicArr:[],
              key:null
          }
    },
     components:{
         hotMusic,
         hotItem
    },
    methods:{
        //接收index
      currentIndex(obj){
          this.key = obj.num;
          let data = {
          num:obj.num,
          option:obj.option,
          newMusic:this.hotMusicArr
        }
          this.$emit('tab-music',data);

      },
      //获取数据的方法
       getData(url, type, data) {
        if (type == "get") {
        return this.axios.get(url, { params: data });
      }
    },
    },
    created(){
     let _this = this;
     async function hotMusicList(){
       
       await _this.getData("/playlist/detail",'get',{id:3778678})
       .then(res=>{
              let d = res.playlist.tracks;
              let hot = d.slice(0,20);
               let arr = [];
               hot.forEach((item,index) => {
                   arr.push({
                       id:item.id,
                       url:item.al.picUrl,
                       name:item.al.name,
                       author:item.ar,
                       count:item.h.size
                   })
               });
               
               _this.hotMusicArr = arr;
       }).catch(err=>{
           console.log(err);
       })
     }
     hotMusicList();
    },
    mounted(){

    },
}
</script>

<style lang="less" scoped>

</style>