import { Allotment } from "allotment";
import "allotment/dist/style.css";
import React from "react";
import { useComponents } from "@/editor/stores/components";
import Header from "./header";
import Material from "./material";
import Setting from "./setting";
import EditStage from "./stage/edit";
import PreviewStage from "./stage/preview";

const Layout: React.FC = () => {
  const { mode } = useComponents();
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col">
      <div className="h-[50px] flex items-center border-b-2">
        <Header />
      </div>
      <Allotment>
        {mode === "edit" && (
          <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
            <Material />
          </Allotment.Pane>
        )}
        <Allotment.Pane>{mode === "edit" ? <EditStage /> : <PreviewStage />}</Allotment.Pane>
        {mode === "edit" && (
          <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
            <Setting />
          </Allotment.Pane>
        )}
      </Allotment>
    </div>
  );
};

export default Layout;
