<template>
  <div>

    <header class="header" ref="header">
      <apple-top>
        <template v-slot:left>
          <div class="logo"><span class="icon"></span>苹果音乐</div>
        </template>
      </apple-top>
    </header>


    <nav :class="[{'fixed':isFixed}]">
      <apple-nav @nav-item="currentIndex"></apple-nav>
    </nav>


    <div class="layout">
      <transition
       :duration="{enter:800,leave:300}"
       enter-active-class="animate__animated animate__bounceInLeft"
       leave-active-class="animate__animated animate__bounceOutRight"
      >
      <!-- 组件切换位置 -->
      <keep-alive>
       
      <component 
      @tab-music="tapCurrentMusic"
      :is="compName"></component>
      </keep-alive>
      </transition> 

   
    </div>
      
   <div
    @click="showFullpage"
   >
     <transition 
     name="musicBox"
     :duration="{enter:800,leave:300}"
     enter-active-class="animate__animated animate__zoomInLeft"
     leave-active-class="animate__animated animate__zoomOutRight"
     >
         <player 
        @item-out="musicOut"
         :optItem="musicItem"
         v-if="isShowMusicbox"></player>

     </transition>
     
   </div>
    
     <!-- fullLayout -->
  
  </div>   
</template>

 <script>
 //顶部
import appleTop from "../components/appleTop.vue";
//导航
import appleNav from "../components/appleNav.vue";
//推荐
import Recommend from '../views/Recommend.vue';
import Hotmusic from '../views/Hotmusic.vue';
import Search2 from '../views/Search2.vue';

import Player from '@/views/Player.vue';




export default {
  data(){
    return{
      compName:Recommend,
      index:0,
      isFixed:false,
      isShowMusicbox:false,
      musicItem:null,
      isShowFull: false
    }
  },
  name: "Home",
  components: {
    appleTop,
    appleNav,
    Player,
    
    
  },
  methods:{
    currentIndex(index){
        this.index = index;
        switch(index){
          case 0:
            this.compName = Recommend;
            break;
          case 1:
             this.compName = Hotmusic;
             break;
            case 2:
            this.compName = Search2;
            break;
        }
    },
    //滚动监听
    scrollEvent(){
         //
         window.addEventListener('scroll',()=>{
            if(this.index == 0){
            this.$nextTick(()=>{
            let ttop = document.documentElement.scrollTop || 
            document.body.scrollTop;
      if(this.$refs.header){

           let height = this.$refs.header.offsetHeight;
           //判断nav高度
           if(ttop>height){
             this.isFixed = true;

           }else{
             this.isFixed = false;
           }
      }
         
            })
              }
          

         })
      },
      tapCurrentMusic(data){
        this.musicItem =data.option;
        this.isShowMusicbox = true;

      },
      musicOut(status){
     
        if(status){
          let delayer = setTimeout(() => {
             this.isShowMusicbox = false;
             clearTimeout(delayer)
          }, 300);
        }
      },
      showFullpage(){

            // this.$router.replace('../components/fullLayout');
      }

      
  },
  mounted(){
    this.scrollEvent();
  }
};
</script>

<style lang="less" scoped>
  .logo{
    font-size: 22px;
    height: 50px;
    line-height: 50px;
    font-family: applemusic;
     .icon{
       display: inline-block;
       width: 50px;
       height: 50px;
       background-image: url(../assets/img/logo.png);
       background-size: 50px 50px;
       vertical-align: middle;
     }
  }
  .layout {
  width: 100%;
  position: relative;
  > div {
     width: 100%;
     position: absolute;
     top: 0;
     left: 0;
  }
}
.fixed{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
body{
  padding-bottom: 60px;
}
</style>
