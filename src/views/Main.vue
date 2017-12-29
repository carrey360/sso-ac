<style lang="less">
    @import "../styles/theme.less";
    @import "./main.less";
    @import "../styles/common.less";
</style>
<template>
    <div class="main">
        <div class="sidebar-menu-con" :style="{width: '200px', overflow:'auto', fontSize: '12px'}">
            <shrinkable-menu 
                :shrink="false"
                @on-change="handleSubmenuChange"
                :theme="menuTheme"
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
            </shrinkable-menu>
        </div>
        <div class="main-header-con">
            <div class="main-header">
                <div class="header-logo"> 
                    <img src="../images/logo-min.jpg"/>
                    <div class="header-logo-title"> 
                        <h3>uuap</h3> 
                        <h4>统一认证权限</h4> 
                     </div> 
                </div>
                <div class="header-avator-con">
                    <message-tip v-model="mesCount"></message-tip>
                    <language></language>
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                                <i class="fa fa-user-circle-o fa-lg"></i>
                                <span class="main-user-name">{{ userName }}</span>
                                <i class="fa fa-arrow-down fa-lg"></i>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left:'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import messageTip from './main-components/message-tip.vue';
import language from './main-components/lang.vue';
import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export default {
    components: {
        shrinkableMenu,
        messageTip,
        language
    },
    data () {
        return {
            userName: '',
            openedSubmenuArr: this.$store.state.app.openedSubmenuArr
        };
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        },
        cachePage () {
            return this.$store.state.app.cachePage;
        },
        menuTheme () {
            return this.$store.state.app.menuTheme;
        },
        mesCount () {
            return this.$store.state.app.messageCount;
        }
    },
    methods: {
        init () {
            let pathArr = util.setCurrentPath(this, this.$route.name);
            this.$store.commit('updateMenulist');
            if (pathArr.length > 0) {
                this.$store.commit('addOpenSubmenu', pathArr[0].name);
            }
            this.userName = Cookies.get('user');
            this.$store.commit('setMessageCount', 3);
        },
        handleClickUserDropdown (name) {
            if (name === 'ownSpace') {
                this.$router.push({
                    name: 'ownspace_index'
                });
            } else if (name === 'loginout') {
                // 退出登录
                this.$store.commit('logout', this);
                this.$router.push({
                    name: 'login'
                });
            }
        },
        handleSubmenuChange (val) {}
    },
    watch: {
        '$route' (to) {
            this.$store.commit('setCurrentPageName', to.name);
            let pathArr = util.setCurrentPath(this, to.name);
            if (pathArr.length > 0) {
                this.$store.commit('addOpenSubmenu', pathArr[0].name);
            }
            localStorage.currentPageName = to.name;
        },
    },
    mounted () {
        this.init();
    }
};
</script>
