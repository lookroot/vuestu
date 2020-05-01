<template>
  <div></div>
</template>
<script>
import axios from "axios";
export default {
  created() {
    //创建一个实例 基础配置
    let httpRequest = axios.create({
      //基本url
      baseURL: "http://localhost:3000",
      //   超时时间
      timeout: 1000,
      //头文件
      Headers: {}
    });

    //全局默认配置
    //超时时间
    axios.defaults.timeout = 1000;
    //基础url
    axios.defaults.baseURL = "";
    //请求拦截器
    // axios.interceptors.request.use(
    //   config => {
    //     //请求发送之前需要作什么
    //     config.headers = {};
    //   },
    //   err => {
    //     return Promise.reject(err);
    //   }
    // );

    //响应拦截器
    // axios.interceptors.response.use(
    //   res => {
    //     //对请求成功的数据处理
    //     return res;
    //   },
    //   err => {
    //     return Promise.reject(err);
    //   }
    // );
    //给当前axios实例配置拦截器和错误拦截
    httpRequest.interceptors.request.use(
      config => {
        config.headers.token = "xxxxxxx";
        return config;
      },
      err => {
        console.log(err);
        return Promise.reject(err);
      }
    );
    httpRequest.interceptors.response.use(
      res => {
        return res;
      },
      err => {
        console.log("response err=>", err);
        return Promise.reject(err);
      }
    );
    httpRequest.get("/get").then(res => {
      console.log(res);
    });
  }
};
</script>