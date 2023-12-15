// src/editor/common/component-item.tsx
import { useDrag } from "react-dnd";
import { ItemType } from "../item-type";

interface ComponentItemProps {
  // 组件名称
  name: string;
  // 组件描述
  description: string;
  // 拖拽结束回调
  onDragEnd: any;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ name, description, onDragEnd }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: name, // 需要和useDrop的accept的值保持一致
    end: (_, monitor) => {
      // 拖拽结束回调
      const dropResult = monitor.getDropResult(); // 获取拖拽结束后的数据
      console.log(dropResult, "dropResult");
      if (!dropResult) return;

      // 拖拽结束回调
      onDragEnd &&
        onDragEnd({
          name,
          props: name === ItemType.Button ? { children: "按钮" } : {},
          ...dropResult
        });
    },
    // 拖拽开始回调
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // 判断是否拖拽
      handlerId: monitor.getHandlerId() // 获取拖拽的handlerId
    })
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={drag}
      className="border-dashed border-[1px] border-[gray] bg-white cursor-move py-[8px] px-[20px] rounded-lg"
      style={{
        opacity
      }}>
      {description}
    </div>
  );
};

export default ComponentItem;
