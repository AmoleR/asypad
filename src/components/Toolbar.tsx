import {
  FC,
  useCallback,
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";
import { Drawer, DrawerProps } from "antd";
import classes from "./Toolbar.module.css";
import { ScreenSizes, pxToViewportLength } from "utils/calc";
import { isTouchEvent } from "utils/events";

let isResizing = false;

export type ToolbarDimension = { number: number; unit: ScreenSizes };

export type ToolbarProps = DrawerProps & {
  minWidth: ToolbarDimension;
  maxWidth: ToolbarDimension;
  width?: number;
};

const getLength = (value: ToolbarDimension): number => {
  return pxToViewportLength(value.number, value.unit, window);
};

const Toolbar: FC<ToolbarProps> = ({
  children,
  minWidth,
  maxWidth,
  ...props
}) => {
  const getAppropriateWidth = (width: number): number =>
    Math.max(Math.min(getLength(maxWidth), width), getLength(minWidth));

  const [drawerWidth, setDrawerWidth] =
    useState<string | number | undefined>(undefined);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cbHandleMouseMove = useCallback(handleMousemove, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cbHandleMouseUp = useCallback(handleMouseup, []);

  useEffect(() => {
    if (!!props.width) setDrawerWidth(getAppropriateWidth(props.width));
    else setDrawerWidth(getAppropriateWidth(200));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMouseup() {
    if (!isResizing) {
      return;
    }

    isResizing = false;
    document.removeEventListener("mousemove", cbHandleMouseMove);
    document.removeEventListener("mouseup", cbHandleMouseUp);
    document.removeEventListener("touchmove", cbHandleMouseMove);
    document.removeEventListener("touchend", cbHandleMouseUp);
  }

  function handleMousedown(
    e:
      | ReactMouseEvent<HTMLDivElement, MouseEvent>
      | ReactTouchEvent<HTMLDivElement>,
    type: "touch" | "mouse"
  ) {
    if (type === "mouse") e.preventDefault();
    e.stopPropagation();

    if (type === "mouse") {
      document.addEventListener("mousemove", cbHandleMouseMove);
      document.addEventListener("mouseup", cbHandleMouseUp);
    } else if (type === "touch") {
      document.addEventListener("touchmove", cbHandleMouseMove);
      document.addEventListener("touchend", cbHandleMouseUp);
    }
    isResizing = true;
  }

  function handleMousemove(e: MouseEvent | TouchEvent) {
    let offsetRight =
      document.body.offsetWidth -
      (isTouchEvent(e)
        ? e.touches[e.touches.length - 1].clientX
        : e.clientX - document.body.offsetLeft);

    setDrawerWidth(getAppropriateWidth(offsetRight));
  }

  return (
    <Drawer {...props} width={drawerWidth}>
      <div
        style={{ touchAction: "none" }}
        draggable
        className={classes.sidebar_dragger}
        onTouchStart={(e: ReactTouchEvent<HTMLDivElement>) =>
          handleMousedown(e, "touch")
        }
        onMouseDown={(e: ReactMouseEvent<HTMLDivElement, MouseEvent>) =>
          handleMousedown(e, "mouse")
        }
      />
      {children}
    </Drawer>
  );
};

export default Toolbar;
