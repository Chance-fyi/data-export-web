import {ModalForm, ProFormTextArea} from "@ant-design/pro-components";
import {Button, Form} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {checkAdd, validateErrorStatus} from "../../../../utils/util";
import {createSql} from "@/api/sql";

export default (r: any) => {
  const [form] = Form.useForm();
  const initErrorText = () => {
    return {
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
