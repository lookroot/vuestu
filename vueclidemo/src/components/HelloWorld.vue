<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      user: {
        name: "zhangsan",
        age: 11,
        sex: 1,
        avatar:
          "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg"
      }
    };
  },
  methods: {
    // get请求
    getData() {
      axios
        .get("http://localhost:3000/get", {
          params: {
            name: "lili"
          }
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      // axios({
      //   method: "get",
      //   url: "http://localhost:3000/get"
      // }).then(res => {
      //   console.log(res.data);
      // });
    },
    // post
    postData() {
      axios.post("http://localhost:3000/post", this.user).then(res => {
        console.log(res);
      });
    },
    // post formdata 方式
    postDataFormData() {
      let formdata = new FormData();
      for (let key in this.user) {
        formdata.append(key, this.user[key]);
      }
      axios({
        method: "post",
        data: formdata,
        url: "http://localhost:3000/postformdata"
      }).then(res => {
        if (res.data.code == 200) {
          alert("添加成功");
        }
      });
    },
    //delete
    delData() {
      axios
        .delete("http://localhost:3000/del", {
          params: {
            name: "zhangsan"
          }
          // 请求头方式
          // data: {
          //   name: "zhangsan"
          // }
        })
        .then(res => {
          if (res.data.code == 200) {
            alert("删除成功");
          }
        });
    },
    // put
    updateData() {
      axios.put("http://localhost:3000/put", this.user).then(res => {
        if (res.data.code == 200) {
          alert("更新成功");
        }
      });
    },
    // 并发请求
    getAllData() {
      axios
        .all([
          axios.get("http://localhost:3000/sexlist"),
          axios.get("http://localhost:3000/get")
        ])
        .then(
          axios.spread((sexRes, userRes) => {
            console.log(sexRes);
            console.log(userRes);
          })
        );
    },
    //取消请求
    cancelRequest() {
      // 存储一个 token作为 axios请求标识符
      let tokenData = axios.CancelToken.source();
      axios
        .get("http://localhost:3000/get", {
          params: {
            name: "lili"
          },
          // 传入这个token
          cancelToken: tokenData.token
        })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
        // 取消请求
        tokenData.cancel("用户取消了操作");
    }
  },
  created() {
    // this.cancelRequest();
  }
};
</script>

<style scoped>
</style>
