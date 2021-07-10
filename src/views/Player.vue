<template>
  <div class="music-box">
    <div class="box-wrapper">
      <!-- 播放控件 -->
      <div class="wrapper" v-if="optItem" @click="showLayout">
        <ul class="control">
          <li>
            <!-- 图标 -->
            <div :class="['img-box', { current: isPlayState }]">
              <img :src="optItem.url" alt="" />
            </div>
          </li>
          <li>
            <!-- 文字 -->
            <p class="txt-box">
              <span>{{ message }}</span>
            </p>
          </li>
          <li>
            <!-- 进度提示 -->
            <div @click.stop="toggle" class="ctx-box">
              <canvas ref="canvas"></canvas>
              <span>{{ trip }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 多媒体标签（audio） -->
      <div class="wrapper" v-if="optItem">
        <audio
          autoplay
          controls
          ref="audio"
          @timeupdate="timeupdate"
          @end="end"
          @play="play"
          @pause="pause"
          @canplay="canplay"
          :src="`https://music.163.com/song/media/outer/url?id=${optItem.id}.mp3`"
        ></audio>
      </div>
    </div>

    <!-- 满屏界面（详细信息） -->
        <div>
        <transition
          :duration="{enter:800,leave:500}"
          enter-active-class="animate__animated animate__fadeInUpBig"
          leave-active-class="animate__animated animate__lightSpeedOutLeft"
          >
              <full-layout
                  v-if="isShowLayout"
                  @slide-out="hideLayout"
                  @music-play="togglePlay"
                  :curTime="currentTime"
                  :totTime="totalTime"
                  :musicItem="optItem"
                ></full-layout>
          </transition> 
    </div>
     
  </div>
</template>
<script>
import fullLayout from "../components/base/fullLayout.vue";
export default {
  name: "Player",
  data() {
    return {
      isPlayState: false,
      message: "",
      currentTime: 0,
      totalTime: 0,
      trip: "暂停",
     isShowLayout:false,
    };
  },
  components: {
    fullLayout,
  },
  props: {
    optItem: {
      type: Object,
      default: null,
    },
  },
  watch: {
    optItem(value) {
      this.isPlayState = false;
    },
  },
  methods: {
    //绘制圆
    drawCircle(current, total) {
      let canvas = this.$refs.canvas;
      let w = window.innerWidth;
      if (w >= 375) {
        w = 375;
      }
      let size = (w / 375) * 37.5;
      //设置画布的大小
      canvas.width = size;
      canvas.height = size;

      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let draw = (x, y, r, s, e, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.arc(x, y, r, (s * Math.PI) / 180, (e * Math.PI) / 180, false);
        ctx.stroke();
        ctx.closePath();
      };
      let x = size / 2;
      let y = size / 2;
      let r = 15;
      draw(x, y, r, 0, 360, "white");

      //
      let demo = current / total;
      draw(x, y, r, 0, 360 * demo, "#f85146");
    },
    loopText() {
      let s = this.message.slice(0, 1);
      let e = this.message.slice(1);
      let str = e + s;
      this.message = str;
    },
    canplay() {
      // 音乐时间的总长度
      this.totalTime = this.$refs.audio.duration;
    },
    //音频播放
    timeupdate() {
      //当前播放时间
      this.currentTime = this.$refs.audio.currentTime;
      this.$nextTick(() => {
        this.drawCircle(this.currentTime, this.totalTime);
      });
      this.loopText();
    },
    end() {},
    //播放
    play() {
      this.isPlayState = false;
      this.$refs.audio.play();
    },
    // 暂停
    pause() {
      this.isPlayState = true;
      this.$refs.audio.pause();
    },
    toggle() {
      if (this.isPlayState) {
        this.play();
        this.trip = "暂停";
      } else {
        this.pause();
        this.trip = "播放";
      }
      this.$emit("item-out", this.isPlayState);
    },

    //显示满屏
    // 显示歌曲信息界面
    showLayout(){
      this.isShowLayout = true;
      console.log(111121);
    },
    // 隐藏歌曲信息界面
    hideLayout(isShow){
      this.isShowLayout = isShow;
    },
    // 子组件控制播放或暂停
    togglePlay(isPlay){
      console.log(isPlay)
      if(isPlay){
          this.play();
      }else {
          this.pause();
      }
    }
    
    //切换播放暂停
  },
  created() {
    this.message = this.optItem.name + "/";
  
  },
  mounted() {

    console.log(this.optItem);
  },
};
</script>
<style lang="less" scoped>
.music-box {
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
.box-wrapper {
  width: 100%;
  height: 50px;
  position: relative;
  .wrapper {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
  }
  > div {
    &:nth-of-type(1) {
      z-index: 1000;
    }
  }
}
.control {
  width: 100%;
  height: 50px;
  display: flex;
  font-size: 20px;
  padding: 0 10px;
  align-items: center;
  justify-content: space-between;
  li {
    &:nth-of-type(2) {
      flex-grow: 1;
    }
  }
}
.img-box {
  width: 45px;
  height: 45px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #ccc;
  border: 3px solid #fff;
  // 设置动画
  animation-name: loop;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  img {
    width: 45px;
    height: 45px;
    vertical-align: middle;
  }
}
.img-box.current {
  animation-play-state: paused;
}
.txt-box {
  span {
    font-size: 14px;
    color: #fff;
  }
}
.ctx-box {
  width: 48px;
  height: 48px;
  background-color: #ccc;
  position: relative;
  canvas {
    width: 48px;
    height: 48px;
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 48px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 12px;
  }
}
// 定义动画
@keyframes loop {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// 隐藏元素 透明  宽度 高度
audio {
  opacity: 0;
  width: 0;
  height: 0;
}
// 辅助
.bg-red {
  background-color: red;
}
.bg-blue {
  background-color: blue;
}
</style>