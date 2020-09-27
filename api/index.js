/*
 * @Descripttion: 存放接口地址
 * @version: 
 * @Author: liuminghao@benlai.com
 * @Date: 2020-09-27 15:22:58
 * @LastEditTime: 2020-09-27 15:28:35
 */
import config from '@/utils/config'
let baseUrl = config.reqUrl
const indexUrl = {
  queryMenu: `${baseUrl}/foundation/user/func/list` // 获取接口菜单
}
export default indexUrl