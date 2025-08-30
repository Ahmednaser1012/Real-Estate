import {
  Brands,
  Counter,
  Featured,
  Projects,
  Services,
  // Testimonial,
} from "../components/common/page-componets";
import {
  // Feeds,
  Filters,
  Hero,
  // Invest,
  Speciality,
} from "../components/home/home-1";
import GetInTouch from "../components/home/home-1/GetInTouch";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="max-w-7xl mx-auto px-4">
        <div className="mt-16">
          <Filters />
          {/* <Invest /> */}
          <Speciality />
          <Services />
          <Featured />
          <Counter />
          <Projects />
          {/* <Testimonial /> */}
          <Brands />
          <GetInTouch />
          {/* <Feeds /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
