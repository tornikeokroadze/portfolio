import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from "react-i18next";
import { tt } from "../lang/tt";

const ProjectCard = ({ index, project }) => {
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      whileInView={{ opacity: 1 }}
    >
      <a href={project.source || '#Projects'} target={project.source ? '_blank' : ''}>
        <Tilt
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
        >
          <div className="relative w-full h-[230px]">
            <img
              src={project.image}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl"
            />

            {project.source_code_link && (
              <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                <div
                  onClick={() =>
                    window.open(project.source_code_link, "_blank")
                  }
                  className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-1/2 h-1/2 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">
              {project[tt("name")]}
            </h3>
            <p className="mt-2 text-secondary text-[14px]">
              {project[tt("description")]}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <p key={index} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </Tilt>
      </a>
    </motion.div>
  );
};

const Works = () => {
  const { t } = useTranslation();

  return (
    <>
      <motion.div variants={textVariant()} whileInView={{ opacity: 1 }}>
        <p className={`${styles.sectionSubText} `}>{t("My work")}</p>
        <h2 className={`${styles.sectionHeadText}`}>{t("Projects")}</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          whileInView={{ opacity: 1 }}
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          {t("Projects Description")}
        </motion.p>
      </div>

      <div className="mt-20 sm:flex sm:flex-wrap gap-7 space-y-8 sm:space-y-0">
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            project={project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "Projects");
