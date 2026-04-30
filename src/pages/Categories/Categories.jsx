import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { IoIosArrowForward, IoIosArrowUp } from "react-icons/io"
import { LuSlidersVertical } from "react-icons/lu"
import { FaCheck, FaXmark } from "react-icons/fa6"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination , Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import products from "../../data/products.json"

const ITEMS_PER_PAGE = 9

function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size))
  return chunks
}

function Categories({ text = " " }) {
  const prices = products.products.map(p => Number(p.price))
  const maxProductPrice = Math.max(...prices)

  const [activeFilter, setActiveFilter] = useState("All")
  const [activeColor, setActiveColor]   = useState("All")
  const [activeSize, setActiveSize]     = useState("All")
  const [activeStyle, setActiveStyle]   = useState("All")
  const [minPrice, setMinPrice]         = useState(0)
  const [maxPrice, setMaxPrice]         = useState(maxProductPrice)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const filtered = products.products.filter(item => {
    const price = Number(item.price)
    const matchesType  = activeFilter === "All" || item.type?.toLowerCase() === activeFilter.toLowerCase()
    const matchesColor = activeColor  === "All" || item.colors?.includes(activeColor)
    const matchesSize  = activeSize   === "All" || item.sizes?.includes(activeSize)
    const matchesStyle = activeStyle  === "All" || item.dressStyle?.includes(activeStyle)
    const matchesPrice = price >= minPrice && price <= maxPrice
    const matchesSearch = item.name.toLowerCase().includes(text.toLowerCase());
    return matchesType && matchesColor && matchesSize && matchesStyle && matchesPrice && matchesSearch
  })

  const pages = chunkArray(filtered, ITEMS_PER_PAGE)
  const types  = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"]
  const colors = ["green", "red", "yellow", "orange", "aqua", "blue", "purple", "pink", "white", "black"]
  const sizes  = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"]
  const styles = ["Casual", "Formal", "Party", "Gym"]

  const startItem = filtered.length === 0 ? 0 : currentSlide * ITEMS_PER_PAGE + 1
  const endItem   = Math.min((currentSlide + 1) * ITEMS_PER_PAGE, filtered.length)

  const FilterPanel = () => (
    <div className="flex flex-col gap-0">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          <LuSlidersVertical className='text-[22px] cursor-pointer text-black/40 hover:text-black transition-colors' />
          <button className="md:hidden text-xl bg-transparent border-0 cursor-pointer p-0" onClick={() => setMobileFiltersOpen(false)}>
            <FaXmark />
          </button>
        </div>
      </div>

      <ul className="border-b border-black/10 pb-[15px]">
        {["All", ...types].map(type => (
          <li
            key={type}
            className={`flex justify-between items-center py-[10px] cursor-pointer transition-all duration-150 hover:translate-x-1 ${activeFilter === type ? "text-black font-semibold" : "text-[#777] hover:text-black"}`}
            onClick={() => setActiveFilter(type)}
          >
            {type} <IoIosArrowForward />
          </li>
        ))}
      </ul>

      <div className="py-4 border-b border-black/10">
        <div className="flex justify-between items-center mb-4"><h3 className="font-medium">Price</h3><IoIosArrowUp /></div>
        <div className="flex flex-col gap-3">
          <div className="price-track">
            <div className="price-fill" style={{ left: `${(minPrice / maxProductPrice) * 100}%`, width: `${((maxPrice - minPrice) / maxProductPrice) * 100}%` }} />
            <input type="range" min="0" max={maxProductPrice} value={minPrice} onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))} className="price-slider" />
            <input type="range" min="0" max={maxProductPrice} value={maxPrice} onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))} className="price-slider" />
          </div>
          <div className="flex justify-between text-sm font-semibold"><span>${minPrice}</span><span>${maxPrice}</span></div>
        </div>
      </div>

      <div className="py-4 border-b border-black/10">
        <div className="flex justify-between items-center mb-3"><h3 className="font-medium">Colors</h3><IoIosArrowUp /></div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, i) => (
            <div
              key={i}
              className={`w-9 h-9 rounded-full cursor-pointer flex items-center justify-center border-2 border-[#5e5c5c] transition-all duration-150 hover:scale-110 active:scale-95}`}
              style={{ background: color }}
              onClick={() => setActiveColor(activeColor === color ? "All" : color)}
            >
              {activeColor === color && <FaCheck style={{ color: color === "white" ? "#000" : "#fff" }} />}
            </div>
          ))}
        </div>
      </div>

      <div className="py-4 border-b border-black/10">
        <div className="flex justify-between mb-3"><h3 className="font-medium">Size</h3><IoIosArrowUp /></div>
        <div className="flex flex-wrap gap-[10px]">
          {["All", ...sizes].map(size => (
            <button
              key={size}
              className={`px-[12px] py-1.5 rounded-[20px] border-0 cursor-pointer text-sm transition-all duration-150 active:scale-95 ${activeSize === size ? "bg-black text-white shadow-sm" : "bg-[#F0F0F0] hover:bg-[#ddd]"}`}
              onClick={() => setActiveSize(size)}
            >{size}</button>
          ))}
        </div>
      </div>

      <div className="py-4">
        <div className="flex justify-between mb-3"><h3 className="font-medium">Dress Style</h3><IoIosArrowUp /></div>
        <ul>
          {["All", ...styles].map(type => (
            <li
              key={type}
              className={`flex justify-between items-center py-[10px] cursor-pointer transition-all duration-150 hover:translate-x-1 ${activeStyle === type ? "text-black font-semibold" : "text-[#777] hover:text-black"}`}
              onClick={() => setActiveStyle(type)}
            >
              {type} <IoIosArrowForward />
            </li>
          ))}
        </ul>
      </div>

      <button
        className='w-full h-12 rounded-[62px] border-0 bg-black text-white text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-95'
        onClick={() => setMobileFiltersOpen(false)}
      >
        Apply Filter
      </button>
    </div>
  )

  return (
    <section className='px-4 md:p-10 py-4 md:py-6'>
      <Link className='inline-flex items-center gap-[6px] text-[#777] mb-4 md:mb-[30px] hover:text-black transition-colors text-sm' to="/">
        Home <IoIosArrowForward /> <span className="text-black font-semibold">Casual</span>
      </Link>

      <div className="flex gap-[50px]">
        <div className="hidden md:block w-[290px] p-5 border border-black/10 rounded-xl h-fit">
          <FilterPanel />
        </div>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-[24px] p-5 max-h-[90vh] overflow-y-auto">
              <FilterPanel />
            </div>
          </div>
        )}

        <div className="flex-1 flex items-start flex-col gap-5 md:gap-[30px] min-w-0">
          <div className="w-full flex items-center justify-between gap-2">
            <div>
              <h1 className="text-lg md:text-2xl font-bold">Casual</h1>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs md:text-sm text-black/60">Showing {startItem}-{endItem} of {filtered.length} Products</p>
              <button
                className="md:hidden flex items-center gap-2 px-3 h-9 rounded-[62px] border border-black/20 text-sm font-medium"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <LuSlidersVertical /> Filters
              </button>
              <span className="hidden md:inline text-black/60 text-base font-medium">
                Sort By:
                <select className="border-0 bg-transparent cursor-pointer hover:text-black transition-colors focus:outline-none">
                  <option>Most Popular</option>
                  <option>Cheaper</option>
                  <option>Most Expensive</option>
                  <option>High rating</option>
                  <option>Recently added</option>
                </select>
              </span>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            autoplay={{ delay: 1000 }}
            pagination={{ clickable: true }}
            onSlideChange={(s) => setCurrentSlide(s.activeIndex)}
            className="categories-swiper flex-wrap"
          >
            {pages.map((page, pageIndex) => (
              <SwiperSlide key={pageIndex}>
                <div className="grid grid-cols-3 md:flex md:flex-wrap gap-3 md:gap-6 pb-10">
                  {page.map(item => (
                    <Link key={item.id} to={`/product/${item.id}`} className="group flex flex-col gap-[8px] md:gap-[10px] cursor-pointer text-inherit md:w-[290px]">
                      <div className="overflow-hidden rounded-xl bg-[#F0EEED]">
                        <img src={item.image} alt={item.name} className='w-full h-[180px] md:w-[300px] md:h-[300px] object-cover transition-transform duration-300 group-hover:scale-105' />
                      </div>
                      <h3 className="font-medium text-sm md:text-base group-hover:text-black/70 transition-colors truncate">{item.name}</h3>
                      <div className="flex items-center gap-[6px]">
                        <span className="text-xs md:text-sm">{item.star}</span>
                        <span className="text-xs text-black/60">{item.rating}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm md:text-base">${item.price}</h3>
                        {item.oldPrice && <span className="text-black/40 line-through text-xs">${item.oldPrice}</span>}
                        {item.discount && <span className="bg-[#FF33331A] text-[#FF3333] px-1.5 py-0.5 rounded-full text-[10px] font-medium">-{item.discount}%</span>}
                      </div>
                    </Link>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default Categories