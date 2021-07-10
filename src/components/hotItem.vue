<template>
  <div class="music-list">
    <a href="javascript:;">
      <div class="list-item">
        <div class="left">
          <h3>{{ opt.name }}</h3>
          <p>
            <span :class="{ icon: opt.count > 990000 }">
              <!-- {{ opt.song.privilege.playMaxbr | toneQuality }} -->
            </span>
            <span class="author" v-for="(item,index) in opt.author" :key="item.id">
              {{item.name}}
            </span>
            <span>
              -{{opt.name}}
            </span>
            
          </p>
        </div>
        <div class="right">
          <button
            :data-index="num"
            :class="[{ active: flag }]"
            @click="addTap({ num,option:opt})"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-right"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
              />
            </svg>
          </button>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      flag: false,
    };
  },
  props: {
    num: {
      type: Number,
    },
    opt: {
      type: Object,
    },
  },
  methods: {
    addTap(obj) {

      this.$emit("item-index", obj);
    },
  },
  mounted() {
      
  },
  filters: {
    toneQuality(value) {
    
      let str = value > 32000 ? "高级" : "标准";
      return str;
    },
  },
};
</script>
<style lang="less" scoped>
@import url("../assets/base.less");
.music-list {
  margin-top: 15px;
  a {
    display: block;
    width: 100%;
  }
}
.music-list.active {
  .list-item {
    .right {
      button {
        color: @mainColor;
        border: 2px solid @mainColor;
      }
    }
  }
}
.list-item {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .left {
    width: calc(100% -30px);
    line-height: 1.5;
  }
  h3 {
    font-weight: normal;
    font-size: 18px;
    color: #000;
  }
  p {
    width: 100%;
    height: 22px;
    font-size: 14px;
    color: #666;
    //   font-family: Microsoft Yahei;
    text-overflow: ellipsis;
    //   white-space: nowrap;
    word-break: normal;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    .icon {
      display: inline-block;
      height: (16px * (2/3));
      width: (24px * (2/3));
      background-image: url("../assets/spirit.png");
      background-size: (332px * (2/3)) (194px * (2/3));
      background-position: 0 0;
    }
  }
}
.right {
  width: 30px;
  height: 56px;
  button {
    background-color: transparent;
    color: #666;
    border: 2px solid #666;
    width: 30px;
    height: 30px;
    margin-top: ((56px - 30) /2);
    box-sizing: border-box;
    text-align: center;
    border-radius: 50%;
    svg {
      width: 20px;
      vertical-align: middle;
    }
    span {
      font-weight: normal;
      color: #ccc;
    }
    .active {
      color: @mainColor;
      border: 2px solid @mainColor;
    }
  }
}
</style>