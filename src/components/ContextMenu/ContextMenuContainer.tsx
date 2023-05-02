import React, { ReactNode, useRef } from "react";

import ContextMenu from "./ContextMenu";

type ContextMenuContainerProps = {
  children: ReactNode;
  contextContent: ReactNode;
  selectEvent: {
    event: MouseEvent;
    isDragging: boolean;
    items: HTMLButtonElement[];
  } | null;
};

const ContextMenuContainer: React.FC<ContextMenuContainerProps> = ({
  children,
  contextContent,
  selectEvent,
}) => {
  const containerRef = useRef(null);

  return (
    <div className="container" ref={containerRef}>
      {children}

      <ContextMenu parentRef={containerRef} selectEvent={selectEvent}>
        {contextContent}
      </ContextMenu>
    </div>
  );
};

export default ContextMenuContainer;
