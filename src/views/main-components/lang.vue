<style lang="less">
    .lang{
        position: absolute;
        right: 10px;
        top: 0;
        transform: translateY(30%);
        height: 100%;
    }
    .header-aside-lang{
        display: inline-block;
        height: 23px;
        width: 23px;
        border: 1px solid #fff;
        border-radius: 50%;
        padding: 2px;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        color: #fff;
    }
</style>

<template>
    <div class="lang">
        <a v-show="lang == 'zh-CN'" class="header-aside-lang" @click="handleSwitch('en-US')">EN</a>
        <a v-show="lang == 'en-US'" class="header-aside-lang" @click="handleSwitch('zh-CN')">CN</a>
    </div>
</template>

<script>
export default {
    name: 'international',
    data () {
        return {
            lang: 'zh-CN'
        };
    },
    methods: {
        handleSwitch (lang) {
            this.lang = lang;
            localStorage.lang = lang;
            // 如果你要自己实现多语言切换，那么只需要执行这行代码即可，修改语言类型
            this.$store.commit('switchLang', lang);
        }
    },
    created () {
        this.lang = localStorage.lang || 'zh-CN';
    }
};
</script>
