import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Row, Col } from "antd";
import { DescriptionText } from "components/DescriptionText/DescriptionText";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { DownOutlined } from "@ant-design/icons";

import styles from "./Calculators.module.scss";

const Calculators: React.FC = () => {
  const { t } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState("1rm");

  const calculators = [
    {
      id: "1rm",
      title: t("1RMcalc"),
      description: t("1RMcalcDesc"),
      icon: <DownOutlined className={styles.icon} />,
    },
    {
      id: "water",
      title: t("waterCalc"),
      description: t("waterCalcDesc"),
      icon: <DownOutlined className={styles.icon} />,
    },
    {
      id: "bmi",
      title: t("BMIcalc"),
      description: t("BMIcalcDesc"),
      icon: <DownOutlined className={styles.icon} />,
    },
  ];
  //test
  return (
    <>
      <PageWrapper>
        <DescriptionTitle text={"calculators"} textAlign={"center"} />
        <DescriptionText
          text={t("calculatorDescription")}
          textAlign={"center"}
        />
        <Row
          gutter={[16, 16]}
          justify="center"
          className={styles.cardContainer}
        >
          {calculators.map((calc) => (
            <Col key={calc.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                className={`${styles.card} ${
                  activeCalculator === calc.id ? styles.active : ""
                }`}
                onClick={() => setActiveCalculator(calc.id)}
              >
                <div className={styles.iconWrapper}>{calc.icon}</div>
                <h3 className={styles.title}>{calc.title}</h3>
                <p className={styles.description}>{calc.description}</p>
              </Card>
            </Col>
          ))}
        </Row>
        <div className={styles.calculatorContainer}>
          {activeCalculator === "1rm" && <div>1RM</div>}
          {activeCalculator === "water" && <div>Water</div>}
          {activeCalculator === "bmi" && <div>BMI</div>}
        </div>
        <DescriptionText
          text={t("calculatorDescription2")}
          textAlign={"center"}
        />
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default Calculators;
