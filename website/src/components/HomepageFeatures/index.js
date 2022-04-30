import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Zero code",
    Svg: require("@site/static/img/bulb.svg").default,
    description: <>Driven by config files</>,
  },
  {
    title: "Minimal maintenance",
    Svg: require("@site/static/img/refresh.svg").default,
    description: <>Plugin and forget</>,
  },
  {
    title: "Smallest size",
    Svg: require("@site/static/img/plane.svg").default,
    description: <>No dependencies</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
