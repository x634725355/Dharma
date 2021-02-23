<template>
    <div class="p01" >dashboard</div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
    props: {},
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