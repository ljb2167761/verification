import axios from "axios";

axios.defaults.timeout = 100000;
// develop测试
// axios.defaults.baseURL = "http://101.201.224.177:7011";

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config:any) => {
    config.headers = {
      "Content-Type": "application/json",
    };
    let token = "";
    const queryData = window?.location?.hash?.split("?")[1]?.split("=") || [];
    if (queryData.length > 0) {
      queryData.map((item, index) => {
        if (item === "token") {
          token = queryData[index + 1];
        }
      });
    }
    if (token) {
      // config.headers.token = userInfor.token;    //将token放到请求头发送给服务器
      config.headers.Authorization = token;
      // config.url = `${config.url}?token=${userInfor.token}`;
      return config;
      //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
      // config.headers['accessToken'] = Token;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    // develop测试打开if，打包时注释
    if (response?.data?.systemCode === 401) {
      // message.error(response?.data?.msg || '没有权限');
      localStorage.setItem("userInfor", '');
      window.location.href = "/#/login";
      return;
    }
    // develop测试打开if，打包时注释
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
  }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
export function get(url:any, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
    }).then((response) => {
      resolve(response?.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url:any, data:Object, config = false) {
  //  url =`${url}?token=${}`
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response?.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
/**
 * 封装post formData请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postFormData(url:any, data:Object, config:any) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config).then(
      (response) => {
        //关闭进度条
        resolve(response?.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
/**
 * 封装postDownload下载请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function postDownload(url:any, data:Object, config:any) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, { ...config, responseType: 'blob' }).then(
      (response) => {
        //关闭进度条
        resolve(response?.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url:any, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      (response) => {
        resolve(response?.data);
      },
      (err) => {
        // message.error(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url:any, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      (response) => {
        resolve(response?.data);
      },
      (err) => {
        // message.error(err);
        reject(err);
      }
    );
  });
}

/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url:any, data = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(
      (response) => {
        resolve(response?.data);
      },
      (err) => {
        // message.error(err);
        reject(err);
      }
    );
  });
}