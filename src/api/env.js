/**
 * @author: yate
 * @description: 设置环境变量
 */
const serverUrl = {
  develop: '',
  test: '',
  mock: '',
  production: ''
};

export const baseUrl = serverUrl[process.env.NODE_ENV || 'develop'];
