import ComponentItem from "@/editor/common/component-item";
import { ItemType } from "@/editor/item-type";
import { useComponents } from "@/editor/stores/components";
const Material: React.FC = () => {
  const { addComponent } = useComponents();
  const onDragEnd = (dropResult: any) => {
    // 添加组件, 画布会动态添加组件
    addComponent(
      {
        id: new Date().getTime(), // 这里要转成字符串，避免后边类型判断错误
        name: dropResult.name,
        props: dropResult.props
      },
      dropResult.id // 父组件id,
    );
  };

  return (
    <div className="flex p-[10px] gap-4 flex-wrap">
      <ComponentItem onDragEnd={onDragEnd} description="按钮" name={ItemType.Button} />
      <ComponentItem onDragEnd={onDragEnd} description="间距" name={ItemType.Space} />
      <ComponentItem onDragEnd={onDragEnd} description="输入框" name={ItemType.Input} />
    </div>
  );
};

export default Material;
