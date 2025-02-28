import FaceBookIcon from "../assets/icons/FacebookIcon";
import XIcon from "../assets/icons/XIcon";
import MapPointIcon from "../assets/icons/MapIcon";
import PhoneIcon from "../assets/icons/PhoneIconFooter";
import MailIcon from "../assets/icons/MailIcon";
import TikTokIcon from "../assets/icons/TiktokIcon";
import FooterStyle from "./scss/Footer.module.scss";
import { useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();
  const handleNavigateToHome = () => {
    navigate("/home");
  };
  const handleNavigateToCart = () => {
    navigate("/cart");
  };
  const handleNavigateToUser = () => {
    navigate("/user");
  };
  const handleNavigateToAboutUs = () => {
    navigate("/aboutus");
  };
  return (
    <footer className={FooterStyle.footerWrapper}>
      <h1>Lainovo</h1>
      <div className={FooterStyle.infoWrapper}>
        <div className={FooterStyle.footerInfomation}>
          <div>
            <span>
              <MapPointIcon />
              8/4C1 tổ 8 ấp 3 xã Xuân Thới Đông, huyện Hóc Môn, tp Hồ Chí Minh
            </span>
            <span>
              <PhoneIcon />
              0988681424
            </span>
            <span>
              <MailIcon />
              thienthan726@gmail.com
            </span>
          </div>
        </div>
        <div className={FooterStyle.footerSupportAndPolicy}>
          <div id={FooterStyle.footerSupport}>
            <span>CUSTOMER SUPPORT</span>
            <ul>
              <li>Frequently Asked Questions</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>
          <div id={FooterStyle.footerPolicy}>
            <span>POLICY</span>
            <ul>
              <li>Privacy Policy</li>
              <li>Payment Policy</li>
              <li>Shipping Policy</li>
              <li>Return Policy</li>
            </ul>
          </div>
          <div id={FooterStyle.footerMediaSocial}>
            <span>MEDIA SOCIAL</span>
            <div>
              <ul>
                <li>
                  <XIcon />
                </li>
                <li>
                  <FaceBookIcon />
                </li>
                <li>
                  <TikTokIcon />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={FooterStyle.footerContactMedia}>
          <span>MEDIA SOCIAL</span>
          <div>
            <ul>
              <li>
                <XIcon />
              </li>
              <li>
                <FaceBookIcon />
              </li>
              <li>
                <TikTokIcon />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
