<template>
    <div class="p01" >momoHome</div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
    props: {},
    name: "momoHome",
    setup(props, { attrs, slots, emit }) {
        const momo = ref([]);

        momo.value.push(123);

        return {
            momo
        }
    },
    data() {
        return {
        };
    },
}
</script>

<style scoped>

</style>