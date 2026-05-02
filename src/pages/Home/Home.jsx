import React from 'react'
import costumers from "./assets/images/costumers.png"
import mstar from "./assets/images/mstar.png"
import star from "./assets/images/star.png"
import versace from "./assets/images/versace.png"
import zara from "./assets/images/zara.png"
import gucci from "./assets/images/gucci.png"
import prada from "./assets/images/prada.png"
import calvin from "./assets/images/calvin.png"
import ten from "./assets/images/ten.png"
import check from "./assets/images/check.png"
import casual from "./assets/images/casual.png"
import formal from "./assets/images/formal.png"
import party from "./assets/images/party.png"
import gym from "./assets/images/gym.png"
import arrivals from "../../data/arrivals.json"
import top from "../../data/top.json"
import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className='w-full mb-20'>

      <section className="w-full min-h-[448px] md:h-[663px] px-4 md:px-[90px] py-10 md:py-[103px] bg-[#F2F0F1] flex flex-col md:flex-row items-center justify-between overflow-hidden gap-6 md:gap-0">
        <div className="w-full md:w-[577px] flex items-start flex-col justify-between gap-5 md:gap-8 z-10">
          <h1 className="text-[36px] md:text-[64px] font-bold leading-[40px] md:leading-[64px]" style={{ fontFamily: 'Integral CF' }}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="text-black/60 text-sm md:text-base leading-[22px]">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <Link
            to="/categories"
            className="w-full md:w-[210px] h-[52px] rounded-[62px] bg-black flex items-center justify-center text-white text-base font-medium transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95"
          >
            Shop Now
          </Link>
          <div className="w-full flex items-center justify-between border-t border-black/10 pt-5 md:pt-0 md:border-0">
            <div className="flex flex-col md:w-[171px] md:h-[74px] md:border-r md:border-black/10 pr-4 md:pr-0">
              <h3 className="text-[28px] md:text-[40px] font-bold">200+</h3>
              <span className="text-black/60 text-xs md:text-base leading-[22px]">International Brands</span>
            </div>
            <div className="flex flex-col md:w-[171px] md:h-[74px] md:border-r md:border-black/10 px-4 md:px-0">
              <h3 className="text-[28px] md:text-[40px] font-bold">2,000+</h3>
              <span className="text-black/60 text-xs md:text-base leading-[22px]">High-Quality Products</span>
            </div>
            <div className="flex flex-col md:w-[171px] md:h-[74px] pl-4 md:pl-0">
              <h3 className="text-[28px] md:text-[40px] font-bold">30,000+</h3>
              <span className="text-black/60 text-xs md:text-base leading-[22px]">Happy Customers</span>
            </div>
          </div>
        </div>
        <div className="flex items-end relative w-full md:w-auto justify-center">
          <img src={mstar} alt="" className='absolute left-0 md:left-[-60px] bottom-0 md:top-[300px] w-12 md:w-auto' />
          <img src={costumers} alt="customers" className='w-[280px] md:w-full md:h-[660px] object-cover' />
          <img src={star} alt="" className='absolute top-0 right-0 md:top-[80px] md:right-[-50px] w-12 md:w-auto' />
        </div>
      </section>

      <div className="w-full h-[104px] md:h-[122px] px-4 md:px-[90px] bg-black flex items-center justify-between gap-4 overflow-hidden">
        {[versace, zara, gucci, prada, calvin].map((logo, i) => (
          <img key={i} src={logo} alt="brand logo" className="h-5 md:h-auto w-auto object-contain transition-all duration-200 hover:opacity-70 hover:scale-110 cursor-pointer" />
        ))}
      </div>

      <div className="w-full mt-12 md:mt-[200px] flex items-center justify-between flex-col gap-8 md:gap-10 px-4 md:px-0">
        <h3 className='text-[28px] md:text-5xl font-bold' style={{ fontFamily: 'Integral CF' }}>NEW ARRIVALS</h3>
        <div className="w-full flex overflow-x-auto md:flex-wrap gap-4 md:gap-5 justify-start md:justify-center pb-2 md:pb-0 scrollbar-none">
          {arrivals.arrivals.map(item => (
            <Link key={item.id} to={`/product/${item.id}`} className="group flex flex-col gap-2 cursor-pointer flex-shrink-0 w-[160px] md:w-auto">
              <div className="overflow-hidden rounded-xl bg-[#F0EEED]">
                <img
                  src={item.image} alt={item.name} loading="lazy"
                  className="w-[160px] h-[160px] md:w-[280px] md:h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm md:text-base transition-colors duration-200 group-hover:text-black/70">{item.name}</h3>
              <div className="flex items-center gap-[6px] md:gap-[10px]">
                <span className="text-xs md:text-base">{item.star}</span>
                <span className="text-xs md:text-sm text-black/60">{item.rating}</span>
              </div>
              <div className="flex items-center gap-[6px] md:gap-[10px]">
                <h3 className="font-bold text-sm md:text-base">${item.price}</h3>
                {item.oldPrice && <span className="text-black/40 line-through text-xs md:text-sm">${item.oldPrice}</span>}
                {item.discount && (
                  <p className="px-2 h-5 md:h-7 rounded-[62px] bg-[#FF33331A] flex items-center justify-center text-[#FF3333] text-[10px] md:text-xs font-medium">
                    -{item.discount}%
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/categories"
          className="w-full md:w-[218px] h-[52px] rounded-[62px] border border-black/20 flex items-center justify-center text-black text-base font-medium transition-all duration-200 hover:bg-black hover:text-white hover:border-black active:scale-95"
        >
          View All
        </Link>
      </div>

      <div className="w-full mt-10 md:mt-[100px] pt-10 md:pt-[100px] border-t border-black/10 flex items-center justify-between flex-col gap-8 md:gap-10 px-4 md:px-0">
        <h3 className='text-[28px] md:text-5xl font-bold' style={{ fontFamily: 'Integral CF' }}>TOP SELLING</h3>
        <div className="w-full flex overflow-x-auto md:flex-wrap gap-4 md:gap-5 justify-start md:justify-center pb-2 md:pb-0 scrollbar-none">
          {top.top.map(item => (
            <Link key={item.id} to={`/product/${item.id}`} className="group flex flex-col gap-2 cursor-pointer flex-shrink-0 w-[160px] md:w-auto">
              <div className="overflow-hidden rounded-xl bg-[#F0EEED]">
                <img
                  src={item.image} alt={item.name} loading="lazy"
                  className="w-[160px] h-[160px] md:w-[280px] md:h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-medium text-sm md:text-base transition-colors duration-200 group-hover:text-black/70">{item.name}</h3>
              <div className="flex items-center gap-[6px] md:gap-[10px]">
                <span className="text-xs md:text-base">{item.star}</span>
                <span className="text-xs md:text-sm text-black/60">{item.rating}</span>
              </div>
              <div className="flex items-center gap-[6px] md:gap-[10px]">
                <h3 className="font-bold text-sm md:text-base">${item.price}</h3>
                {item.oldPrice && <span className="text-black/40 line-through text-xs md:text-sm">${item.oldPrice}</span>}
                {item.discount && (
                  <p className="px-2 h-5 md:h-7 rounded-[62px] bg-[#FF33331A] flex items-center justify-center text-[#FF3333] text-[10px] md:text-xs font-medium">
                    -{item.discount}%
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
        <Link
          to="/categories"
          className="w-full md:w-[218px] h-[52px] rounded-[62px] border border-black/20 flex items-center justify-center text-black text-base font-medium transition-all duration-200 hover:bg-black hover:text-white hover:border-black active:scale-95"
        >
          View All
        </Link>
      </div>

      <div className="mx-4 md:mx-[90px] my-10 md:my-20 px-4 md:px-16 py-8 md:py-[70px] flex items-center flex-col gap-6 md:gap-10 bg-[#F0F0F0] rounded-[20px]">
        <h3 className="text-[20px] md:text-[32px] font-bold" style={{ fontFamily: 'Integral CF' }}>BROWSE BY DRESS STYLE</h3>
        <div className="w-full flex flex-col gap-3 md:gap-[14px]">
          <div className="flex flex-col md:flex-row gap-3 md:gap-[14px]">
            <Link to="/categories" className="group relative overflow-hidden rounded-[15px] md:rounded-[20px] cursor-pointer" style={{ flex: '407' }}>
              <img src={casual} alt="Casual" className="w-full h-[180px] md:h-full object-cover object-left transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-[15px] md:rounded-[20px]" />
            </Link>
            <Link to="/categories" className="group relative overflow-hidden rounded-[15px] md:rounded-[20px] cursor-pointer" style={{ flex: '684' }}>
              <img src={formal} alt="Formal" className="w-full h-[180px] md:h-full object-cover object-left transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-[15px] md:rounded-[20px]" />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-3 md:gap-[14px]">
            <Link to="/categories" className="group relative overflow-hidden rounded-[15px] md:rounded-[20px] cursor-pointer" style={{ flex: '684' }}>
              <img src={party} alt="Party" className="w-full h-[180px] md:h-full object-cover object-left transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-[15px] md:rounded-[20px]" />
            </Link>
            <Link to="/categories" className="group relative overflow-hidden rounded-[15px] md:rounded-[20px] cursor-pointer" style={{ flex: '407' }}>
              <img src={gym} alt="Gym" className="w-full h-[180px] md:h-full object-cover object-left transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-[15px] md:rounded-[20px]" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-4 md:mx-[90px] my-10 md:my-20 flex items-start flex-col gap-6 md:gap-[50px]">
        <div className="w-full flex items-center justify-between">
          <h3 className='text-[28px] md:text-5xl font-bold' style={{ fontFamily: 'Integral CF' }}>OUR HAPPY CUSTOMERS</h3>
          <div className="md:flex items-center gap-2">
            <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-sm hover:bg-black hover:text-white transition-all cursor-pointer">‹</button>
            <button className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-sm hover:bg-black hover:text-white transition-all cursor-pointer">›</button>
          </div>
        </div>
        <div className="w-full flex gap-4 overflow-x-auto pb-2 no-scrollbar md:flex-nowrap">
          {[
            { name: "Sarah M.", text: "\"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.\"" },
            { name: "Alex K.", text: "\"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.\"" },
            { name: "James L.", text: "\"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.\"" },
          ].map((c, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] md:w-[400px] md:h-[240px] px-6 md:px-8 py-6 md:py-7 border border-black/10 rounded-[20px] flex flex-col gap-3 md:gap-0 md:items-start md:justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-default"
            >
              <img src={ten} alt="5 stars" loading='lazy' />
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm md:text-base">{c.name}</h3>
                <img src={check} alt="verified" loading='lazy' />
              </div>
              <p className="text-black/60 text-sm md:text-base leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default Home
