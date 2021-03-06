/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-12-01 10:52:08
 * @LastEditTime: 2021-12-29 17:11:56
 * @LastEditors: rodchen
 */
// @ts-nocheck
import React from 'react';
import {
  Button,
  Card,
  Radio,
  Checkbox,
  Space,
  Dropdown,
  Menu,
  Tooltip,
  message,
} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ExclamationCircleOutlined,
  DownOutlined,
  ProfileTwoTone,
  UnorderedListOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import './index.less';
import _ from "loadsh"

const luckysheet = window.luckysheet;

let itemsTemp = [];

// const mapping = [
//   { "key": "skuCode", "name": "SKU编码", "rule": "skuCode"  },
//   { "key": "quantity", "name": "数量", "rule": "quantity" },
//   { "key": "price", "name": "单价", "rule": "price" }
// ]

const mapping = new Map([
  ['skuCode', 'SKU编码'],
  ['quantity', '数量'],
  ['price', '单价'],
  ['regionCode', '库区'],
  ['checkQuantity', '实盘数量'],
  ['shareRatio', '共享比例'],
]);

// for dnd
// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: `4px`,
  margin: `4px`,
  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#fff' : '#fff',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});

const filterLetters = (i) => {
  if (i >= 0 && i <= 25) {
    return String.fromCharCode(65 + i);
  } else {
    return undefined;
  }
};

