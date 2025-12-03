import { OverView, Stats } from "../components/about";
import { Brands, Categories, Counter, Feeds, Team } from "../components/common/page-componets";

const AboutTwo = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto px-4">
      <Stats />
      <OverView />
      {/* <Brands /> */}
      {/* <WhatWeDo /> */}
      <Categories />
      {/* <Counter /> */}
      <Team />
      {/* <Feeds /> */}
    </div>
  );
};

export default AboutTwo;
