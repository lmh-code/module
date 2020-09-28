<style scoped>
  /* 页面样式 */
</style>

<template>
  <div>
    <el-button size="mini" @click="doExportDataHandel(false)">导出</el-button>
      <el-table 
        :data="tableData" 
        size="small"
        border>
        <template v-for="(item, index) in tHeaderList">
          <table-column 
            v-if="item.children && item.children.length" 
            :key="index" 
            :coloumn-header="item"></table-column>
          <el-table-column 
            v-else 
            :key="index" 
            :label="item.label" 
            :min-width="item.width"
            align="center">
              <template slot-scope="scope">
                <div>
                  <div v-if="item.showType === 'input'">
                    <el-input v-model="scope.row[item.property]" placeholder="输入内容" size="small"></el-input>
                  </div>
                  <div v-else-if="item.showType === 'select'">
                    <el-select v-model="scope.row[item.defaultVal]" placeholder="请选择" size="small">
                      <el-option
                        v-for="item in scope.row[item.property]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-else>
                    <div v-if="item.property === 'marketPrice'">
                      <div v-for="market of scope.row.marketMsg" :key="market.marketNo">
                        <span v-if="item.marketNo === market.marketNo">{{market[item.property]}}</span>
                      </div>
                    </div>
                    <div v-else-if="item.property === 'vendorCurrentPrice' || item.property === 'vendorReportPrice' || item.property === 'vendorReportGoods'">
                      <div v-for="vendor of scope.row.vendorMsg" :key="vendor.vendorNo">
                        <span v-if="item.vendorNo === vendor.vendorNo">
                          {{vendor[item.property]}}
                        </span>
                      </div>
                    </div>
                    <div v-else>
                      {{scope.row[item.property]}}
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
        </template>
      </el-table>
  </div>
</template>

