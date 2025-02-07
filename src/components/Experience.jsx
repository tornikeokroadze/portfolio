import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import { tt } from "../lang/tt";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience[tt("date")]}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div
          className="flex justify-center items-center w-full h-full cursor-pointer hover:scale-125"
          onClick={() => window.open(experience.link, "_blank")}
        >
          <img
            src={experience.icon}
            alt={experience[tt("company_name")]}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div
        onClick={() => window.open(experience.link, "_blank")}
        className="cursor-pointer hover:scale-105"
      >
        <h3 className="text-white text-[24px] font-bold">{experience[tt("title")]}</h3>
        <p
          className="text-secondary text-[16px] font-semibold"
          style={{ margin: 0 }}
        >
          {experience[tt("company_name")]}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience[tt("points")].map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const { t } = useTranslation();
  
  return (
    <>
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          {t("What I have done so far")}
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
