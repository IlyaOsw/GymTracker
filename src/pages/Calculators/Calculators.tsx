import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Row, Col, Divider } from "antd";
import { DescriptionText } from "components/DescriptionText/DescriptionText";
import { DescriptionTitle } from "components/DescriptionTitle/DescriptionTitle";
import { PageWrapper } from "components/PageWrapper/PageWrapper";
import { CustomFooter } from "layout/CustomFooter/CustomFooter";
import { useSelector } from "react-redux";
import { CalculatorReducerType } from "types/calculators/calculator-reducer";

import { RMCalculator } from "./RMCalculator/RMCalculator";
import { WaterCalculator } from "./WaterCalculator/WaterCalculator";
import { BMICalculator } from "./BMICalculator/BMICalculator";

import styles from "./Calculators.module.scss";

const Calculators: React.FC = () => {
  const { t } = useTranslation();
  const calculators = useSelector(
    (state: { calculators: CalculatorReducerType[] }) => state.calculators
  );
  const [activeCalculator, setActiveCalculator] = useState<string>("1rm");

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
                <img
                  src={calc.icon}
                  alt={t(calc.title)}
                  className={styles.icon}
                />
                <h3 className={styles.title}>{t(calc.title)}</h3>
                <p className={styles.description}>{t(calc.description)}</p>
              </Card>
            </Col>
          ))}
        </Row>
        <Divider style={{ backgroundColor: "gray" }} />
        {activeCalculator === "1rm" && <RMCalculator />}
        {activeCalculator === "water" && <WaterCalculator />}
        {activeCalculator === "bmi" && <BMICalculator />}
      </PageWrapper>
      <CustomFooter />
    </>
  );
};

export default Calculators;
