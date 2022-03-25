import { NextPage } from "next";
import { motion, useAnimation } from "framer-motion";
import { useAppContext } from "../context";
import { useEffect, useRef } from "react";
import classNames from "classnames";

interface ITranslations {
  text: string;
  hover?: boolean;
  className?: any;
}

const Translation: NextPage<ITranslations> = ({
  text,
  hover,
  className = "",
  ...props
}) => {
  const { appState } = useAppContext();
  const { translations, language } = appState;
  const controls = useAnimation();
  const parentRef = useRef<HTMLDivElement>(null);
  const transitionPx = parentRef.current
    ? parentRef.current.offsetWidth * 0.5
    : 0;

  useEffect(() => {
    controls.start({
      backgroundColor: ["#E0E1DD", "#E0E1DD00"],
      skew: ["-15deg", "0"],
    });
  }, [language]);

  return hover ? (
    <motion.div
      ref={parentRef}
      animate={controls}
      className={classNames(
        className,
        "inline-block cursor-pointer items-center"
      )}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(100000)",
      }}
      whileHover={{ rotateY: -90 }}
      {...props}
    >
      <p
        className="absolute w-full text-center"
        style={{ transform: `translateZ(${transitionPx}px)` }}
      >
        {translations[text] || text}
      </p>
      <p
        style={{
          transform: `rotateY(90deg) translateZ(${transitionPx}px)`,
          fontSize: ".95rem",
        }}
        className="inline-block font-cursive"
      >
        {translations[text] || text}
      </p>
    </motion.div>
  ) : (
    <p className={classNames(className, "cursor-default")}>
      {translations[text] || text}
    </p>
  );
};

export default Translation;
