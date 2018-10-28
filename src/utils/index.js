import axios from "axios"
import {Message} from 'element-ui';
const env = process.env.NODE_ENV //在生产环境时，将会被设置为production
let baseURL = env == "development" ? "/api" : "/"

const instance = axios.create({
  baseURL,
  timeout: 10000
});

const xhr = {
    get(url,data,config){
        return new Promise((resolve,reject)=>{
            instance.get(url,{params:data},config).then(res=>{
                if (res.code == 401) {
                    Message.err("登录状态失效,正在跳转登录页面")
                    router.push("/login")
                }
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    fetch(url,data,config,methods){
        return new Promise((resolve,reject)=>{
            instance[methods](url,data,config).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    post(url,data,config){
        return this.fetch(url,data,config,"post")
    }
}
export default xhr