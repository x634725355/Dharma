<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <!-- <transition name="move" mode="out-in"> -->
                    <router-view ></router-view>
                <!-- </transition> -->
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import { store } from './store';

    export default {
        data() {
            return {
            };
        },
        computed: {
            tagsList() {
                return store.state.tagsList;
            },
            collapse() {
                return store.state.collapse;
            }
        },
        components: {
            vHead,
            vSidebar,
            vTags
        },
        created() {
        }
    };
</script>
