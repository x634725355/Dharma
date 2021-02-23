<template>
    <div class="tags" v-if="showTags">
        <ul>
            <li class="tags-li" v-for="(item, index) in tagsList" :class="{ active: isActive(item.path) }">
                <div class="tags-li-title" @click="tagLink(item)">{{ item.title }}</div>
                <span class="tags-li-icon" @click="closeTags(index)">
                    <i class="el-icon-close"></i>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="mini" type="primary">
                    标签选项
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown >
                    <el-dropdown-menu size="small" >
                        <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                        <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { store } from "./store";

export default {
    data() {
        return {
        };
    },
    computed: {
        tagsList: {
            get() {
                return store.state.tagsList;
            }
        },
        showTags() {
            return this.tagsList.length > 0;
        }
    },
    methods: {
        tagLink(item) {
            this.$router.push({ path: item.path });
        },
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭单个标签
        closeTags(index) {
            store.closeTags(index, this);
        },
        // 关闭全部标签
        closeAll() {
            store.closeAll();
            this.$router.push('/');
        },
        // 关闭其他标签
        closeOther() {
            store.closeOther(this.$route.fullPath);
        },
        // 设置标签
        setTags(route) {
            store.setTags(route);
        },
        handleTags(command) {
            command === 'other' ? this.closeOther() : this.closeAll();
        }
    },
    watch: {
        $route(newValue, oldValue) {
            this.setTags(newValue);
        }
    },
    created() {
        store.created();

        this.setTags(this.$route);
        // 监听关闭当前页面的标签页
        // store.closeCurrentTags = store.closeCurrentTags.bind(this);
     
    }
};
</script>


<style>
.tags {
    position: relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
    float: left;
    margin: 3px 5px 2px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
    color: #fff;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
}

.tags-li.active .tags-li-title {
    color: #fff;
}

.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
