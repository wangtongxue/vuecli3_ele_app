<template>
    <div class="address">
        <Header title="选择收获地址" :isLeft="true"></Header>
        <div class="city_search">
            <div class="search">
                <span class="city" @click="$router.push('/city')">
                    {{city}}
                    <i class="fa fa-angle-down"></i>
                </span>
                <i class="fa fa-search"></i>
                <input type="text" v-model="search_val" placeholder="小区/写字楼/学校等">
            </div>
            <Location @click="selectAddress" :address="address"></Location>
        </div>
        <div class="area">
            <ul class="area_list" v-for="(item, index) in areaList" :key="index">
                <li @click="selectAddress(item)">
                    <h4>{{item.name}}</h4>
                    <p>{{item.district}}{{item.address}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import Header from '../components/header'
  import Location from '../components/Location'
  export default {
    name: "Address",
    components: {
      Header,
      Location
    },
    watch: {
      search_val(){
        this.searchPlace()
      },
      // city(newVal, oldVal){
      //   if(newVal){
      //     this.city1 = newVal
      //   }
      // }
    },
    data(){
      return {
        city: '',
        city1: '',
        search_val: '',
        areaList: []
      }
    },
    methods: {
      searchPlace(){
        const that = this
        AMap.plugin('AMap.Autocomplete', function(){
          // 实例化Autocomplete
          let autoOptions = {
            //city 限定城市，默认全国
            city: that.city // 限定在当前定位的城市中
          }
          let autoComplete= new AMap.Autocomplete(autoOptions);
          autoComplete.search(that.search_val, function(status, result) {
            // 搜索成功时，result即是对应的匹配数据
            console.log(result)
            that.areaList = result.tips
          })
        })
      },
      selectAddress(item){
        if(item){
          this.$store.dispatch("setAddress", item.district + item.address + item.name)
        }else {
          this.$store.dispatch("setAddress", this.address)
        }
        this.$router.push('/home')
      }
    },
    computed: {
      address(){
        return this.$store.getters.address
      }
    },
    beforeRouteEnter(to, from, next ){
      next(vm => {
        if(to.params.city){
          vm.city = to.params.city
        }
        // else {
        //   vm.city = vm.city1
        // }
      })
    }
  }
</script>

<style scoped>
    .address {
        width: 100%;
        height: 100%;
        overflow: auto;
        box-sizing: border-box;
        padding-top: 45px;
    }

    .city_search {
        background-color: #fff;
        padding: 10px 20px;
        color: #333;
    }

    .search {
        background-color: #eee;
        height: 40px;
        border-radius: 10px;
        box-sizing: border-box;
        line-height: 40px;
    }
    .search .city {
        padding: 0 10px;
    }
    .city i {
        margin-right: 10px;
    }
    .search input {
        margin-left: 5px;
        background-color: #eee;
        outline: none;
        border: none;
    }

    .area {
        margin-top: 16px;
        background: #fff;
    }
    .area li {
        border-bottom: 1px solid #eee;
        padding: 8px 16px;
        color: #aaa;
    }
    .area li h4 {
        font-weight: bold;
        color: #333;
        margin-bottom: 5px;
    }
</style>