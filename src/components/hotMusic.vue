<template>
  <div class="layout">
    <div>
      <ul>
        <li>  
            <span class="icon"
            > 
            </span>
        </li>
        <li>
          <span class="txt">时间</span>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>

export default {
    
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  // height: 125px;
  background:url('../assets/bg-img.jpg') no-repeat;
  > div {
    
      // border: 1px solid #000;
      padding: 10px 20px 0;
    ul {
      li {
          padding: 5px;
        
      }
    }
  }
}
      .icon{
           width: 100%;
          //  border: 1px solid #000;
            display: inline-block;
            height: (180px *(2/3));
            background: url("../assets/spirit.png") no-repeat;
            background-position: (-47px*(2/3)) (-45px*(2/3));
            background-size:(332px*(2/3)) (194px*(2/3));
          }
          .txt{
            color: #fff;
            font-size: 15px;
            line-height: 40px;
          }
</style>