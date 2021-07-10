<template>
  <div>
    <section>
      <apple-title>
        <span>编辑推荐</span>
      </apple-title>
    <loading v-if="isShow"></loading>
    <ul class="list" v-if="!isShow">
      <li v-for="item in listArr" :key="item.id">
        <apple-edit :opt="item"></apple-edit>
      </li>
    </ul>
     </section>
    <section>
      <apple-title>
        <span>最新音乐</span>
      </apple-title>
      <loading v-if="isNewShow"></loading>
      <ul class="new-list" v-if="!isNewShow">
        <li v-for="(item,index) in newMusicArr" :key="item.id">
          <apple-item 
          :opt="item"
          :num="index"
          @item-tab="addTapCurrent"
          :class="key==index?'active':''"
          ></apple-item>
        </li>
      </ul>
    </section>
    <section class="footer">

    </section>
  </div>
</template>
<script>
import appleTitle from "../components/appleTitle.vue";

import appleItem from "../components/appleItem.vue";

import appleEdit from "../components/appleEdit.vue";

import loading from "../components/base/loading.vue";

export default {
  data() {
    return {
      listArr: [],
      isShow: true,
      isNewShow: true,
      newMusicArr: [],
      key:null,//当前音乐列表选项
    };
  },
  components: {
    appleTitle,
    appleEdit,
    loading,
    appleItem,
  },
  methods: {
    getData(url, type, data) {
      if (type == "get") {
        return this.axios.get(url, { params: data });
      }
    },
    //接收对象
    addTapCurrent(obj){ 
       
       this.key = obj.num;
      
        let data = {
          num:obj.num,
          option:obj.option,
          newMusic:this.newMusicArr
        }
          this.$emit('tab-music',data);

    }
  },
  //创建组件后,被调用的钩子函数
  created() {
    let _this = this;
    //1.0 编辑推荐
    async function showmvList() {
      let isLoaing = window.localStorage.getItem("_isLoading");
      _this.isShow = isLoaing;

      await _this
        .getData("/personalized", "get", { limit: 6 })
        .then((res) => {
          if (res.code == 200) {
            let delay = setTimeout(() => {
              let arr = [];
              res.result.forEach((item, index) => {
                arr.push({
                  url: item.picUrl,
                  id: item.id,
                  name: item.name,
                  count: item.playCount,
                });
              });
              _this.listArr = arr;
              _this.isShow = false;
              window.localStorage.setItem("_isLoading", false);
              clearTimeout(delay);
            }, 500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    showmvList();
    //2.0 最新音乐
    async function showNewList() {
      let isNew = window.localStorage.getItem("_isNewLoading");
      _this.isNewShow = isNew;
      await _this
        .getData("/personalized/newsong", "get", {})
        .then((res) => {
          if (res.code == 200) {
            let delay = setTimeout(() => {
              let arr = [];
              res.result.forEach((item, index) => {
                arr.push({
                  id: item.id,
                  name: item.name,
                  url: item.picUrl,
                  song: item.song,
                });
              });
              _this.newMusicArr = arr;
              _this.isNewShow = false;
              window.localStorage.setItem("_isNewLoading", false);
               clearTimeout(delay);
            },500);
          }
        })

        .catch((err) => {
          console.log(err);
        });
    }
    showNewList();
  },
};
</script>
<style lang="less" scoped>
div {
  font-size: 16px;
}
.list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  li {
    flex: 0 0 33.3333%;
    padding: 5px 2px;
    box-sizing: border-box;
  }
}
</style>