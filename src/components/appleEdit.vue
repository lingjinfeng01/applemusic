<template>
  <div>
    <a href="#">
      <div class="content">
        <div class="right-top">
          <span class="icon fa fa-weixin"></span>
          <span class="count">{{opt.count/10000}}亿</span>
        </div>
        <div class="image-box">
          <img :src="opt.url" alt="" />
        </div>
        <div class="title-box">{{opt.name}}</div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
    props:{
        opt:{
            type:Object
        }
    }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  position: relative;
  .right-top {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    padding: 2px 5px;
    font-size: 12px;
    .icon {
      margin: 0 2px;
    }
    .count {
      font-family: Arial, Helvetica, sans-serif;
    }
  }
}
.image-box {
  width: 100%;
  height: 120px;
  overflow: hidden; 
  text-align: center;
  img {
    width: 100%;
    vertical-align: middle;
    background-color: #ccc;
  }
}
.title-box {
  width: 100%;
  height: 42px;
  box-sizing: border-box;
  line-height: 1.5;
  padding: 2px 5px;
  font-size: 14px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>