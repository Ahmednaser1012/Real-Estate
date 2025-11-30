import { BiMap } from "react-icons/bi";
import { FiMail, FiPhone } from "react-icons/fi";
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const ContactInfo = () => {
  const { t } = useTranslation();
  const socials = [
    {
      name: "TikTok",
      icon: <FaTiktok />,
      url: "https://tiktok.com/@levelsdevelopment",
      color: "hover:text-black", // TikTok: black
    },
    {
      name: "YouTube",
      icon: <FaYoutube />,
      url: "https://youtube.com/@LevelsDevelopments",
      color: "hover:text-red-600",
    },
    {
      name: "Facebook",
      icon: <FaFacebook />,
      url: "https://www.facebook.com/share/1CKtuDDwbC/?mibextid=wwXIfr",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      url: "https://www.instagram.com/levels.developments?igsh=MTBydmpjaXN2NnRtNw==",
      color: "hover:text-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 md:grid-cols-3">
      {/* 📞 Phone */}
      <div className="text-center">
        <div className="icon-box !h-14 !w-14 !bg-primary text-white mx-auto text-2xl flex items-center justify-center rounded-full shadow-md">
          <FiPhone />
        </div>
        <h2 className="mt-3 text-lg font-semibold">{t('contactInfo.hotLine')}</h2>
        <p className="">{t('contactInfo.phone')}</p>
      </div>

      {/* 💌 Socials */}
      <div className="text-center">
        <div className="icon-box !h-14 !w-14 !bg-primary text-white mx-auto text-2xl flex items-center justify-center rounded-full shadow-md">
          <FiMail />
        </div>
        <h2 className="mt-3 text-lg font-semibold">{t('contactInfo.followUs')}</h2>

        <div className="flex justify-center gap-5 mt-3 text-2xl">
          {socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
              className={`transition-colors duration-200 ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* 📍 Address */}
      <div className="text-center">
        <div className="icon-box !h-14 !w-14 !bg-primary text-white mx-auto text-2xl flex items-center justify-center rounded-full shadow-md">
          <BiMap />
        </div>
        <h2 className="mt-3 text-lg font-semibold">{t('contactInfo.officeAddress')}</h2>
        <p className="">{t('contactInfo.address1')}</p>
        <p className="">{t('contactInfo.address2')}</p>
      </div>
    </div>
  );
};

export default ContactInfo;
