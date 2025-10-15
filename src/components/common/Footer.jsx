/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.PNG";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FiFacebook />,
      url: "https://www.facebook.com/share/1CKtuDDwbC/?mibextid=wwXIfr",
      label: "Facebook",
    },
    {
      icon: <FaTwitter />,
      url: "https://twitter.com/LevelsDevelopments",
      label: "Twitter",
    },
    {
      icon: <FaInstagram />,
      url: "https://www.instagram.com/levels.developments?igsh=MTBydmpjaXN2NnRtNw==",
      label: "Instagram",
    },
    {
      icon: <FaLinkedin />,
      url: "https://www.linkedin.com/company/levels-developments",
      label: "LinkedIn",
    },
  ];

  return (
    <div className="text-slate-200">
      <footer>
        <div className="flex flex-wrap gap-2 px-4 mx-auto max-w-7xl">
          {/* Logo & Socials */}
          <div className="flex-1 basis-[10rem]">
            <Link to="/" className="flex items-center flex-shrink-0 gap-x-1">
              <img
                src={logo}
                alt="Logo"
                className="object-contain h-16 w-36 rtl:ms-10"
              />
            </Link>

            {/* Social Icons */}
            <div className="mt-1">
              <div className="flex justify-center gap-5 my-6 md:justify-start">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-10 h-10 text-xl text-white transition-colors duration-300 rounded-full shadow-md icon-box bg-dark-light hover:bg-hover-color-dark"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Services</h2>
            <ul>
              <li className="my-3 text-muted">
                <a href="#">Order Tracking</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Wishlist</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Terms of Use</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Contact Support</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">2-Year Guarantee</a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Quick Links</h2>
            <ul>
              <li className="my-3 text-muted">
                <a href="#">About Us</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Services</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Blog</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Portfolio</a>
              </li>
            </ul>
          </div>

          {/* Business */}
          <div className="flex-1 basis-[10rem]">
            <h2 className="text-xl font-semibold">Business</h2>
            <ul>
              <li className="my-3 text-muted">
                <a href="#">Success</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Guide</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Mission</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Terms & Conditions</a>
              </li>
              <li className="my-3 text-muted">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 basis-[10rem] text-center md:text-left">
            <h2 className="text-xl font-semibold">
              Subscribe to our Newsletter
            </h2>
            <p className="text-sm text-muted">
              Subscribe to be the first one to know about updates. Enter your
              email.
            </p>
            <div className="flex items-center justify-center my-3">
              <input
                type="text"
                className="px-4 py-[0.35rem] card-bordered dark:shadow-none outline-none bg-transparent rounded-lg border-dark"
                placeholder="Email Address..."
              />
              <button className="-ml-2 btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>

      <div className="py-2 mt-3 text-center border-t text-muted border-dark">
        <p>
          Created By{" "}
          <span className="font-semibold text-primary">
            Levels Development
          </span>{" "}
          | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
