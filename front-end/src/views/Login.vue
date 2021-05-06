<template>
    <v-main>
        <Form @submit="onSubmit">
            <Field name="email" type="email" :rules="validateEmail"/>
        </Form>
    </v-main>
</template>

<script>
    import { Field, Form } from "vee-validate"

    export default {
        components:{ 
            Form,
            Field
        },
        methods:{
            onSubmit(values){
                //@todo use ClientAPI
            },
            validateEmail(value) {
                //is empty
                if (!value) return 'This field is required'

                //is not valid email
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                    return 'This field must be a valid email';
                }

                return true;
            }
        }
    }
</script>
