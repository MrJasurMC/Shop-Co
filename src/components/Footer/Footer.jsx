import React from 'react'
import { Link } from "react-router-dom"
import pays from "./assets/images/pays.png"
import { TfiEmail } from "react-icons/tfi";
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

function Footer() {
  const notify = () => toast.success("Thank you for subscribing to our newsletter!");

  return (
    <footer className='w-full px-4 md:px-[90px] pt-[80px] md:pt-[140px] pb-8 md:pb-10 mt-16 md:mt-[200px] bg-[#F0F0F0] relative'>
          <ToastContainer />
      <div className="w-full max-w-[1240px] mx-auto px-6 md:px-16 py-8 md:py-[43px] rounded-[20px] bg-black flex flex-col md:flex-row items-start md:items-center justify-between gap-6 absolute top-[-60px] md:top-[-100px] left-1/2 -translate-x-1/2">
        <h1 className="w-full md:w-[551px] text-white text-[24px] md:text-[40px] font-bold leading-[30px] md:leading-[45px]" style={{ fontFamily: 'Integral CF' }}>
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h1>
        <div className="flex flex-col gap-[10px] w-full md:w-auto">
          <div className="w-full md:w-[349px] h-12 px-4 rounded-[62px] bg-white flex items-center gap-[10px]">
            <TfiEmail className='text-black/40 text-xl flex-shrink-0' />
            <input type="text" className="w-full border-0 bg-transparent placeholder:text-sm placeholder:text-black/40 focus:outline-none" placeholder='Enter your email address' />
          </div>
          <button
            type="button"
            className='w-full md:w-[349px] h-12 rounded-[62px] bg-white flex items-center justify-center text-sm md:text-base font-medium cursor-pointer border-0 transition-all duration-200 hover:bg-white/90 active:scale-[0.98]'
            onClick={notify}
          >
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      <div className="w-full pb-8 md:pb-[50px] flex flex-col md:flex-row items-start gap-8 md:gap-[80px] border-b border-black/10">
        <div className="w-full md:w-[248px] flex flex-col gap-4 md:gap-5">
          <Link to="/" className="text-[28px] md:text-[32px] font-bold text-black hover:opacity-70 transition-opacity" style={{ fontFamily: 'Integral CF' }}>SHOP.CO</Link>
          <p className="text-black/60 text-sm leading-[22px]">We have clothes that suits your style and which you're proud to wear. From women to men.</p>
          <div className="w-full flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-[#00000033]  cursor-pointer hover:bg-black hover:text-white transition-colors">
              <FaTwitter />
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-[#00000033]  cursor-pointer hover:bg-black hover:text-white transition-colors">
              <FaFacebookF />
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-[#00000033]  cursor-pointer hover:bg-black hover:text-white transition-colors">
              <FaInstagram />
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black border border-[#00000033] cursor-pointer hover:bg-black hover:text-white transition-colors">
              <FaGithub />
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-2 md:flex md:flex-1 md:justify-between gap-6 md:gap-0">
          {[
            { title: 'COMPANY', links: ['About', 'Features', 'Works', 'Career'] },
            { title: 'HELP', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
            { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
            { title: 'RESOURCES', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
          ].map(col => (
            <ul key={col.title} className="flex flex-col gap-3 md:gap-4">
              <h3 className='font-medium text-sm md:text-base tracking-[3px]'>{col.title}</h3>
              {col.links.map(link => (
                <li key={link}>
                  <Link className='text-black/60 text-sm md:text-base hover:text-black transition-colors duration-150'>{link}</Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="w-full pt-5 md:pt-[25px] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <p className="text-black/60 text-xs md:text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
        <img src={pays} alt="payment methods" className="h-6 md:h-auto" />
      </div>
    </footer>
  )
}

export default Footer
