<template>
    <div>
        <button @click="print">😜😜😜</button>
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