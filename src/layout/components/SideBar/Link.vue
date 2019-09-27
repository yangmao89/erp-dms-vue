<template>
    <component v-bind="linkProps(to)">
        <slot/>
    </component>
</template>

<script>
    import {isExternal} from '@/utils/validate'
    export default{
        props: {
            to: {
                type: String,
                required: true
            }
        },
        methods: {
            linkProps(path){
                if(isExternal(path)){
                    return {
                        is: 'a',
                        href: path,
                        target: '_blank',
                        rel: 'noopener'
                    }
                } else {
                    return {
                        is: 'router-link',
                        to: path
                    }
                }
            }
        }
    }
</script>