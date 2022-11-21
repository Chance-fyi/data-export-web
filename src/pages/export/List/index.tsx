import type {ActionType, ProColumns} from "@ant-design/pro-components";
import {ProTable} from "@ant-design/pro-components";
import React, {useRef} from "react";
import {exportList} from "@/api/export";
import {CheckCircleOutlined, DownloadOutlined} from "@ant-design/icons";
import {Button, notification} from "antd";
import {history} from "umi";

type Item = {
  id: bigint,
  filename: string,
  status: string,
  error_msg: string,
}

const columns: ProColumns<Item>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    search: false,
  },
  {
    title: '文件名',
    dataIndex: 'filename',
    key: 'filename',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    valueType: 'select',
    valueEnum: {
      0: {
        text: '导出中',
        status: 'Processing',
      },
      1: {
        text: '未下载',
        status: 'Success',
      },
      2: {
        text: '已下载',
        status: 'Success',
      },
      3: {
        text: '失败',
        status: 'Error',
      },
      4: {
        text: '已删除',
        status: 'Default',
      },
    },
  },
  {
    title: '失败原因',
    dataIndex: 'error_msg',
    key: 'error_msg',
    search: false,
  },
  {
    title: '操作',
    search: false,
    render: (text, record: Item) => {
      if (record.status == '1' || record.status == '2') {
        return <Button onClick={async () => {
          window.open("/api/export/download?id=" + record.id)
        }} shape="circle" icon={<DownloadOutlined/>}/>
      }
      return
    }
  },
]

let ref: React.MutableRefObject<ActionType | undefined>

export const ExportSuccess = (name: string) => {
  notification.open({
    message: `${name} 已完成`,
    icon: <CheckCircleOutlined style={{color: '#52c41a'}}/>,
    onClick: () => {
      history.push('/export/list')
    }
  })
  // @ts-ignore
  ref?.current?.reload()
}

export default () => {
  ref = useRef<ActionType>();
  return (
    <>
      <ProTable<Item>
        headerTitle="我的下载"
        rowKey="id"
        columns={columns}
        actionRef={ref}
        request={async (params = {}) => {
          const res = await exportList(params)
          return res.data
        }}
      />
    </>
  );
};
