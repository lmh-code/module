/*
 * @Descripttion: 配置文件，会影响到项目配置
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 17:34:59
 * @LastEditTime: 2020-09-28 18:24:13
 */

const port = 8087; // 本地调试端口号
const baseRouter = '/test'; // 默认路由地址
const sysName = '测试系统'; // 系统名称
const clientId = 4; // 每一个系统所对应的id 获取系统菜单时用

module.exports = {
  port,
  baseRouter,
  sysName,
  clientId
}
