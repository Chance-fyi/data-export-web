import {ModalForm, ProFormText} from "@ant-design/pro-components";
import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export default () => {
  const [form] = Form.useForm();
  return (
    <ModalForm
      title="新建菜单"
      width="25%"
      form={form}
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新建
        </Button>
      }
      autoFocusFirstInput
      onFinish={async (values) => {
        console.log(values);
        form.resetFields()
        return true;
      }}
    >
      <ProFormText name="name" label="名称" />
      <ProFormText name="path" label="Path" />
      <ProFormText name="icon" label="图标" />
    </ModalForm>
  )
}
