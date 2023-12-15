import { Form, Input, Select } from "antd";
import { useEffect } from "react";
import { ItemType } from "../../item-type";
import { useComponents } from "../../stores/components";

const componentSettingMap = {
  [ItemType.Button]: [
    {
      name: "type", // 组件属性名
      label: "按钮类型",
      type: "select",
      options: [
        { label: "主按钮", value: "primary" },
        { label: "默认按钮", value: "default" }
      ]
    },
    {
      name: "children",
      label: "文本",
      type: "input"
    }
  ],
  [ItemType.Space]: [
    {
      name: "size",
      label: "间距大小",
      type: "select",
      options: [
        { label: "大", value: "large" },
        { label: "中", value: "middle" },
        { label: "小", value: "small" }
      ]
    }
  ],
  [ItemType.Input]: [
    {
      name: "placeholder",
      label: "提示语",
      type: "input"
    },
    {
      name: "value",
      label: "值",
      type: "input",
      value: "",
      placeholder: "请输入"
    }
  ]
};

const Setting: React.FC = () => {
  const { curComponentId, updateComponentProps, curComponent } = useComponents();

  const [form] = Form.useForm();

  useEffect(() => {
    // 初始化表单
    if (curComponent?.props) {
      form.setFieldsValue(curComponent?.props);
    }
  }, [curComponent]);

  /**
   * 动态渲染表单元素
   * @param setting 元素配置
   * @returns
   */
  function renderFormElement(setting: any) {
    const { type, options } = setting;

    if (type === "select") {
      return <Select options={options} placeholder="请选择" />;
    } else if (type === "input") {
      return <Input placeholder="请输入" />;
    }
  }

  // 监听表单值变化，更新组件属性
  function valueChange(changeValues: any) {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues);
    }
  }

  if (!curComponentId || !curComponent) return null;

  // 根据组件类型渲染表单
  return (
    <div className="pt-[20px]">
      <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        {(componentSettingMap[curComponent.name] || []).map((setting) => {
          return (
            <Form.Item name={setting.name} label={setting.label} key={setting.name}>
              {renderFormElement(setting)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

export default Setting;
