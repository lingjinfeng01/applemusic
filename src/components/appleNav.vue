<template>
  <div class="nav">
    <ul>
      <li :class="index==0?'active':''"  ref="act" >
        <span @click="toggle(0,$event)">推荐音乐</span>
      </li>
       <li :class="index==1?'active':''">
          <span @click="toggle(1,$event)">热歌榜</span>
      </li>
      <li :class="index==2?'active':''">
         <span @click="toggle(2,$event)">搜索</span>
      </li>
    </ul>
    <div class="line" 
    :style="`left:${left}px;width:${width}px;`"></div>
  </div>
</template>
<script>
export default {
  name: "appleNav",
  data() {
    return {
      index: 0,
      left :0,
      width:0
    }
  },
  methods:{
      toggle(index,event){
          //获取索引值
          this.index  = index ;

          let el = event.target;
          if(el.tagName == "SPAN"){
              let x = el.offsetLeft;
              let w = el.offsetWidth;
              this.left = x;
              this.width = w;
              this.$emit('nav-item',this.index);
              
          }
      }
  },
  mounted(){
      this.$nextTick(()=>{
        let el = this.$refs.act;
        let element = el.children[0];
        this.left = element.offsetLeft;
        this.width = element.offsetWidth;
      })
  }
};
</script>
<style lang="less" scoped>
.nav {
  width: 100%;
  height: 42px;
  background-color: #ffffff;
  border-bottom: 2px solid #f0f0f0;
  position: relative;
  ul {
    width: 100%;
    height: 42px;
    display: flex;
    li {
      flex: 0 0 33.33333%;
      height: 40px;
      font-size: 15px;
      text-align: center;
      line-height: 40px;
      span {
        display: inline-block;
        height: 40px;
        vertical-align: middle;
        padding: 0 5px;
        font-family: Arial, Helvetica, sans-serif;
        border-bottom: 2px solid transparent;
      }
     
    }
     li.active {
        span {
          color: #f00;
        }
      }
  }
  .line {
    width: 100px;
    height: 2px;
    position: absolute;
    background-color: #f00;
    bottom: 0;
    left: 5px;
    transition: all 0.2s;
  }
}
</style>