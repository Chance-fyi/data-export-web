import {ModalForm, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";
import {Button, Form, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {createMenu, menuSelectTree} from "@/api/menu";
import {useState} from "react";
import {validateErrorStatus} from "../../../../utils/util";

export default () => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      name: "",
      path: "",
      icon: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="新建菜单"
      width="25%"
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined/>
          新建
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        setErrorText(initErrorText)
        const res = await createMenu(values)

        if (res.code) {
          if (res.data) {
            setErrorText(res.data)
          } else {
            message.error(res.message)
          }
          return false
        } else {
          message.success(res.message)
          form.resetFields()
          return true;
        }
      }}
    >
      <ProFormText name="name" label="名称" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormText name="path" label="Path" validateStatus={validateErrorStatus(errorText.path)} help={errorText.path}/>
      <ProFormText name="icon" label="图标" validateStatus={validateErrorStatus(errorText.icon)} help={errorText.icon}/>
      <ProFormTreeSelect
        name="parent_id"
        label="父级"
        request={async () => {
          const {data} = await menuSelectTree()
          return data
        }}
      />
    </ModalForm>
  )
}
