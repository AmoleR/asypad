import {
  FC,
  useCallback,
  useState,
  useEffect,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
  MutableRefObject,
} from "react";
import { Drawer, DrawerProps } from "antd";
import classes from "./index.module.css";
import { ScreenSizes, pxToViewportLength } from "utils/calc";
import { isTouchEvent } from "utils/events";
import Content from "./Content";
import { SyncOutlined } from "@ant-design/icons";

let isResizing = false;

export type ToolbarDimension = { number: number; unit: ScreenSizes };

export type ToolbarProps = DrawerProps & {
  minWidth: ToolbarDimension;
  maxWidth: ToolbarDimension;
  width?: number;
  mainRef: MutableRefObject<HTMLDivElement | null>;
};

const Toolbar: FC<ToolbarProps> = ({
  minWidth,
  maxWidth,
  mainRef,
  ...props
}) => {
  const getLength = (value: ToolbarDimension): number => {
    return pxToViewportLength(value.number, value.unit, mainRef?.current);
  };

  const getAppropriateWidth = (width: number): number =>
    Math.max(Math.min(getLength(maxWidth), width), getLength(minWidth));

  const [drawerWidth, setDrawerWidth] = useState<number | undefined>(undefined);
  const [showPoints, setShowPoints] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cbHandleMouseMove = useCallback(handleMousemove, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cbHandleMouseUp = useCallback(handleMouseup, []);

  useEffect(() => {
    if (!!props.width) setDrawerWidth(getAppropriateWidth(props.width));
    else setDrawerWidth(getAppropriateWidth(100));
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
    if (!mainRef || !mainRef.current) return;

    let boundingRect = mainRef.current.getBoundingClientRect();

    let offsetRight =
      boundingRect.width -
      (isTouchEvent(e) ? e.touches[e.touches.length - 1].clientX : e.clientX) +
      boundingRect.left;

    setDrawerWidth(getAppropriateWidth(offsetRight));
  }

  return (
    <div className={classes.drawer_wrapper}>
      <div className={classes.drawer}>
        <Drawer {...props} width={drawerWidth} style={{ position: "absolute" }}>
          <div
            draggable
            className={classes.sidebar_dragger}
            onTouchStart={(e: ReactTouchEvent<HTMLDivElement>) =>
              handleMousedown(e, "touch")
            }
            onMouseDown={(e: ReactMouseEvent<HTMLDivElement, MouseEvent>) =>
              handleMousedown(e, "mouse")
            }
          />
          <button className={classes.calculator_button}>
            {drawerWidth && drawerWidth > 300 ? (
              "Switch Mode"
            ) : (
              <SyncOutlined size={32} />
            )}
          </button>
          <Content width={drawerWidth} />
        </Drawer>
      </div>
    </div>
  );
};

export default Toolbar;
