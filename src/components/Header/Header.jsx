import React, { useState } from 'react';
import { FaXmark } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';

function Header() {
  const [invisible, setInvisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = useSelector(state => state.cart.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className='w-full'>
      {invisible && (
        <div className="w-full h-[38px] flex items-center justify-center relative bg-black">
          <p className="text-white text-xs md:text-sm font-normal leading-none text-center px-8">
            Sign up and get 20% off to your first order.{' '}
            <span className="font-medium underline cursor-pointer hover:text-white/80 transition-colors">Sign Up Now</span>
          </p>
          <FaXmark
            className="text-white absolute right-4 text-xl cursor-pointer hover:opacity-70 transition-opacity active:scale-90"
            onClick={() => setInvisible(false)}
          />
        </div>
      )}

      <div className="w-full px-4 md:px-[90px] py-4 md:py-6 flex items-center justify-between gap-4 border-b border-black/5">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-2xl text-black cursor-pointer bg-transparent border-0 p-0"
            onClick={() => setMobileMenuOpen(true)}
          >
            <RiMenu3Line />
          </button>
          <Link to="/" className="text-[24px] md:text-[32px] font-bold text-black hover:opacity-80 transition-opacity" style={{ fontFamily: 'Integral CF' }}>
            SHOP.CO
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 flex-1">
          <ul className='flex items-center gap-6'>
            {[
              { label: 'Shop', to: '/categories' },
              { label: 'On Sale', to: '/categories' },
              { label: 'New Arrivals', to: '/' },
              { label: 'Brands', to: '/' },
            ].map(link => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-base font-normal text-black relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex-1 h-12 px-4 flex items-center gap-3 bg-[#F0F0F0] rounded-[62px] transition-all duration-200 focus-within:ring-2 focus-within:ring-black/20">
            <FaSearch className='text-black/40 text-lg flex-shrink-0' />
            <input type="text" className="w-full h-full bg-transparent border-0 text-base placeholder:text-black/40 focus:outline-none" placeholder='Search for products...' />
          </div>
          <div className="flex items-center gap-[14px]">
            <Link to="/cart" className="text-black text-xl relative hover:text-black/60 transition-colors">
              <LuShoppingCart />
            </Link>
            <Link to="/" className='text-black text-xl hover:text-black/60 transition-colors'><FaRegUserCircle /></Link>
          </div>
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <button className="text-black text-xl bg-transparent border-0 cursor-pointer p-0"><FaSearch /></button>
          <Link to="/cart" className="text-black text-xl relative">
            <LuShoppingCart />
          </Link>
          <Link to="/" className='text-black text-xl'><FaRegUserCircle /></Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 w-[280px] h-full bg-white flex flex-col p-6 gap-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[24px] font-bold" style={{ fontFamily: 'Integral CF' }}>SHOP.CO</span>
              <button className="text-2xl bg-transparent border-0 cursor-pointer p-0" onClick={() => setMobileMenuOpen(false)}><FaXmark /></button>
            </div>
            <div className="h-11 px-4 flex items-center gap-3 bg-[#F0F0F0] rounded-[62px]">
              <FaSearch className='text-black/40' />
              <input type="text" className="w-full bg-transparent border-0 text-sm placeholder:text-black/40 focus:outline-none" placeholder='Search for products...' />
            </div>
            <ul className='flex flex-col'>
              {[{ label: 'Shop', to: '/categories' }, { label: 'On Sale', to: '/categories' }, { label: 'New Arrivals', to: '/' }, { label: 'Brands', to: '/' }].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="flex items-center justify-between text-base font-medium text-black py-4 border-b border-black/5" onClick={() => setMobileMenuOpen(false)}>
                    {link.label} <span className="text-black/30">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
