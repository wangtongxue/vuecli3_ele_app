<template>
    <div class="city">
        <div class="search_wrap">
            <div class="search">
                <i class="fa fa-search"></i>
                <input v-model="city_val" type="text" placeholder="请输入城市名">
            </div>
            <button @click="$router.push({ name: 'address', params: {city: city} })">取消</button>
        </div>
        <div style="height: 100%" v-if="searchCity.length === 0">
            <!--<div>-->
                <Location @click="selectCity({name: city})" :address="city"></Location>
            <!--</div>-->
            <Alphabet ref="allCity" @selectCity="selectCity" :cities="cities" :keys="keys"></Alphabet>
        </div>
        <div class="search_list" v-else>
            <ul>
                <li @click="selectCity(item)" v-for="item,index in searchCity" :key="index">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
  import Location from '../components/Location'
  import Alphabet from '../components/Alphabet'
  export default {
    name: "City",
    components: {
      Location,
      Alphabet
    },
    data(){
      return {
        city_val: '', // 输入的城市信息
        cities: null,
        keys: [],
        allCities: [],
        searchCity: []
      }
    },
    watch: {
      city_val(){ // 监控搜索输入框
        if(!this.city_val){
          this.searchCity = []
        }else {
          this.searchCity = this.allCities.filter(item => {
            return item.name.indexOf(this.city_val) != -1
          })
          console.log(this.searchCity)
        }
      }
    },
    computed: {
      city() {
        return this.$store.getters.location.addressComponent.city || this.$store.getters.location.addressComponent.province
      }
    },
    created(){
      this.getCities()
    },
    methods: {
      getCities(){ // 获取城市数据信息的接口
        this.$http.get("/api/posts/cities")
          .then(res => {
            this.cities = res.data // 拿到返回的所有数据
            this.keys = Object.keys(res.data) // 获取到所有的key
            this.keys.pop() // 删除最后一个key
            this.keys.sort() // 对key进行排序
            this.$nextTick(() => { // 在dom渲染之后执行
              if(this.$refs.allCity){
                this.$refs.allCity.initScroll() // 父组件调用子组件中的方法
              }
            })

            // 解析获得所有的城市
            this.keys.forEach((item) => {
              // console.log(item)
              this.cities[item].forEach(i => {
                // console.log(i.name)
                this.allCities.push(i)
              })
            })
          })
          .catch(err => {
            console.log(err)
          })
      },
      selectCity(city){
        // console.log(city)
        this.$router.push({name: 'address', params: {
          city: city.name
        }})
      }
    }
  }
</script>

<style scoped>
    .city {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }
    .search_wrap {
        position: fixed;
        top: 0;
        height: 45px;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        padding: 3px 16px;
        display: flex;
        justify-content: space-between;
    }
    .search {
        background-color: #eee;
        border-radius: 10px;
        line-height: 40px;
        width: 85%;
        box-sizing: border-box;
        padding: 0 16px;
    }
    .search input {
        background: #eee;
        outline: none;
        border: none;
        margin-left: 5px;
    }
    .search_wrap button {
        outline: none;
        color: #009eef;
        background-color: #fff;
        border: none;
    }
    .location {
        background: #fff;
        padding: 8px 16px;
        height: 65px;
        box-sizing: border-box;
    }
    .search_list {
        background: #fff;
        padding: 5px 16px;
    }
    .search_list li {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
</style>