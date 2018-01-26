<template>
  <Row >
        <div class="demo-spin-col" :style="{height:$props.height}">
            <Spin fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>加载中,请稍候...</div>
            </Spin>
        </div>
    </Row>
</template>
<script>
    import { Row, Spin, Icon } from 'iview'
    export default{
      components: {
        Row,
        Spin,
        Icon
      },
      props: {
        height: {
          type: String,
          default: '750px'
        }
      }
    }
</script>
<style lang="less">
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height:100vh;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index:990;
    }
</style>
