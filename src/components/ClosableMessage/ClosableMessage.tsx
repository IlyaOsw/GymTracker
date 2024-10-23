import { message } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { ClosableMessagePropsType } from "../../types/types";

import styles from "./ClosableMessage.module.scss";

export const ClosableMessage = ({
  type,
  content,
}: ClosableMessagePropsType) => {
  const key = "closable-message";

  const closeMessage = () => message.destroy(key);

  message[type]({
    key,
    content: (
      <div>
        {content}
        <CloseOutlined onClick={closeMessage} className={styles.closeIcon} />
      </div>
    ),
    className: styles.customMessage,
  });
};
