import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { contact } from "../constants";
import { useTranslation } from "react-i18next";
import { tt } from "../lang/tt";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-2 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>{t("Get in touch")}</p>
        <h3 className={styles.sectionHeadText}>{t("Contact")}</h3>

        {contact.map((item) => (
          <div
            key={item.id}
            className={`flex flex-row justify-start items-center mt-4 ${item.link || item.href ? 'cursor-pointer hover:scale-105' : ''}`}
            onClick={() => item.link ? window.open(item.link, "_blank") : (item.href ? window.location.href = item.href : null)}
          >
            <div className="black-gradient w-10 h-10 lg:w-14 lg:h-14 rounded-full flex justify-center items-center">
              <img
                src={item.icon}
                alt={item.alt}
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
            <p className={`ml-3 text-sm lg:text-xl`}>{item[tt("text")]}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <ComputersCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
