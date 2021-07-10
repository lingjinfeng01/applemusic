<template>
     <div class="layout">
          <div class="seacher">
              <span class="icon"></span>
              <input type="text" placeholder="搜索歌曲、歌手、专辑">
          </div>
     </div>
</template>

<style lang="less" scoped>
 .layout{
     width: 100%;
     height: 50px;
     border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      line-height: 30px;
    
     .seacher{
          width: 90%;
          height: 30px;
          padding: 0px 5px;
          box-sizing: border-box;
          margin: 10px auto ;
          border-radius: 15px;
          overflow: hidden;
          background-color: #ebecec;
       
          display: flex;
       
            .icon{
               display: inline-block;
               width: 30px;
               height: 30px;
               background-color: #ebecec;
                vertical-align: middle;
           }
          input{
              width: 90%;
              height: 30px;
              background-color: #ebecec;
              line-height: 30px;
            
          }

           
     }
 }

</style>