<script>
  // 页面js代码
  import exportExcel from '@/utils/exportExcel'
  import TableColumn from './components/TableColumn'
  import * as utils from '@/utils/utils'
  export default {
    data() {
      return {
        tHeaderList: [
          {
            label: '商品编码',
            property: 'goodsNo',
            width: 120
          },
          {
            label: '商品名称',
            property: 'goodsName',
            width: 130
          },
          {
            label: '规格',
            property: 'spec',
            width: 120
          },
          {
            label: '单位',
            property: 'unit',
            width: 120
          },
          {
            label: '原价',
            property: 'price',
            width: 120
          },
          {
            label: '输入可订货价',
            property: 'currentPrice',
            showType: 'input',
            width: 130
          },
          {
            label: '选择供应商',
            property: 'vendors',
            defaultVal: 'defaultVendorNo',
            showType: 'select',
            width: 150
          },
          {
            label: '转换比',
            property: 'radio',
            children: [
              {
                label: '市场转换比',
                property: 'radio1',
                width: 120
              },
              {
                label: '供应商转换比',
                property: 'radio2',
                width: 120
              }
            ]
          }
        ],
        // 必须，供应商编号和名称
        tHeaderMarketList: [
          {
            marketNo: '600001',
            marketName: '市场1',
            label: '市场1',
            property: 'marketPrice',
            width: 120
          },
          {
            marketNo: '600002',
            marketName: '市场2',
            label: '市场2',
            property: 'marketPrice',
            width: 120
          },
          {
            marketNo: '600003',
            marketName: '市场3',
            label: '市场3',
            property: 'marketPrice',
            width: 120
          }
        ],
        tHeaderVendorList: [
          {
            vendorNo: '80001',
            vendorName: '供应商1',
            label: '供应商1',
            property: 'vendorNo',
            children: [
              {
                vendorNo: '80001',
                label: '当前进价',
                property: 'vendorCurrentPrice',
                width: 120
              },
              {
                vendorNo: '80001',
                label: '本次报价',
                property: 'vendorReportPrice',
                width: 120
              },
              {
                vendorNo: '80001',
                label: '报货量',
                property: 'vendorReportGoods',
                width: 120
              }
            ]
          },
          {
            vendorNo: '80002',
            vendorName: '供应商2',
            label: '供应商2',
            property: 'vendorNo',
            children: [
              {
                vendorNo: '80002',
                label: '当前进价',
                property: 'vendorCurrentPrice',
                width: 120
              },
              {
                vendorNo: '80002',
                label: '本次报价',
                property: 'vendorReportPrice',
                width: 120
              },
              {
                vendorNo: '80002',
                label: '报货量',
                property: 'vendorReportGoods',
                width: 120
              }
            ]
          }
        ],
        tableData: [
          {
            goodsNo: '100001',
            goodsName: '测试商品100001',
            spec: '1kg/份',
            unit: 'kg',
            price: '12.5',
            currentPrice: '',
            defaultVendorNo: '50001',
            vendors: [
              {
                value: '50001',
                label: '供应商名称50001'
              },
              {
                value: '50002',
                label: '供应商名称50002'
              },
              {
                value: '50003',
                label: '供应商名称50003'
              }
            ],
            radio: '10%',
            radio1: '5%',
            radio2: '5%',

            marketMsg: [
              {
                marketNo: '600001',
                marketName: '市场1',
                marketPrice: '9',
              }
            ],
            vendorMsg: [
              {
                vendorNo: '80001',
                vendorName: '供应商1',
                vendorCurrentPrice: '55',
                vendorReportPrice: '23',
                vendorReportGoods: 886
              }
            ]
          },
          {
            goodsNo: '100002',
            goodsName: '测试商品100002',
            spec: '2kg/份',
            unit: 'kg',
            price: '25',
            currentPrice: '',
            defaultVendorNo: '50002',
            vendors: [
              {
                value: '50001',
                label: '供应商名称50001'
              },
              {
                value: '50002',
                label: '供应商名称50002'
              },
              {
                value: '50003',
                label: '供应商名称50003'
              }
            ],
            radio: '10%',
            radio1: '5%',
            radio2: '5%',
            marketMsg: [
              {
                marketNo: '600002',
                marketName: '市场2',
                marketPrice: '12',
              },
              {
                marketNo: '600003',
                marketName: '市场3',
                marketPrice: '10',
              }
            ],
            vendorMsg: [
              {
                vendorNo: '80001',
                vendorName: '供应商1',
                vendorCurrentPrice: '11',
                vendorReportPrice: '9',
                vendorReportGoods: 996
              },
              {
                vendorNo: '80002',
                vendorName: '供应商2',
                vendorCurrentPrice: '10',
                vendorReportPrice: '10.5',
                vendorReportGoods: 10000
              }
            ]
          }
        ]

      }
    },
    components: {
      'table-column': TableColumn
    },
    created() {

    },
    mounted() {
      this.doSearchHandel()
    },
    methods: {
      doSearchHandel() {
        let tHeadList = [...this.tHeaderList, ...this.tHeaderMarketList, ...this.tHeaderVendorList]
        this.tHeaderList = tHeadList
      },
      notificationMsg() {
        this.$alert("<div><p>活动保存成功</p><p style='color: red;'>有商品在门店线上不可售</p></div>", '温馨提示', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: "下载明细",
          showConfirmButton: true,
          confirmButtonText: '关闭'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '你点击了关闭按钮!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '你点击了下载明细按钮'
          });
        });
      },
      doExportDataHandel() {
        // TODO: 不固定列合并单元格导出
        // 计算出多级表头的第一级表头
        const multiHeader = [['商品名称', '商品编码', '规格', '单位', '原价', '可订货价', '供应商', '转换比']]
        let tHeaderMarketNameList = this.tHeaderMarketList.map(item => {
          return item.marketName
        })
        let tHeaderVendorNameList = this.tHeaderVendorList.map(item => {
          return item.vendorName
        })
        let newTHeaderVendorNameList = tHeaderVendorNameList.map(item => {
          return [item, '', '']
        })
        let realTHeaderVendorNameList = []
        newTHeaderVendorNameList.forEach(item => {
          realTHeaderVendorNameList = [...realTHeaderVendorNameList, ...item]
        })
        let newMultiHeader = [[...multiHeader[0], ...tHeaderMarketNameList, ...realTHeaderVendorNameList]]
        console.log("newMultiHeader:", newMultiHeader);

        // 计算出多级表头的第二级表头
        let tHeader = ['', '', '', '', '', '', '', '']
        this.tHeaderMarketList.forEach(item => {
          tHeader.push('')
        })
        this.tHeaderVendorList.forEach((i) => {
          tHeader.push('当前进价')
          tHeader.push('本次报价')
          tHeader.push('报货量')
        })
        console.log("tHeader:", tHeader);

        // 计算出表格每一列要取的字段
        let tFilter = ['goodsName', 'goodsNo', 'spec', 'unit', 'price', 'currentPrice', 'defaultVendorNo', 'radio']
        this.tHeaderMarketList.forEach((item, index) => {
          tFilter.push(`marketPrice${item.marketNo}`)
        })
        this.tHeaderVendorList.forEach((item, iIdx) => {
          tFilter.push(`vendorCurrentPrice${item.vendorNo}`)
          tFilter.push(`vendorReportPrice${item.vendorNo}`)
          tFilter.push(`vendorReportGoods${item.vendorNo}`)
        })
        console.log("tFilter:", tFilter);

        // 计算出表格要合并的项
        let conNum = 8;
        let merges = ['A1:A2','B1:B2','C1:C2','D1:D2','E1:E2','F1:F2','G1:G2', 'H1:H2']
        this.tHeaderMarketList.forEach((item, index) => {
          let columnStr = utils.indexToColName(conNum + index + 1)
          merges.push(`${columnStr}1:${columnStr}2`) 
        })
        let vendorMergeIndexLeft = conNum + this.tHeaderMarketList.length + 1
        this.tHeaderVendorList.forEach((item, index) => {
          let columnStr = utils.indexToColName(vendorMergeIndexLeft)
          let vendorMergeIndexRight = vendorMergeIndexLeft + 2
          let columnStr2 = utils.indexToColName(vendorMergeIndexRight)
          vendorMergeIndexLeft = vendorMergeIndexRight + 1
          merges.push(`${columnStr}1:${columnStr2}1`) 
        })
        console.log("merges:", merges);

        // 处理数据
        this.tableData.forEach((item, iIdx) => {
          if(item.marketMsg && item.marketMsg.length) {
            item.marketMsg.forEach((jItem) => {
              item[`marketPrice${jItem.marketNo}`] = jItem.marketPrice
            })
          }
          if(item.vendorMsg && item.vendorMsg.length) {
            item.vendorMsg.forEach((jItem) => {
              item[`vendorCurrentPrice${jItem.vendorNo}`] = jItem.vendorCurrentPrice
              item[`vendorReportPrice${jItem.vendorNo}`] = jItem.vendorReportPrice
              item[`vendorReportGoods${jItem.vendorNo}`] = jItem.vendorReportGoods
            })
          }
        })
        console.log("this.tableData:", this.tableData);

        // 导出数据
        exportExcel.ExportJsonToExcel({
          multiHeader: newMultiHeader,
          merges: merges,
          header: tHeader,
          filterVal: tFilter,
          data: this.tableData,
          filename: `${Date.parse(new Date())}_测试excel导出合并单元格`
        })
        

        //TODO: 固定列合并单元格导出
        // const tableDataArr = [
        //   {
        //     age: 12,
        //     name: '小明',
        //     address: '北京市海淀区',
        //     createTime: '2020-09-17',
        //     upDateTime: '',
        //     finishTime: ''
        //   },
        //   {
        //     age: 14,
        //     name: '小红',
        //     address: '河南省南阳市',
        //     createTime: '2020-09-17',
        //     upDateTime: '2020-09-18',
        //     finishTime: '2020-09-19'
        //   },
        //   {
        //     age: 16,
        //     name: '小刚',
        //     address: '河北省石家庄市',
        //     createTime: '2020-09-17',
        //     upDateTime: '2020-09-18',
        //     finishTime: ''
        //   }
        // ]
        // const multiHeader = [['姓名', '年龄', '住址', '其他信息', '', '']]
        // const tHeader = ['', '', '', '创建时间', '更新时间', '毕业时间']
        // const tFilter = ['name', 'age', 'address', 'createTime', 'upDateTime', 'finishTime']
        // const merges = ['A1:A2','B1:B2','C1:C2','D1:F1']
        // exportExcel.ExportJsonToExcel({
        //   multiHeader: multiHeader,
        //   merges: merges,
        //   header: tHeader,
        //   filterVal: tFilter,
        //   data: tableDataArr,
        //   filename: `${Date.parse(new Date())}_测试excel导出合并单元格`
        // })
      }
    }
    
  }
</script>