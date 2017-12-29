<style lang="less">
    .header-aside-lang{
        display: inline-block;
        height: 16px;
        width: 16px;
        border: 1px solid #fff;
        border-radius: 50%;
        // padding: 2px;
        text-align: center;
        line-height: 16px;
        font-size: 12px;
        color: #fff;
    }
</style>

<template>
    <div style="display:inline-block;padding:0 6px;">
        <a v-show="lang == 'zh-CN'" class="header-aside-lang" @click="handleSwitch('en-US')">E</a>
        <a v-show="lang == 'en-US'" class="header-aside-lang" @click="handleSwitch('zh-CN')">C</a>
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
