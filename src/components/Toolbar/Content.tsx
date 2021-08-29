import {
  FC,
  SVGProps,
  createElement,
  useContext,
  useEffect,
  useState,
  Fragment,
} from "react";
import { Move, Point, Select } from "images/toolbar";
import classes from "./content.module.css";
import clsx from "clsx";
import { Tooltip, Row, Col } from "antd";
import { ButtonContext } from "context";
import type { AsyPadActions } from "asypad";

type Button = {
  icon: FC<SVGProps<SVGSVGElement>>;
  title: AsyPadActions;
  main: boolean;
};

type Category = {
  name: string;
  buttons: Button[];
};

const categories: Category[] = [
  {
    name: "Edit",
    buttons: [
      {
        title: "Move",
        icon: Move,
        main: true,
      },
      {
        title: "Select",
        icon: Select,
        main: false,
      },
    ],
  },
  {
    name: "Draw",
    buttons: [
      {
        title: "Point",
        icon: Point,
        main: true,
      },
    ],
  },
];

const Content: FC<{ width?: number; wide: boolean }> = ({ width, wide }) => {
  const buttonWidth = 40;
  const { current: selected, setCurrent: setSelected } =
    useContext(ButtonContext);

  const [isWide, setIsWide] = useState<boolean>(false);

  useEffect(() => setIsWide(wide), [wide]);

  return (
    <div className={classes.body_wrapper}>
      {categories.map(({ name, buttons }) => (
        <Fragment key={`toolbar-category-${name}`}>
          {isWide && (
            <div className={classes.category_header}>
              <h2>{name}</h2>
            </div>
          )}
          <Row className={classes.centered_row} gutter={24}>
            {buttons
              .filter(({ main }) => main || isWide)
              .map(({ icon, title }) => (
                <Col key={`toolbar-action-${title}`}>
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
                      style={{
                        width: buttonWidth + 1,
                        height: buttonWidth + 1,
                      }}
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
                      [classes.hidden]: !isWide,
                    })}
                  >
                    {title}
                  </div>
                </Col>
              ))}
          </Row>
        </Fragment>
      ))}
    </div>
  );
};

export default Content;
