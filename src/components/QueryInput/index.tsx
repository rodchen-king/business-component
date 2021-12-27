/*
 * @Description:
 * @Author: rodchen
 * @Date: 2021-12-01 10:52:08
 * @LastEditTime: 2021-12-27 21:29:23
 * @LastEditors: rodchen
 */
// @ts-nocheck
import React, { useState } from 'react';
import { Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import styles from './index.less';

const QueryInput = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    let formatValue = ToCDB(value)
      .split(/[/\n/\s,;]/)
      .filter((item) => item)
      .join(',');
    setValue(formatValue);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const outerChange = (e) => {
    debugger;
    let formatValue = ToCDB(e.target.value)
      .split(/[/\n/\s,;]/)
      .filter((item) => item)
      .join(',');
    setValue(formatValue);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.query_input}>
      <Input.Group compact>
        <Input
          value={value}
          onChange={outerChange}
          style={{ width: 'calc(100% - 50px)' }}
          placeholder="请输入（查询多个值请用 ; 或 , 分割）"
        />
        <Button className={styles.button} onClick={showModal} type="primary">
          ...
        </Button>
      </Input.Group>
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
        <div className={styles.query_input_wrapper}>
          <div className={styles.query_input_wrapper_left}>录入区：</div>
          <div className={styles.query_input_wrapper_right}>
            <div>
              如需同时使用多个值进行查询，请使用逗号、分号、空格或换行进行值的分隔，中英文格式的符号均支持
            </div>
            <div className={styles.query_input_textArea}>
              <Input.TextArea
                value={value}
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

export default QueryInput;
