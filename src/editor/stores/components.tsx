// src/editor/stores/components.ts
import { create } from "zustand";

export interface Component {
  /**
   * 组件唯一标识
   */
  id: number;
  /**
   * 组件名称
   */
  name: string;
  /**
   * 组件属性
   */
  props: any;
  /**
   * 子组件
   */
  children?: Component[];
}

interface State {
  components: Component[];
  curComponentId?: number;
  curComponent?: Component | null;
  mode?: "edit" | "preview";
}

interface Action {
  /**
   * 添加组件
   * @param component 组件属性
   * @param parentId 上级组件ID
   * @returns
   */
  addComponent: (component: Component, parentId: number) => void;

  setCurComponent: (componentId: number) => void;

  updateComponentProps: (componentId: number, props: any) => void;

  setMode: (mode: "edit" | "preview") => void;
}

export const useComponents = create<State & Action>((set) => ({
  components: [],
  mode: "edit",
  addComponent: (component, parentId) =>
    set((state) => {
      // 如果有上级ID，把当前组件添加到上级组件的子组件中
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);
        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
          return { components: [...state.components] };
        }
      }
      return { components: [...state.components, component], curComponent: component };
    }),
  setCurComponent: (componentId) =>
    set((state) => {
      return { curComponentId: componentId, curComponent: getComponentById(componentId, state.components) };
    }),
  updateComponentProps: (componentId, props) =>
    set((state) => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };

        if (componentId === state.curComponentId) {
          return {
            curComponent: component,
            components: [...state.components]
          };
        }

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    }),
  setMode: (mode) =>
    set(() => {
      return { mode };
    })
}));

/**
 * 根据id获取组件
 *
 * @param id 组件id
 * @param components 组件数组
 * @returns 匹配的组件或null
 */
function getComponentById(id: number, components: Component[]): Component | null {
  for (const component of components) {
    if (component.id === id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result) return result;
    }
  }
  return null;
}
