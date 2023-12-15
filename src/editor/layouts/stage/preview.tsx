// src/editor/layouts/stage/index.tsx
import React from "react";
import { Button, Input, message } from "antd";
import Space from "../../components/Space";
import { useComponents, Component } from "../../stores/components";
import { componentEventMap } from "@/editor/config";
const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
  Input: Input
};

const PreviewStage: React.FC = () => {
  const { components } = useComponents();

  /**
   *  处理事件
   * @param component 组件
   * @returns
   */
  const handlerEvent = (component: Component) => {
    const props: any = {};
    if (componentEventMap[component.name]) {
      componentEventMap[component.name].forEach((event) => {
        const eventConfig = component.props[event.name];
        if (eventConfig) {
          const { type, config } = eventConfig;
          props[event.name] = () => {
            if (type === "showMessage") {
              if (config.type === "success") {
                message.success(config.text);
              } else if (config.type === "error") {
                message.error(config.text);
              }
            }
          };
        }
      });
    }
    return props;
  };

  /**
   *  渲染组件列表
   *
   * @param components 组件列表
   * @returns
   */
  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          { key: component.id, id: component.id, ...component.props, ...handlerEvent(component), "data-component-id": component.id },

          component.props.children || renderComponents(component.props.children || [])
        );
      }

      return null;
    });
  }

  return (
    <div className="p-[24px] h-[100%] stage">
      {renderComponents(components)}
      <div className="select-mask-container"></div>
    </div>
  );
};

export default PreviewStage;
