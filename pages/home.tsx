import { NextPage } from "next";
import ThreeElement from "../components/ThreeElement";
import Translation from "../components/Tranlation";

const Home: NextPage = () => {
  return (
    <div
      id="HomePage"
      className="mx-7 lg:my-12 my-7 flex flex-col flex-1 justify-between text-center lg:text-left"
    >
      <div className="flex flex-col items-center lg:items-start">
        <Translation text="developer" className="lg:text-7xl text-4xl" />
        <Translation
          text="slogan"
          className="lg:text-2xl font-extralight lg:w-3/12 w-8/12 text-lg"
        />
      </div>
      <ThreeElement />
      <Translation
        text="bio"
        className="lg:text-2xl font-extralight lg:w-3/12 text-lg lg:text-right text-center lg:self-end self-center"
      />
    </div>
  );
};

export default Home;
