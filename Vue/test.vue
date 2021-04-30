<template>
    <h1 id="app">
        {{ Text }}
    </h1>
</template>

<script>
const axios = require("axios")

export default {
    data:{
        Text: "Not Init"
    },
    mounted () {

        let result = axios.get("http://localhost:3000").then( (r) => {
            if (r) {
                this.$data.Text = r
                console.log(r)
            }
        
        })

    }
}
</script>