<template>
  <div class="loading">
    <ul>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
// 重复使用的代码
@import url(../../assets/base.less);
.loading {
  width: 100%;
  height: 100px;
  ul {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    li {
      width: 12px;
      height: 12px;
      background-color: @mainColor;
      border-radius: 50%;
      margin: 0 5px;
      // 动画名称
      animation-name: scale;
      // 动画持续的时间
      animation-duration: .5s;
      // 动画速度
      animation-timing-function: linear;
      // 动画次数
      animation-iteration-count: infinite;
      // 延迟执行动画
      &:nth-of-type(1) {
          animation-delay: 0s;
      }
      &:nth-of-type(2) {
           transform: scale(1);
           animation-delay: .4s;
      }
      &:nth-of-type(3) {
           transform: scale(1.2);
           animation-delay: .8s;
      }
    }
  }
}

// 动画动画
@keyframes scale {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>