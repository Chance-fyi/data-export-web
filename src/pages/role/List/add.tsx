import {ModalForm, ProFormText, ProFormTreeSelect} from "@ant-design/pro-components";
import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {menuSelectTree} from "@/api/menu";
import {useState} from "react";
import {checkAdd, validateErrorStatus} from "../../../../utils/util";
import {createRole} from "@/api/role";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      name: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="新建角色"
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
        const res = await createRole(values)
        return await checkAdd(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormText name="name" label="名称" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormTreeSelect
        name="menu_ids"
        label="菜单"
        fieldProps={{
          multiple: true,
          treeDefaultExpandAll: true,
        }}
        request={async () => {
          const {data} = await menuSelectTree()
          return data
        }}
      />
    </ModalForm>
  )
}
