import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import i18n from 'i18next';

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { recommendations } from "../constants";
import { tt } from '../lang/tt';

const FeedbackCard = ({
  index,
  testimonial
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>

    <div className="mt-1 cursor-pointer" onClick={() => window.open(testimonial.link, "_blank")}>
      <p className="text-white hover:text-gray-300 tracking-wider text-[18px]">{testimonial[tt("testimonial")]}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px] hover:text-gray-400">
            <span className="blue-text-gradient">@</span> {testimonial[tt("name")]}
          </p>
          <p className="mt-1 text-secondary text-[12px] hover:text-gray-200">
            {testimonial[tt("designation")]} {i18n.language == "en" && "of"} {testimonial[tt("company")]}
          </p>
        </div>
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt="download"
            className="w-8 h-8 rounded-full hover:scale-125"
            style={{ filter: "invert(50%) sepia(100%) saturate(1000%) hue-rotate(200deg)" }}
          />
        ) : null}
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  const { t } = useTranslation();
  return (
    <div className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>{t("What others say")}</p>
          <h2 className={styles.sectionHeadText}>{t("Recommendations")}</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 space-y-8 sm:space-y-0 ${styles.paddingX} flex flex-wrap justify-around`}>
        {recommendations.map((testimonial, index) => (
          <FeedbackCard key={index} index={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "Recommendations");
