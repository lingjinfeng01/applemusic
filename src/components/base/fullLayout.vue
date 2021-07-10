<template>
  <div
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    id="fullLayout"
  >
    <!-- 不影响歌曲的播放！ -->
    <div class="container">
      <!-- 当前音乐的背景 -->
      <div
        class="bg-photo"
        :style="`background-image:url(${musicItem.url})`"
      ></div>

      <!-- 当前音乐旋转的图片 -->
      <div class="rotate-photo">
        <div @click="togglePlay">
          <ul :class="flag == false ? 'active' : ''">
            <li>
              <img :src="musicItem.url" alt="" />
            </li>
          </ul>
        </div>
      </div>

      <!-- 解析当前音乐歌词 -->
      <div class="lyric-box">
        <div class="text">{{ musicItem.name }}</div>
        <div>
          <ul :style="`transform:translateY(${-currentIndex*height + 100}px)`">
            <li 
                v-for="(item, i) in lyricArr" 
                :key="item.id"
                :class="currentIndex == i ? 'active':''">
              {{ item.lyricText }}
            </li>
          </ul>
        </div>
      </div>

      <!-- 音乐播放暂停等控件  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "FullLayout",
  props: {
    curTime: [Number, String],
    totTime: [Number, String],
    musicItem: {
      type: Object,
    },
  },
  // 侦听或计算属性
  watch: {
    curTime() {
      let ctime = this.curTime;
      let arr = this.lyricArr;
      let index = 0;
      for (let i = 0; i < arr.length; i++) {
            if (i >= arr.length - 1) {
            // 添加最后一个歌词
            index = i;
            break;
            }
            if (ctime >= arr[i].time && ctime < arr[i + 1].time) {
            // 当前高亮的歌词
            index = i;
            break;
            }
      }
      this.index = index;
    },
  },
  computed:{
      currentIndex(){
            let ctime = this.curTime;
            let arr = this.lyricArr;
            let index = 0;
            for (let i = 0; i < arr.length; i++) {
                    if (i >= arr.length - 1) {
                    // 添加最后一个歌词
                    index = i;
                    break;
                    }
                    if (ctime >= arr[i].time && ctime < arr[i + 1].time) {
                    // 当前高亮的歌词
                    index = i;
                    break;
                    }
            }
            return index;
      }
  },
  data() {
    return {
      startTime: 0,
      endTime: 0,
      isMove: false,
      startX: 0,
      moveX: 0,
      flag: true,
      lyricArr: [],
      index: 0,
      height:30
    };
  },
  methods: {
    touchstart(event) {
      this.startTime = new Date().getTime();
      this.startX = event.touches[0].pageX;
    },
    touchmove(event) {
      this.isMove = true;
      this.moveX = event.touches[0].pageX;
    },
    touchend() {
      let time = new Date().getTime() - this.startTime;
      let x = this.moveX - this.startX; //滑动的值，负值表示向左
      if (time > 150 && this.isMove && x < 0) {
        this.$emit("slide-out", false);
      }
    },
    togglePlay() {
      if (this.flag) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      // 控制音乐播放或暂停
      this.$emit("music-play", this.flag);
    },
    // 获取歌词方法
    getLyric(id) {
      // axios
      this.axios.get("/lyric", { params: { id } }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          // 歌词字符串
          let lyric = res.lrc.lyric;
          //  console.log(lyric);
          // 调用解析歌词的方法
          this.parseLyric(lyric);
        }
      });
    },
    // 解析歌词
    parseLyric(lyric) {
      // 根据换行符 把字符串切换成数组
      let arr = lyric.split("\n");
      // 删除空格字符
      arr.pop();
      // console.log(arr);
      // 匹配每句词的时间的正则表达式
      let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
      // 定义空数组记录解析后的数据
      let lyricArray = [];
      // 循环arr
      for (let i = 0; i < arr.length; i++) {
        let regEx = new RegExp(reg);
        if (regEx.test(arr[i])) {
          // console.log(RegExp.$1,'---1分钟');
          // console.log(RegExp.$2,'---2秒');
          // console.log(RegExp.$3,'---3歌词');
          let obj = {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lyricText: RegExp.$3,
            id: (Math.random() + "" + i).slice(2),
          };
          // 添加数据
          lyricArray.push(obj);
        }
      }
      // 记录解析后的歌词
      this.lyricArr = lyricArray;
      console.log(this.lyricArr);
    },
  },
  created() {
    console.log(this.musicItem);
    // 获取歌词
    this.getLyric(this.musicItem.id);
  },
};
</script>

<style lang="less" scoped>
#fullLayout {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .bg-photo,
  .rotate-photo,
  .lyric-box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .bg-photo {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    filter: blur(30px); /*设置背景模糊*/
    z-index: 999;
  }
  .rotate-photo {
    z-index: 1000;
    > div {
      width: 260px;
      height: 260px;
      margin: 50px auto 0;
      .active {
        animation-play-state: paused;
      }
      ul {
        width: 260px;
        height: 260px;
        border: 40px solid #000;
        border-radius: 50%;
        overflow: hidden;
        box-sizing: border-box;
        animation-name: rotateAnimation;
        animation-duration: 5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;

        li {
          width: 180px;
          height: 180px;
          border: 20px solid #ccc;
          border-radius: 50%;
          overflow: hidden;
          box-sizing: border-box;
          line-height: 180px;
          text-align: center;
          img {
            width: 100%;
            vertical-align: middle;
            transform: scale(1.5);
          }
        }
      }
    }
  }
  .lyric-box {
    top: 50%;
    z-index: 2000;
    text-align: center;
    height: 280px;
    overflow: hidden;
    .text {
      font-size: 18px;
      margin-bottom: 20px;
    }
    ul {
      li {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #fff;
        transition: all .5s;
      }
      .active {
        font-size: 20px;
        color: red;
      }
    }
  }
}
// 定义动画
@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>