<template>
    <div class="text_group">
        <!--组件结构-->
        <!--组件容器-->
        <div class="input_group" :class="{'is-invalid':error}">
            <input
                :type="type"
                :value="value"
                :placeholder="placeholder"
                :name="name"
                @input="$emit('input', $event.target.value)">
            </input>
            <!--input后边的点击验证码的按钮-->
            <button
                v-if="btnTitle"
                :disabled="disabled"
                @click="$emit('btnClick')"
            >{{btnTitle}}</button>
        </div>
        <!--错误提醒-->
        <div v-if="error" class="invalid_feedback">{{error}}</div>
    </div>
</template>

<script>
  export default {
    name: "InputGroup",
    props: {
      type: { // input框类型
        type: String,
        default: "text"
      },
      value: String, // input的value值
      placeholder: String, // input默认显示的值
      btnTitle: String, // 是否拥有获取验证码这几个字
      name: String,
      disabled: Boolean, // 按钮当前是不是可以
      error: String
    }
  }
</script>

<style scoped>
    .input_group {
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .input_group input {
        height: 100%;
        width: 60%;
        outline: none;
        border: 0;
    }
    .input_group button {
        border: none;
        outline: none;
        background: #fff;
    }
    .input_group button[disabled] {
        color: #aaa;
    }
    .is-invalid {
        border: 1px solid red;
    }
    .invalid_feedback {
        color: red;
        padding-top: 5px;
    }
</style>