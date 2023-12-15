import { useComponents } from "@/editor/stores/components";
import { Button } from "antd";

function Header() {
  const { mode, setMode } = useComponents();
  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "flex-end", padding: "20px" }}>
      {mode === "edit" ? (
        <Button
          onClick={() => {
            setMode("preview");
          }}>
          预览
        </Button>
      ) : (
        <Button
          onClick={() => {
            setMode("edit");
          }}>
          退出预览
        </Button>
      )}
    </div>
  );
}
export default Header;
