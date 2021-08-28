import { FC, useRef } from "react";
import classes from "./Canvas.module.css";
import Toolbar from "components/Toolbar";
import { ScreenSizes } from "utils/calc";

const Canvas: FC<{}> = () => {
  const main = useRef<HTMLDivElement | null>(null);
  return (
    <div ref={main} className={classes.main}>
      <svg className={classes.canvas}>
        <text>Content</text>
      </svg>
      <Toolbar
        minWidth={{ number: 100, unit: ScreenSizes.PX }}
        maxWidth={{ number: 50, unit: ScreenSizes.VW }}
        closable={false}
        mask={false}
        contentWrapperStyle={{
          borderWidth: "0px 0px 0px 1px",
          borderColor: "black",
          borderStyle: "solid",
          boxShadow:
            "-20px 0 16px -8px rgb(0 0 0 / 8%), -9px 0 28px 0 rgb(0 0 0 / 5%), -12px 0 48px 16px rgb(0 0 0 / 3%)",
        }}
        mainRef={main}
        visible
        getContainer={false}
      />
    </div>
  );
};

export default Canvas;
