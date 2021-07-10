<template>
  <div class="res">
    <ul>
      <li>
        <a href="javascript:;">搜索"{{keywords}}"</a>
      </li>
      <li v-for="(item, index) in bestList" :key="item.id">
        <span class="icon fa fa-search" aria-hidden="true"></span>
        <span class="text">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    
  props: {
    bestList: {
      type: Array,
    },
    keywords:{

    }
  }
   
};
</script>

<style lang="less" scoped>
.res {
  a {
    font-size: 18px;
  }
  width: 100%;
  ul {
    li {
      height: 53px;
      border-bottom: 1px solid #ccc;
      line-height: 53px;
      padding: 0 10px;

      span {
        display: inline-block;
        margin: 0 5px;
      }
      .icon {
        width: 40px;
        height: 40px;
        color: #bcbdbd;
        vertical-align: middle;
        line-height: 40px;
      }
      .text {
        font-size: 15px;
      }
    }
  }
}
</style>