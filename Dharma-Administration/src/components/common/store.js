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

        this.state.message = ''
    }
}