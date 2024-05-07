import React, { useEffect } from "react";

import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { DescriptionTitle } from "../../components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { SubTitle } from "../../components/SubTitle/SubTitle";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { Calendar } from "../../components/Calendar/Calendar";
import { CustomButton } from "../../components/CustomButton/CustomButton";

import styles from "./Workout.module.scss";

const Workout: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <PageWrapper>
      <div className={styles.test}>
        <DescriptionTitle text="Your chest workout" textAlign="center" />
        <SubTitle>Indicate your weight and reps</SubTitle>
        <Form form={form} initialValues={{ remember: true }} layout="vertical">
          <div className={styles.addExercise}>
            <div className={styles.name}>
              <CustomInput
                name={"Exercise"}
                text={"Type your exercise"}
                placeholder={"Exercise name"}
                isRequired={true}
                className={styles.input}
              />
            </div>
            <div className={styles.date}>
              <div className={styles.exerciseDescription}></div>
              <Form.Item
                name={"Enter date"}
                label={<span className={styles.inputLabel}>Enter date</span>}
              >
                <Calendar className={styles.input} />
              </Form.Item>
            </div>
            <CustomButton icon={<PlusOutlined />} className={styles.addBtn}>
              Add
            </CustomButton>
          </div>
        </Form>
        <SubTitle>Recently used</SubTitle>
        <div className={styles.recentlyUsed}>
          <Button
            shape="round"
            type="primary"
            size="large"
            className={styles.usedItem}
          >
            Bench press
          </Button>
          <Button
            shape="round"
            type="primary"
            size="large"
            className={styles.usedItem}
          >
            Cable Fly
          </Button>
          <Button
            shape="round"
            type="primary"
            size="large"
            className={styles.usedItem}
          >
            Pec Deck
          </Button>
          <Button
            shape="round"
            type="primary"
            size="large"
            className={styles.usedItem}
          >
            Push ups
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Workout;
