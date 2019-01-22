<template>
    <div>
        <button @click="print">这是真的吗</button>
    </div>
</template>

<script>
    export default {
        name: 'Btn',
        props: {
            text: {
                type: String,
                default: ''
            },
        },
        methods: {
            print() {
                alert('HELLO WORD!')
            }
        },
    }
</script>

<style scoped>

</style>