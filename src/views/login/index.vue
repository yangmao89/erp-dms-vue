<template>
    <div class="login-container">
        <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" label-position="left">
            <div class="title-container">
                <h3 class="title">{{$t('login.login')}}</h3>
            </div>

            <el-form-item prop="username">
                <el-input
                        v-model="loginForm.username"
                        placeholder="Username"
                        name="username"
                        type="text"
                />
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                        v-model="loginForm.password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        @keyup.enter.native="handleLogin"
                />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                loginForm: {
                    username: 'admin',
                    password: '111111'
                },
                rules: {
                    username: [{ required: true, trigger: 'blur'}],
                    password: [{ required: true, trigger: 'blur'}]
                },
                redirect: undefined,
                otherQuery: {},
                loading: false
            }
        },
        watch: {
            $route: {
                handler: function(route){
                    const query = route.query;
                    this.redirect = query.redirect;
                    this.otherQuery = this.getOtherQuery(query);
                },
                immediate: true
            }
        },
        methods: {
            handleLogin(){
                this.$refs.loginForm.validate((isValid) => {
                    if(isValid){
                        this.loading = true;
                        this.$store.dispatch("user/login", this.loginForm)
                            .then(() => {
                                this.$router.push({path: this.redirect || "/", query: this.otherQuery})
                                this.loading = false
                            })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        return false;
                    }
                })
            },
            getOtherQuery(query){
                return Object.keys(query).reduce((acc, cur)=>{
                    if(cur != 'redirect'){
                        acc[cur] = query[cur];
                    }
                    return acc;
                }, {})
            }
        }
    }
</script>


<style lang="scss">
    /* 修复input 背景不协调 和光标变色 */
    /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

    $bg:#283443;
    $light_gray:#fff;
    $cursor: #fff;

    @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
        .login-container .el-input input {
            color: $cursor;
        }
    }

    /* reset element-ui css */
    .login-container {
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;

            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: $light_gray;
                height: 47px;
                caret-color: $cursor;

                &:-webkit-autofill {
                    box-shadow: 0 0 0px 1000px $bg inset !important;
                    -webkit-text-fill-color: $cursor !important;
                }
            }
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
    }
</style>

<style lang="scss" scoped>
    $bg:#2d3a4b;
    $dark_gray:#889aa4;
    $light_gray:#eee;

    .login-container {
        min-height: 100%;
        width: 100%;
        background-color: $bg;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 100%;
            padding: 160px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                color: $light_gray;
                margin: 0px auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
            user-select: none;
        }

        .thirdparty-button {
            position: absolute;
            right: 0;
            bottom: 6px;
        }

        @media only screen and (max-width: 470px) {
            .thirdparty-button {
                display: none;
            }
        }
    }
</style>
