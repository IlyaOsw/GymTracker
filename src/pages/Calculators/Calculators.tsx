import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Row, Col } from "antd";
import { DescriptionText } from "components/DescriptionText/DescriptionText";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";

import { RmCalculator } from "./RmCalculator/RmCalculator";
import styles from "./Calculators.module.scss";

const Calculators: React.FC = () => {
  const { t } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState("1rm");

  const calculators = [
    {
      id: "1rm",
      title: t("1RMcalc"),
      description: t("1RMcalcDesc"),
      icon: (
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Calculators/1rm.svg"}
          alt="1rm icon"
        />
      ),
    },
    {
      id: "water",
      title: t("waterCalc"),
      description: t("waterCalcDesc"),
      icon: (
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Calculators/water.svg"}
          alt="Water icon"
        />
      ),
    },
    {
      id: "bmi",
      title: t("BMIcalc"),
      description: t("BMIcalcDesc"),
      icon: (
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Calculators/bmi.svg"}
          alt="BMI icon"
        />
      ),
    },
  ];

  return (
    <>
      <PageWrapper>
        <DescriptionTitle text={"calculators"} textAlign={"center"} />
        <DescriptionText
          text={t("calculatorDescription")}
          textAlign={"center"}
        />
        <Row gutter={[16, 16]} justify="center">
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

        {activeCalculator === "1rm" && <RmCalculator />}
        {activeCalculator === "water" && <div>Water</div>}
        {activeCalculator === "bmi" && <div>BMI</div>}

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
