import { AiFillFacebook, AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { SiInstagram } from 'react-icons/si';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='mb-5 flex items-center justify-between px-10'>
      <div className='text-sm'>© {new Date().getFullYear()} CinemaNet</div>
      <div className='flex items-center gap-2 text-4xl'>
        <Link to='https://t.me/jsdestroyer'>
          <FaTelegramPlane />
        </Link>
        <Link to='https://www.facebook.com/profile.php?id=100012196578914'>
          <AiFillFacebook />
        </Link>
        <Link to='https://instagram.com/kuku_ot_vlada?igshid=YmMyMTA2M2Y='>
          <SiInstagram />
        </Link>
        <Link to='mailto:mankivskiy.vlsd@gmail.com'>
          <AiOutlineMail />
        </Link>
        <Link to='https://github.com/RAK-MANIAK'>
          <AiFillGithub />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
