<template>
    <div>
        <div class="title">
            <span class="icon"></span>
            <!-- 匿名插槽 -->
            <slot></slot>
        </div>
    </div>
</template>
<style lang="less" scoped>
  @import url(../assets/base.less);
  .title{
      width: 100%;
      height: 24px;
      line-height: 24px;
      font-size: 18px;
      background-color: #fff;
      display: flex;
      align-items: center;
      margin: 8px 0 ;
      .icon{
          display: inline-block;
          vertical-align: middle;
          width: 3px;
          height: 15px;
          background-color:@mainColor ;
          margin-left: 10px;
          margin-right: 10px;
      }
  }
</style>