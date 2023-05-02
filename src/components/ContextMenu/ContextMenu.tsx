import { Box } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";

type ContextMenuProps = {
  children: ReactNode;
  parentRef: React.RefObject<HTMLDivElement>;
  selectEvent: {
    event: MouseEvent;
    isDragging: boolean;
    items: HTMLButtonElement[];
  } | null;
};

const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  parentRef,
  selectEvent,
}) => {
  const [isVisible, setVisibility] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const parent = parentRef.current;
    if (!parent) {
      return;
    }

    const showMenu = (event: MouseEvent) => {
      if (selectEvent && selectEvent.items.length > 0) {
        event.preventDefault();
        setVisibility(true);
        setX(event.clientX);
        setY(event.clientY);
      }
    };

    const closeMenu = () => {
      setVisibility(false);
    };

    parent.addEventListener("contextmenu", showMenu);
    window.addEventListener("click", closeMenu);

    return function cleanup() {
      parent.removeEventListener("contextmenu", showMenu);
      window.removeEventListener("click", closeMenu);
    };
  });

  return isVisible ? (
    <Box style={{ position: "fixed", top: y, left: x, zIndex: 99 }}>
      {children}
    </Box>
  ) : null;
};

export default ContextMenu;
