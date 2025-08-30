import { services } from "../../../data/dummyData";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
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
      {/* Header */}
      <motion.div 
        className="text-center mb-12"
        variants={cardVariants}
      >
        <h1 className="mx-auto sub-heading">services</h1>
        <h1 className="heading mt-2">
          specialists services provided in this apartment building
        </h1>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ id, name, icon, text }) => (
          <motion.div
            key={id}
            className="group relative p-8 text-center rounded-2xl bg-white dark:bg-card-dark border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 cursor-pointer"
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                transition: { duration: 0.3 }
              }}
            >
              <div className="text-3xl">{icon}</div>
            </motion.div>

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                {name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {text}
              </p>
            </div>

            {/* Bottom Accent Line */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-primary rounded-full"
              initial={{ width: 0 }}
              whileHover={{ 
                width: "100%",
                transition: { duration: 0.4, ease: "easeOut" }
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;