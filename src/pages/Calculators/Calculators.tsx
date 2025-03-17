import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Row, Col, Divider } from "antd";
import { DescriptionText } from "components/DescriptionText/DescriptionText";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";

import { RMCalculator } from "./RMCalculator/RMCalculator";
import { WaterCalculator } from "./WaterCalculator/WaterCalculator";
import { BMICalculator } from "./BMICalculator/BmiCalculator";

import styles from "./Calculators.module.scss";

const Calculators: React.FC = () => {
  const { t } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState<string>("1rm");

  const calculators = [
    {
      id: "1rm",
      title: t("1RMcalc"),
      description: t("1RMcalcDesc"),
      icon: (
        <img
          src={process.env.PUBLIC_URL + "/assets/Icons/Calculators/1rm.svg"}
          alt="1rm"
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
          alt="Water"
        />
      ),
    },
    // {
    //   id: "bmi",
    //   title: t("BMIcalc"),
    //   description: t("BMIcalcDesc"),
    //   icon: (
    //     <img
    //       src={process.env.PUBLIC_URL + "/assets/Icons/Calculators/bmi.svg"}
    //       alt="BM"
    //     />
    //   ),
    // },
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
        <Divider style={{ backgroundColor: "gray" }} />
        {activeCalculator === "1rm" && <RMCalculator />}
        {activeCalculator === "water" && <WaterCalculator />}
        {activeCalculator === "bmi" && <BMICalculator />}
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
