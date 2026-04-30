import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa6'
import check from "./assets/images/check.png"
import products from '../../data/products.json'
import star from "./assets/images/star.png"
import dots from "./assets/images/dots.png"
import { addItem } from '../../features/cart/cartSlice'
import { ToastContainer, toast } from 'react-toastify';

function ProductDetail() {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const product = products.products.find(p => p.id === Number(id))
  const [activeImg, setActiveImg] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const [activeSize, setActiveSize] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  const suggested = products.products.filter(p => p.id !== product.id).slice(0, 4)
  const notify = () => toast.success(`${product.name} added to cart!`);

  return (
    <section className="px-4 md:p-10 py-6">
      <div className="inline-flex items-center gap-[6px] text-[#777] mb-6 text-xs md:text-sm">
        <Link to="/" className="text-[#777] hover:text-black transition-colors">Home</Link> <IoIosArrowForward />
        <Link to="/categories" className="text-[#777] hover:text-black transition-colors">Shop</Link> <IoIosArrowForward />
        <span className="text-black font-semibold">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-8 md:mb-[50px]">
        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-4 md:flex-shrink-0">
          <div className="flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-visible">
            {product.images.map((img, i) => (
              <img
                key={i} src={img} alt={product.name}
                className={`w-[70px] h-[70px] md:w-[100px] md:h-[100px] flex-shrink-0 object-cover rounded-xl bg-[#F0EEED] cursor-pointer transition-all duration-200 hover:opacity-80 ${activeImg === i ? "border-2 border-black" : "border-2 border-transparent"}`}
                onClick={() => setActiveImg(i)}
              />
            ))}
          </div>
          <img src={product.images[activeImg]} alt={product.name} className="w-full md:w-[400px] h-[290px] md:h-[400px] object-cover rounded-[20px] bg-[#F0EEED]" />
        </div>

        <div className="flex-1 flex flex-col gap-3 md:gap-4">
          <h1 className="text-[22px] md:text-[28px] font-bold uppercase leading-tight">{product.name}</h1>
          <div className="flex items-center gap-[10px]">
            <span className="text-[#FFC633] text-base md:text-lg">{product.star}</span>
            <span className="text-xs md:text-sm text-black/60">{product.rating}/5</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[24px] md:text-[28px] font-bold">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-[18px] md:text-[22px] text-[#999] line-through">${product.oldPrice}</span>
                <span className="bg-[#FFEDEC] text-[#FF3333] px-[10px] py-1 rounded-[20px] text-xs font-semibold">-{product.discount}%</span>
              </>
            )}
          </div>
          <p className="text-xs md:text-sm text-[#555] leading-relaxed">{product.description}</p>
          <div className="border-t border-black/10" />

          <div className="flex flex-col gap-2 md:gap-3">
            <p className="text-xs md:text-sm text-[#777]">Select Colors</p>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-full cursor-pointer flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95 ${activeColor === i ? "border-2 border-black shadow-md" : "border-2 border-transparent"}`}
                  style={{ background: color }}
                  onClick={() => setActiveColor(i)}
                >
                  {activeColor === i && <FaCheck style={{ color: color === 'white' ? '#000' : '#fff', fontSize: 11 }} />}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 md:gap-3">
            <p className="text-xs md:text-sm text-[#777]">Choose Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`px-3 md:px-[18px] py-1.5 md:py-2 rounded-[20px] border-0 cursor-pointer text-xs md:text-sm transition-all duration-150 active:scale-95 ${activeSize === size ? "bg-black text-white shadow-md" : "bg-[#F0F0F0] hover:bg-[#ddd]"}`}
                  onClick={() => setActiveSize(size)}
                >{size}</button>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center gap-3 md:gap-4 mt-1">
            <div className="flex items-center gap-4 bg-[#F0F0F0] rounded-[62px] px-4 py-2.5">
              <button onClick={() => setQuantity(p => Math.max(1, p - 1))} className='border-0 text-xl cursor-pointer bg-transparent hover:text-black/50 transition-colors active:scale-90 leading-none'>-</button>
              <span className="text-sm font-semibold min-w-[20px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(p => p + 1)} className='border-0 text-xl cursor-pointer bg-transparent hover:text-black/50 transition-colors active:scale-90 leading-none'>+</button>
            </div>
            <button
              className="flex-1 h-[48px] md:h-[52px] rounded-[62px] bg-black text-white border-0 text-sm md:text-[15px] font-semibold cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-[0.98]"
              onClick={() => { dispatch(addItem({ ...product, selectedColor: product.colors[activeColor], selectedSize: activeSize, quantity })); notify(); }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 md:mb-[30px] flex justify-between border-b border-black/10">
        <span>Product Details</span>
        <span>Rating & Reviews</span>
        <span>FAQs</span>
      </div>

      <div className="mb-8 md:mb-[50px]">
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <h3 className="text-lg md:text-xl font-bold">All Reviews <span className="text-[#777] font-normal">(451)</span></h3>
          <div className="flex items-center gap-2">
            <select className="border border-black/20 rounded-[62px] h-9 px-4 text-sm font-medium cursor-pointer">
              <option>Newest</option>
              <option>Oldest</option>
              <option>Highest Rating</option>
              <option>Lowest Rating</option>
            </select>
            <button className="px-4 h-9 rounded-[62px] border border-black/20 text-sm font-medium hover:bg-black hover:text-white transition-all cursor-pointer">Write a Review</button>
          </div>
        </div>
        <div className="mb-[50px]">
          <div className="flex flex-wrap gap-[50px]">

            <div className="w-[610px] h-[241px] border border-black/10 rounded-[16px] p-6 flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <img src={star} alt="" loading="lazy" />
                <img src={dots} alt="" loading="lazy" />
              </div>
              <div className="flex items-center gap-[5px]">
                <h3>Samantha D.</h3>
                <img src={check} alt="" loading="lazy" />
              </div>
              <p className="w-[522px] text-[16px] text-[#333] leading-[22px]">
                "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
              </p>
              <span className="text-[#00000099] text-[16px] font-[500]">
                Posted on August 14, 2023
              </span>
            </div>

            <div className="w-[610px] h-[241px] border border-black/10 rounded-[16px] p-6 flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <img src={star} alt="" loading="lazy" />
                <img src={dots} alt="" loading="lazy" />
              </div>
              <div className="flex items-center gap-[5px]">
                <h3>Alex M.</h3>
                <img src={check} alt="" loading="lazy" />
              </div>
              <p className="w-[522px] text-[16px] text-[#333] leading-[22px]">
                "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
              </p>
              <span className="text-[#00000099] text-[16px] font-[500]">
                Posted on August 15, 2023
              </span>
            </div>

            <div className="w-[610px] h-[241px] border border-black/10 rounded-[16px] p-6 flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <img src={star} alt="" loading="lazy" />
                <img src={dots} alt="" loading="lazy" />
              </div>
              <div className="flex items-center gap-[5px]">
                <h3>Ethan R.</h3>
                <img src={check} alt="" loading="lazy" />
              </div>
              <p className="w-[522px] text-[16px] text-[#333] leading-[22px]">
                "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt."
              </p>
              <span className="text-[#00000099] text-[16px] font-[500]">
                Posted on August 16, 2023
              </span>
            </div>

            <div className="w-[610px] h-[241px] border border-black/10 rounded-[16px] p-6 flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <img src={star} alt="" loading="lazy" />
                <img src={dots} alt="" loading="lazy" />
              </div>
              <div className="flex items-center gap-[5px]">
                <h3>Olivia P.</h3>
                <img src={check} alt="" loading="lazy" />
              </div>
              <p className="w-[522px] text-[16px] text-[#333] leading-[22px]">
                "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out."
              </p>
              <span className="text-[#00000099] text-[16px] font-[500]">
                Posted on August 17, 2023
              </span>
            </div>

            <div className="w-[610px] h-[241px] border border-black/10 rounded-[16px] p-6 flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <img src={star} alt="" loading="lazy" />
                <img src={dots} alt="" loading="lazy" />
              </div>
              <div className="flex items-center gap-[5px]">
                <h3>Liam K.</h3>
                <img src={check} alt="" loading="lazy" />
              </div>
              <p className="w-[522px] text-[16px] text-[#333] leading-[22px]">
                "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion."
              </p>
              <span className="text-[#00000099] text-[16px] font-[500]">
                Posted on August 18, 2023
              </span>
            </div>

            <div className="w-[610px] h-[241px] border border-black/10 rounded-[16px] p-6 flex flex-col gap-[10px]">
              <div className="flex items-center justify-between">
                <img src={star} alt="" loading="lazy" />
                <img src={dots} alt="" loading="lazy" />
              </div>
              <div className="flex items-center gap-[5px]">
                <h3>Ava H.</h3>
                <img src={check} alt="" loading="lazy" />
              </div>
              <p className="w-[522px] text-[16px] text-[#333] leading-[22px]">
                "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."
              </p>
              <span className="text-[#00000099] text-[16px] font-[500]">
                Posted on August 19, 2023
              </span>
            </div>

          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="px-8 h-10 rounded-[62px] border border-black/20 text-sm font-medium hover:bg-black hover:text-white transition-all">Load More Reviews</button>
        </div>
      </div>

      <div className="mt-8 md:mt-[50px]">
        <h2 className="text-[22px] md:text-[28px] text-center mb-6 md:mb-[30px] font-bold" style={{ fontFamily: 'Integral CF' }}>YOU MIGHT ALSO LIKE</h2>
        <div className="flex gap-4 md:gap-[30px] overflow-x-auto md:justify-center flex-wrap pb-2 md:pb-0">
          {suggested.map(item => (
            <Link key={item.id} to={"/product/" + item.id} className="group flex-shrink-0 w-[160px] md:w-[260px] flex flex-col gap-[8px] md:gap-[10px] text-inherit cursor-pointer">
              <div className="overflow-hidden rounded-xl bg-[#F0EEED]">
                <img src={item.image} alt={item.name} className="w-[160px] h-[160px] md:w-[260px] md:h-[260px] object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <h3 className="text-xs md:text-[15px] font-semibold group-hover:text-black/70 transition-colors">{item.name}</h3>
              <div className="flex items-center gap-[6px] md:gap-[10px] flex-wrap">
                <span className="text-sm md:text-lg font-bold">${item.price}</span>
                {item.oldPrice && <><span className="text-sm md:text-[18px] text-[#999] line-through">${item.oldPrice}</span><span className="bg-[#FFEDEC] text-[#FF3333] px-2 py-0.5 rounded-[20px] text-[10px] md:text-xs font-semibold">-{item.discount}%</span></>}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default ProductDetail