class DataValidation extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRef(this);

    itemsTemp = props.columns.map((item, index) => {
      if (!mapping.get(item))
        throw Error(
          `${item} is not in DataValidation component, please fix this error`,
        );
      return {
        id: `item-0${index}`,
        content: mapping.get(item),
        code: item,
        "ct": { //单元格值格式
          "fa": "General",  //格式名称为自动格式
          "t": "s" //格式类型为数字类型
        }
      };
    });

    this.state = {
      showErrorData: false,
      data: [],
      items: [...itemsTemp],
      resultData: [],
      errorListCheck: false,
    };
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index,
    );

    this.setState({
      items,
    });

    itemsTemp = items;

    luckysheet.refresh();
  }

  getCount = () => {
    const { resultData } = this.state;
    return {
      total: resultData.length,
      error: resultData.filter((item) => !item.flag).length,
    };
  };

  setConfig = (data) => {
    const { items } = this.state;
    return {
      container: 'luckysheet',
      showtoolbar: false,
      hook: {
        columnTitleCellRenderBefore: function (columnAbc, postion, ctx) {
          if (columnAbc.name) {
            let charCode = columnAbc.name.charCodeAt();
            if (charCode - 65 <= items.length) {
              columnAbc.name = itemsTemp[charCode - 65]
                ? itemsTemp[charCode - 65].content
                : '校验结果';
            } else {
              columnAbc.name = '';
            }
          }
        },
        cellRenderBefore: function (cell, postion, sheetFile, ctx) {
          if (cell) {
            cell.fs = 10;

            if (typeof cell.v === 'string') {
              cell.m = cell.v = cell.m.trim();
            }
          }
          // console.log(postion);
        },
        cellAllRenderBefore: function (data, sheetFile, ctx) {
          sheetFile.config.borderInfo = [];
          // console.info(data,sheetFile,ctx)
        },
      },
      // showtoolbarConfig: {
      //   undoRedo: true, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
      //   paintFormat: false, //格式刷
      //   currencyFormat: false, //货币格式
      //   percentageFormat: false, //百分比格式
      //   numberDecrease: false, // '减少小数位数'
      //   numberIncrease: false, // '增加小数位数
      //   moreFormats: false, // '更多格式'
      //   font: true, // '字体'
      //   fontSize: true, // '字号大小'

      // },
      data: [
        {
          name: 'Cell', //工作表名称
          color: '', //工作表颜色
          index: 0, //工作表索引
          status: 1, //激活状态
          order: 0, //工作表的下标
          hide: 0, //是否隐藏
          row: 36, //行数
          column: 18, //列数
          defaultRowHeight: 20, //自定义行高
          defaultColWidth: 120, //自定义列宽
          config: {},
          celldata:
            data && data.length !== 0 ? data : _.flattenDeep(Array.from({ length: 100 }).map((a, b) => Array.from({ length: 100 }).map((c, d) => ({
              "r": b,
              "c": d,
              "v": { "ct": { "fa": "@", "t": "s" }, }
            }))))
          ,
          scrollLeft: 0, //左右滚动条位置
          // "scrollTop": 315, //上下滚动条位置
          luckysheet_select_save: [], //选中的区域
          calcChain: [], //公式链
          isPivotTable: false, //是否数据透视表
          pivotTable: {}, //数据透视表设置
          filter_select: {}, //筛选范围
          filter: null, //筛选配置
          luckysheet_alternateformat_save: [], //交替颜色
          luckysheet_alternateformat_save_modelCustom: [], //自定义交替颜色
          luckysheet_conditionformat_save: {}, //条件格式
          frozen: {}, //冻结行列配置
          chart: [], //图表配置
          zoomRatio: 1, // 缩放比例
          image: [], //图片
          showGridLines: 1, //是否显示网格线
          dataVerification: {}, //数据验证配置
          luckysheet_alternateformat_save: [
            {
              cellrange: {
                //单元格范围
                row: [0, 1000],
                column: [0, 18],
              },
              format: {
                head: {
                  //页眉颜色
                  fc: '#6aa84f',
                  bc: '#ffffff',
                },
                one: {
                  //第一种颜色
                  bc: '#ffffff',
                },
                two: {
                  //第二种颜色
                  bc: '#f2f4f5',
                },
                foot: {
                  //页脚颜色
                  fc: '#000',
                  bc: '#a5efcc',
                },
              },
              hasRowHeader: false, //含有页眉
              hasRowFooter: false, //含有页脚
            },
          ], //交替颜色
          luckysheet_alternateformat_save_modelCustom: [
            {
              head: {
                //页眉颜色
                fc: '#6aa84f',
                bc: '#ffffff',
              },
              one: {
                //第一种颜色
                fc: '#000',
                bc: '#ffffff',
              },
              two: {
                //第二种颜色
                fc: '#000',
                bc: '#e5fbee',
              },
              foot: {
                //页脚颜色
                fc: '#000',
                bc: '#a5efcc',
              },
            },
          ], //自定义交替颜色
        },
      ],
      cellRightClickConfig: {
        copy: false, // 复制
        copyAs: false, // 复制为
        paste: false, // 粘贴
        insertRow: false, // 插入行
        insertColumn: false, // 插入列
        // deleteRow: false, // 删除选中行
        // deleteColumn: false, // 删除选中列
        deleteCell: false, // 删除单元格
        hideRow: false, // 隐藏选中行和显示选中行
        hideColumn: false, // 隐藏选中列和显示选中列
        rowHeight: false, // 行高
        columnWidth: false, // 列宽
        clear: false, // 清除内容
        matrix: false, // 矩阵操作选区
        sort: false, // 排序选区
        filter: false, // 筛选选区
        chart: false, // 图表生成
        image: false, // 插入图片
        link: false, // 插入链接
        data: false, // 数据验证
        cellFormat: false, // 设置单元格格式
      },
      showsheetbar: false,
      optionstate: false,
      showstatisticBarConfig: {
        count: false, // 计数栏
        view: false, // 打印视图
        zoom: false, // 缩放
      },
      column: 10, //列数
      columnHeaderHeight: 30,
      lang: 'zh',
      defaultFontSize: '10',
      frozen: {
        type: 'rangeBoth',
        range: { row_focus: 1, column_focus: 1 },
      },
    };
  };

  componentDidMount() {
    luckysheet.create(this.setConfig([]));
  }

  componentWillUnmount() {
    // luckysheet.create(this.setConfig([]));
    luckysheet.destroy();
  }

  getValidateData = () => {
    const { resultData } = this.state;

    return {
      successData: resultData
        .filter((item) => item.flag)
        .map(({ flag, checkResults, ...item }) => item),
      failData: resultData
        .filter((item) => !item.flag)
        .map(({ flag, checkResults, ...item }) => item),
    };
  };

  getData = () => {
    console.time();
    let sheetData = luckysheet.getSheetData();
    let data = sheetData
      .filter((item) => item[0])
      .map((item) => {
        let obj = {};

        item.slice(0, itemsTemp.length).map((innerItem, index) => {
          obj[this.state.items[index].code] = innerItem && innerItem.v;
        });

        return obj;
      });

    return data;
  };

  resetData = () => {
    const { validDataUrl, updateData, columns } = this.props;
    const resultData = this.getData().filter(d => {
      return _.compact(Object.values(d)).length
    })

    axios
      .post(validDataUrl, {
        columns: columns,
        data: resultData,
      })
      .then((result) => {
        result = result.data;
        if (result.status !== '0') {
          message.error(result.msg);
          return;
        }
        const { items } = this.state;
        let validIndex = items.length;
        let res = result.data;

        let sheetData = luckysheet.getSheetData();

        sheetData.map((item, index) => {
          if (!res[index]) return item;

          if (res[index].flag) {
            item[validIndex] = {
              ...item[validIndex],
              v: '通过',
              m: '通过',
              fc: 'green', //字体颜色为 "#990000"
            };
          } else {
            item[validIndex] = {
              ...item[validIndex],
              v: res[index].checkResults,
              m: res[index].checkResults,
              fc: 'red', //字体颜色为 "#990000"
            };
          }

          item[validIndex].ct = { fa: 'General', t: 'g' };
        });
        // sheetData.map((item, index) => {
        //   luckysheet.setCellValue(index + 1, 4, 345)
        // })

        luckysheet.create(
          this.setConfig(luckysheet.transToCellData(sheetData)),
        );
        this.setState({
          data: luckysheet.transToCellData(sheetData),
          errorListCheck: false,
          resultData: res,
        });

        console.log(setExportData);
        setExportData([123123]);
      })
      .catch((err) => { });
  };

  filterData = (type: string) => {
    const { showErrorData, data, resultData } = this.state;
    let sheetData = luckysheet.transToData(data).filter((item, index) => {
      if (type === 'all') {
        return false;
      }
      if (type === 'error') {
        return item[itemsTemp.length] && item[itemsTemp.length].v === '通过';
      }
    });

    luckysheet.create(this.setConfig(luckysheet.transToCellData(sheetData)));
    this.setState({
      data: luckysheet.transToCellData(sheetData),
      errorListCheck: false,
      resultData: type === 'all' ? [] : resultData.filter((item) => item.flag),
    });
  };

  toggleData = () => {
    const { showErrorData, data } = this.state;

    if (showErrorData) {
      luckysheet.create(this.setConfig(data));
    } else {
      let sheetData = luckysheet.getSheetData();
      sheetData = sheetData.filter((item, index) => {
        return !item[itemsTemp.length] || item[itemsTemp.length].v !== '通过';
      });

      luckysheet.create(this.setConfig(luckysheet.transToCellData(sheetData)));
    }

    this.setState({
      showErrorData: !showErrorData,
    });
  };

  onChange = (e) => {
    this.setState({
      radioValue: e.target.value,
    });
    this.toggleData();
  };

  errorChange = (e: any) => {
    this.toggleData();
    this.setState({
      errorListCheck: e.target.checked,
    });
  };

  menuList = (
    <Menu>
      <Menu.Item key="1" className="sheet_table-menu_item_text">
        <a onClick={() => this.filterData('all')}>清空全部数据</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" className="sheet_table-menu_item_text">
        <a onClick={() => this.filterData('error')}>仅清空错误数据</a>
      </Menu.Item>
    </Menu>
  );

  leftMenu = (
    <Menu>
      <Menu.Item key="3" className="sheet_table-menu_item_text">
        <span className="sheet_table_text">请拖动字段来对应列</span>
      </Menu.Item>
      <Menu.Divider />
      <div>
        <DragDropContext onDragEnd={(e) => this.onDragEnd(e)}>
          <Droppable droppableId="droppable" direction="vertical">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  ...getListStyle(snapshot.isDraggingOver),
                  flexDirection: 'column',
                }}
                {...provided.droppableProps}
              >
                {this.state.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        <Space>
                          <span>{filterLetters(index)} 列 </span>
                          <Space className="sheet_table_dnd_text">
                            <UnorderedListOutlined />
                            {item.content}
                          </Space>
                        </Space>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </Menu>
  );

  render() {
    const { errorListCheck } = this.state;
    const { title } = this.props;

    let totalSummary = this.getCount();

    const luckyCss = {
      margin: '0px',
      padding: '0px',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: '0px',
      top: '0px',
    };
    return (
      <>
        <div className="sheet_table_top">
          <Space>
            <span>排序列</span>
            <Dropdown
              trigger={['click']}
              overlay={this.leftMenu}
              placement="bottomLeft"
            >
              <a>
                <ProfileTwoTone />
              </a>
            </Dropdown>
            <Tooltip
              title={
                <>
                  <span>使用指南：</span>
                  <br></br>
                  <span>
                    1、拖动数据项，以适配源数据的顺序，如您Excel中数据排序依次为编码、价格和数量，则您也可以将数据项的顺序调整为一致
                  </span>
                  <br></br>
                  <span>2、复制文件数据（多列一起），在文本框内进行粘贴</span>
                  <br></br>
                  <span>
                    3、点击识别按钮进行数据校验，如全部正确，则点击录入按钮可录入数据，如存在错误数据，则需修改后再进行录入
                  </span>
                </>
              }
            >
              <ExclamationCircleOutlined />
            </Tooltip>
          </Space>
          <Space>
            <Dropdown
              trigger={['click']}
              overlay={this.menuList}
              placement="bottomRight"
            >
              <Button>
                清空
                <DownOutlined />
              </Button>
            </Dropdown>

            <Button type="primary" onClick={this.resetData}>
              识别
            </Button>
          </Space>
        </div>

        <div style={{ position: 'relative', height: '400px' }}>
          <div id="luckysheet" style={luckyCss}></div>
        </div>
        <div className="sheet_table_footer">
          <span className="sheet_table_footer_l">
            共 {totalSummary.total} 条数据, 其中错误 {totalSummary.error} 项
          </span>
          <Space className="sheet_table_footer_r">
            <Checkbox
              checked={errorListCheck}
              onClick={this.errorChange}
            ></Checkbox>
            仅展示错误数据
          </Space>
        </div>
      </>
    );
  }
}

export default DataValidation;
