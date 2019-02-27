<template>
    <div class="area" ref="area_scroll" v-if="cities">
        <div class="scroll_wrap">
            <!--热门城市-->
            <div class="hot_wrap cityScroll">
                <div class="title">热门城市</div>
                <ul class="hot_city">
                    <li @click="$emit('selectCity', item)" v-for="item,index in cities.hotCities" :key="index">{{item.name}}</li>
                </ul>
            </div>
            <!--所有城市-->
            <div class="city_wrap">
                <!--按字母排序-->
                <div class="city_content cityScroll" v-for="item,index in keys" :key="index">
                    <div class="title">{{item}}</div>
                    <!--根据字母key展示对应的城市名-->
                    <ul>
                        <li @click="$emit('selectCity', city)" v-for="city,i in cities[item]" :key="i">{{city.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="area_keys">
            <ul>
                <li @click="selected(0)">#</li>
                <li @click="selected(index+1)" v-for="key,index in keys" :key="index">{{key}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Alphabet",
    props: {
      cities: Object,
      keys: Array
    },
    data(){
      return {
        scroll: null
      }
    },
    methods: {
      initScroll(){
        // 实例化滚动条
        this.scroll = new BScroll(this.$refs.area_scroll, {
          click: true
        })
      },
      selected(i){
        // console.log(this.$refs.area_scroll.getElementsByClassName('cityScroll'))
        // 拿到需要滚动的所有元素
        let cityList = this.$refs.area_scroll.getElementsByClassName('cityScroll')
        // 拿到根据点击得到的下标得多对应的元素
        let el = cityList[i]
        this.scroll.scrollToElement(el, 300)
      }
    }
  }
</script>

<style scoped>
    .area {
        margin-top: 10px;
        box-sizing: border-box;
        padding: 0 16px;
        background: #fff;
        height: calc(100% - 65px);
        overflow: hidden;
    }
    .scroll_wrap {
        background: #fff;
        overflow: auto;
    }
    .title {
        color: #aaa;
        padding: 15px 0;
    }
    .hot_city {
        padding: 0 16px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .hot_city li {
        width: 30%;
        background: #f1f1f1;
        margin: 0 10px 10px 0;
        text-align: center;
        padding: 10px;
        box-sizing: border-box;
    }
    .city_content li {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .area_keys {
        position: fixed;
        right: 0;
        top: 25%;
        color: #aaa;
        font-size: 12px;
        line-height: 1.4;
        text-align: center;
        padding: 0 5px;
    }
</style>