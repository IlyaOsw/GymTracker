import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { ClosableMessagePropsType } from "../../types/components/closable-message";

import styles from "./ClosableMessage.module.scss";

export const ClosableMessage = ({
  type,
  content,
}: ClosableMessagePropsType) => {
  const key = "closable-message";

  message[type]({
    key,
    content: (
      <>
        {content}
        <CloseOutlined
          onClick={() => message.destroy(key)}
          className={styles.closeIcon}
        />
      </>
    ),
    className: styles.customMessage,
  });
};
