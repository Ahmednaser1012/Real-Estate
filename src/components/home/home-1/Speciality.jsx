import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import video1 from "../../../assets/HomePage/video1.mp4";

const Speciality = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const checkItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="pt-10 pb-16"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="flex flex-wrap gap-10">
        <motion.div
          className="flex-1 basis-[20rem]"
          variants={leftSideVariants}
        >
          <motion.h1 className="sub-heading" variants={checkItemVariants}>
            {t("about.title")}
          </motion.h1>
          <motion.h1 className="heading" variants={checkItemVariants}>
            {t("about.overview.heading")}
          </motion.h1>
          <motion.p className="mt-3" variants={checkItemVariants} dir={isRTL ? "rtl" : "ltr"}>
            {t("about.overview.description")}
          </motion.p>
          <motion.div className="mt-4" variants={checkItemVariants}>
            <motion.div
              className="flex-align-center gap-x-2"
              variants={checkItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="icon-box text-primary bg-gray-200/60 "
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheck />
              </motion.div>
              <p>{t("about.overview.items.item1")}</p>
            </motion.div>
            <motion.div
              className="mt-2 flex-align-center gap-x-2"
              variants={checkItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="icon-box text-primary bg-gray-200/60 "
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheck />
              </motion.div>
              <p>{t("about.overview.items.item2")}</p>
            </motion.div>
            <motion.div
              className="mt-2 flex-align-center gap-x-2"
              variants={checkItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="icon-box text-primary bg-gray-200/60 "
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheck />
              </motion.div>
              <p>{t("about.overview.items.item3")}</p>
            </motion.div>
            <motion.div
              className="mt-2 flex-align-center gap-x-2"
              variants={checkItemVariants}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className="icon-box text-primary bg-gray-200/60"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.3 }}
              >
                <FiCheck />
              </motion.div>
              <p>{t("about.overview.items.item4")}</p>
            </motion.div>
            <motion.button
              className="mt-4 btn btn-primary"
              variants={checkItemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {t("common.readMore")}
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex-1 basis-[20rem]"
          variants={rightSideVariants}
        >
          <div className="relative">
            <motion.video
              src={video1}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="rounded-lg w-full sm:h-[400px] object-fill"
              initial={{
                scale: 1.2,
                opacity: 0,
                clipPath: "inset(0 100% 0 0)",
              }}
              animate={
                inView
                  ? {
                      scale: 1,
                      opacity: 1,
                      clipPath: "inset(0 0% 0 0)",
                    }
                  : {
                      scale: 1.2,
                      opacity: 0,
                      clipPath: "inset(0 100% 0 0)",
                    }
              }
              transition={{
                duration: 1.2,
                ease: "easeOut",
                clipPath: { duration: 1.5, ease: "easeInOut" },
              }}
              whileHover={{ scale: 1.02 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Speciality;
