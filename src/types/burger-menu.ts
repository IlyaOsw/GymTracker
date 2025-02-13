import { GetProp, MenuProps } from "antd";

export type BurgerMenuItem = GetProp<MenuProps, "items">[number];
