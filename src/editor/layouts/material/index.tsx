import ComponentItem from "../../common/component-item";
import { ItemType } from "../../item-type";
import { useComponets } from "../../stores/components";
const Material: React.FC = () => {
  const { addComponent } = useComponets();
  const onDragEnd = (dropResult: any) => {
    addComponent(
      {
        id: new Date().getTime(),
        name: dropResult.name,
        props: dropResult.props
      },
      dropResult.id
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
