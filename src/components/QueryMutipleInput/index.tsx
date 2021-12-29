/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-12-01 10:52:08
 * @LastEditTime: 2021-12-29 16:04:51
 * @LastEditors: rodchen
 */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useDebounceFn } from 'ahooks';
import { Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import './index.less';

const QueryMutipleInput = ({ onValueChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [popvalue, setPopValue] = useState('');
  const { run } = useDebounceFn(
    () => {
      formaData(value);
    },
    {
      wait: 1000,
    },
  );

  useEffect(() => {
    setPopValue(value);
    onValueChange(value);
  }, [value]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    formaData(popvalue);
    setIsModalVisible(false);
  };

  const formaData = (value) => {
    let formatValue = ToCDB(value)
      .split(/[/\n/\s,;]/)
      .filter((item) => item)
      .join(',');
    setValue(formatValue);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const outerChange = (e) => {
    setValue(e.target.value);
    run();
  };

  const onChange = (e) => {
    setPopValue(e.target.value);
  };

  return (
    <div className={'query_input'}>
      <div class="query_input_show">
        <Input
          value={value}
          onChange={outerChange}
          onBlur={(e) => {
            formaData(e.target.value);
          }}
          onPaste={(e) => {
            formaData(e.clipboardData.getData('text'));
            e.preventDefault();
          }}
          style={{ width: 'calc(100% - 30px)' }}
          placeholder="请输入（查询多个值请用 ; 或 , 分割）"
        />
        <div className={'query_input_expand_button'} onClick={showModal} type="primary">
          <span>...</span>
        </div>
      </div>
      <Modal
        width={600}
        title="多值录入"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            录入
          </Button>,
        ]}
      >
        <div className={'query_input_wrapper'}>
          <div className={'query_input_wrapper_left'}>录入区：</div>
          <div className={'query_input_wrapper_right'}>
            <div>
              如需同时使用多个值进行查询，请使用逗号、分号、空格或换行进行值的分隔，中英文格式的符号均支持
            </div>
            <div className={'query_input_textArea'}>
              <Input.TextArea
                value={popvalue}
                onChange={onChange}
                rows={6}
                showCount
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

function ToCDB(str) {
  var tmp = '';
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
      tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
    } else {
      tmp += String.fromCharCode(str.charCodeAt(i));
    }
  }
  return tmp;
}

export default QueryMutipleInput;
