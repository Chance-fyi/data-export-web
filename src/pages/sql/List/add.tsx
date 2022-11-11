import {ModalForm, ProFormSelect, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {checkAdd, validateErrorStatus} from "../../../../utils/util";
import {createSql} from "@/api/sql";
import {databaseSelectList} from "@/api/database";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
      database_id: "",
      name: "",
      sql: "",
    }
  }
  const [errorText, setErrorText] = useState(initErrorText)

  return (
    <ModalForm
      title="新建SQL"
      width="30%"
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
        const res = await createSql(values)
        return await checkAdd(res, form, setErrorText, r.action.reload)
      }}
    >
      <ProFormSelect
        name="database_id"
        label="数据库"
        validateStatus={validateErrorStatus(errorText.database_id)} help={errorText.database_id}
        request={async () => {
          const {data} = await databaseSelectList()
          return data
        }}
      />
      <ProFormText name="name" label="备注" validateStatus={validateErrorStatus(errorText.name)} help={errorText.name}/>
      <ProFormTextArea
        name="sql"
        label="SQL"
        validateStatus={validateErrorStatus(errorText.sql)} help={errorText.sql}
        fieldProps={{
          style: {height: 500}
        }}
      />
    </ModalForm>
  )
}
