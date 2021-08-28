import { FC, SVGProps, createElement, useContext } from "react";
import { Move, Point } from "images/toolbar";
import classes from "./content.module.css";
import clsx from "clsx";
import { Tooltip, Row, Col } from "antd";
import { ButtonContext } from "context";

const buttons: {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: string;
  main: boolean;
}[] = [
  {
    title: "Move",
    icon: Move,
    main: true,
  },
  {
    title: "Point",
    icon: Point,
    main: true,
  },
];

const Content: FC<{ width?: number }> = ({ width }) => {
  const buttonWidth = Math.min(60, ((width || 0) * 2) / 5);
  const { current: selected, setCurrent: setSelected } =
    useContext(ButtonContext);

  return (
    <Row className={classes.centered_row} gutter={24}>
      {buttons
        .filter(({ main }) => main || (width && width > 300))
        .map(({ icon, title }) => (
          <Col>
            <Tooltip
              placement={width && width > 300 ? "top" : "left"}
              color="purple"
              title={title}
            >
              <div
                className={clsx({
                  [classes.button]: true,
                  [classes.button_selected]: selected === title,
                })}
                style={{ width: buttonWidth + 1, height: buttonWidth + 1 }}
                onClick={() => setSelected(title)}
              >
                {createElement(icon, {
                  width: buttonWidth,
                  height: buttonWidth,
                })}
              </div>
            </Tooltip>
            <div
              className={clsx({
                [classes.text_align_center]: true,
                [classes.hidden]: !width || width <= 300,
              })}
            >
              {title}
            </div>
          </Col>
        ))}
    </Row>
  );
};

export default Content;
