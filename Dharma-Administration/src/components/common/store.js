import { reactive } from "vue";

export const store = {
    debug: true,

    state: reactive({
        message: 'Hello!',
        collapse: false,
        tagsList: []
    }),

    collapseContent(msg) {
        this.state.collapse = msg;
    },

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    tags(msg) {
        let arr = [];
        for (let i = 0, len = msg.length; i < len; i++) {
            if (msg[i].name == '') {

            }
            msg[i].name && arr.push(msg[i].name);
        }
        this.state.tagsList = arr;
    },

    // 监听关闭当前页面的标签页
    closeCurrentTags() {
        for (let i = 0, len = this.tagsList.length; i < len; i++) {
            const item = this.tagsList[i];
            if (item.path === this.$route.fullPath) {
                if (i < len - 1) {
                    this.$router.push(this.tagsList[i + 1].path);
                } else if (i > 0) {
                    this.$router.push(this.tagsList[i - 1].path);
                } else {
                    this.$router.push('/');
                }
                this.tagsList.splice(i, 1);
                break;
            }
        }
    },

    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    collapse(msg) {
        this.collapseContent(msg);
    },

    setMessageAction(newValue) {
        if (this.debug) {
            console.log('setMessageAction triggered with', newValue)
        }

        this.state.message = newValue
    },

    clearMessageAction() {
        if (this.debug) {
            console.log('clearMessageAction triggered')
        }

        this.state.message = '';
    },

    // 操作tagsList数组
    setTags(route) {
        console.log('设置标签', route);

        const isExist = this.state.tagsList.some((item) => {
            return item.path === route.fullPath;
        });

        if (!isExist) {
            if (this.state.tagsList.length >= 8) {
                this.state.tagsList.shift();
            }
            
            this.state.tagsList.push({
                title: route.meta.title,
                path: route.fullPath,
                name: route.name
            });

            console.log("进来了", this.state.tagsList);
        }

        this.tags(this.state.tagsList);
        // 将当前路由放在sessionStorage里面
        sessionStorage.setItem('route', JSON.stringify(this.state.tagsList));
    },

    // 关闭其他标签
    closeOther(fullPath) {
        const curItem = this.state.tagsList.filter((item) => {
            return item.path === fullPath;
        });
        this.state.tagsList = curItem;
    },

    // 关闭全部标签
    closeAll() {
        this.state.tagsList = [];
    },

    // 关闭单个标签
    closeTags(index, that) {
        const delItem = this.state.tagsList.splice(index, 1)[0];
        const item = this.state.tagsList[index] ? this.state.tagsList[index] : this.state.tagsList[index - 1];
        if (item) {
            delItem.path === that.$route.fullPath && that.$router.push(item.path);
        } else {
            that.$router.push('/');
        }
    },

    // 初始化
    created() {
        const route = JSON.parse(sessionStorage.getItem('route'));
        if (route) {
            this.state.tagsList = route;
        }
    },
}