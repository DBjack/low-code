// src/editor/layouts/stage/index.tsx
import { Button, Input } from "antd";
import React, { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import Space from "@/editor/components/Space";
import { ItemType } from "@/editor/item-type";
import { useComponents, Component } from "@/editor/stores/components";
import SelectedMask from "@/editor/common/select-mask";
const ComponentMap: { [key: string]: any } = {
  Button: Button,
  Space: Space,
  Input: Input
};

const EditStage: React.FC = () => {
  const selectedMaskRef: any = useRef(null);
  const { components, setCurComponent, curComponentId } = useComponents();

  useEffect(() => {
    function createMask(e: any) {
      const path = e.path || (e.composedPath && e.composedPath());
      for (let i = 0; i < path.length; i++) {
        const item = path[i];
        if (item.getAttribute) {
          if (item.getAttribute("data-component-id")) {
            // 点击的是组件
            const id = Number(item.getAttribute("data-component-id"));
            setCurComponent(id); // 设置当前选中的组件
          }
        }
      }
    }

    const container = document.querySelector(".stage");
    if (container) {
      container.addEventListener("click", createMask);
    }

    return () => {
      const container = document.querySelector(".stage");
      if (container) {
        container.removeEventListener("click", createMask);
      }
    };
  }, []);

  /**
   * 更新遮罩组件位置
   */
  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef.current?.updatePosition();
    }
  }, [components]); // 组件列表变化时更新遮罩位置

  /**
   *  渲染组件列表
   *
   * @param components 组件列表
   * @returns
   */
  function renderComponents(components: Component[]): React.ReactNode {
    if (!components.length) return null;
    return components.map((component: Component) => {
      if (!ComponentMap[component.name]) {
        return null;
      }

      if (ComponentMap[component.name]) {
        return React.createElement(
          ComponentMap[component.name],
          { key: component.id, id: component.id, ...component.props, "data-component-id": component.id },
          component.props.children || renderComponents(component?.children || [])
        );
      }

      return null;
    });
  }

  // 如果拖拽的组件是可以放置的，canDrop则为true，通过这个可以给组件添加边框
  const [{ canDrop }, drop] = useDrop(() => ({
    // 可以接受的元素类型，
    accept: [ItemType.Space, ItemType.Button, ItemType.Input],
    drop: (_, monitor) => {
      // 放置时执行
      const didDrop = monitor.didDrop(); // 判断是否放置了
      if (didDrop) {
        return;
      }

      return {
        id: 0
      };
    },
    collect: (monitor) => ({
      // 收集信息
      canDrop: monitor.canDrop() // 判断是否可以放置
    })
  }));

  return (
    <div ref={drop} style={{ border: canDrop ? "1px solid #ccc" : "none" }} className="p-[24px] h-[100%] stage">
      {renderComponents(components)}
      {curComponentId && (
        <SelectedMask componentId={curComponentId} containerClassName="select-mask-container" offsetContainerClassName="stage" ref={selectedMaskRef}></SelectedMask>
      )}
      <div className="select-mask-container"></div>
      {/* {React.createElement("input", {}, null)} */}
    </div>
  );
};

export default EditStage;
