<template>
  <div>
    <div class="topSeacher">
      <div class="layout-top">
        <div class="seacher">
          <span class="icon fa fa-search" aria-hidden="true"></span>
          <input
            v-model="keyword"
            type="text"
            placeholder="搜索歌曲、歌手、专辑"
            @keyup.enter="getBestFit"
             @input="getBestFit2"
          />
          <button class="cancel" @click="toggleCom" v-if="keyword.length==0? false : true">x</button>
        </div>
      </div>
    </div>
    <!-- 组件切换 -->
    <component 
    @hotM-music="currentHotM"
     @best-music="currentMusic"
    :is="compName" 
    :hotArr="seacherMusicArr" 
    :keywords="keyword"
    :bestList="bestFitArr"
   
    >
    </component>

    <section class="footer"></section>
  </div>
</template>
<script>
import seacherBox from "../components/base/seacherBox.vue";

import hotMusic from "../components/base/hotSeacher.vue";

import bestFit from "../components/base/bestFit.vue";

import SeacherRes from "../components/base/SeacherRes.vue";
export default {
  data() {
    return {
      compName: hotMusic,
      seacherMusicArr: [],
      keyword: "",
      bestFitArr:[],
    };
  },
  watch:{
        keyword(){
           if(this.keyword.length ===0){
             this.compName = hotMusic;
           }
        }
  },
  components: {
    seacherBox,
  },
  methods: {
     currentHotM(data){
          this.keyword = data;
          this.getBestFit();
     },
    toggleCom(){
    this.compName = hotMusic;
    this.keyword = "";
    },
   currentMusic(data){
     this.$emit('tab-music',data);
   },
    //获取数据的方法
    getData(url, type, data) {
      if (type == "get") {
        return this.axios.get(url, { params: data });
      }
    },
    getBestFit() {
      this.compName = bestFit;
      let _this = this;
      async function bestFitList() {
        await _this.getData("/search", "get", { keywords:_this.keyword})
          .then((res) => {
            let d =  res.result.songs;
            let arr =[];
            // console.log(d);
            d.forEach((item,index)=>{
              arr.push({
                id:item.id,
                name:item.name,
                author:item.artists[0].name,
                url:item.artists[0].img1v1Url,
                count:item.duration
              })
              _this.bestFitArr = arr;

              console.log(_this.bestFitArr);
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }
      bestFitList();
    },
    getBestFit2() {
      this.compName = SeacherRes;
      let _this = this;
      async function bestFitList() {
        await _this.getData("/search", "get", { keywords:_this.keyword})
          .then((res) => {
            let inp =  res.result.songs;
            let d =inp.slice(0,6);
            let arr =[];
            // console.log(d);
            d.forEach((item,index)=>{
              arr.push({
                id:item.id,
                name:item.name,
                author:item.artists[0].name,
                url:item.artists[0].img1v1Url,
                count:item.duration
              })
              _this.bestFitArr = arr;

              console.log(_this.bestFitArr);
            })
          })
          .catch((err) => {
            console.log(err);
          });
      }
      bestFitList();
    },
  },
  created() {
    let _this = this;
    async function seacherMusicList() {
      await _this
        .getData("/search/hot", "get", { id: 3778678 })
        .then((res) => {
          let d = res.result.hots;
          let arr = [];
          console.log(d);
          d.forEach((item, index) => {
            arr.push({
              name: item.first,
            });
          });
          _this.seacherMusicArr = arr;
          // console.log(_this.seacherMusicArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    seacherMusicList();
    //获取匹配的数据
  },
  mounted() {},
};
</script>
 
<style lang="less" scoped>
.layout-top {
  width: 100%;
  height: 50px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  line-height: 30px;

  .seacher {
    width: 90%;
    height: 30px;
    padding: 0px 5px;
    box-sizing: border-box;
    margin: 10px auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: #ebecec;
    display: flex;
    align-items: center;
     .cancel{
       width: 25px;
       height: 25px;
       border-radius: 50%;
       color: #fff;
       background-color: #bcbdbd;
     
     }
    .icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      background-color: #ebecec;
      vertical-align: middle;
      color:#bcbdbd ;
    }
    input {
      width: 90%;
      height: 30px;
      background-color: #ebecec;
      line-height: 30px;
    }
  }
}
</style>