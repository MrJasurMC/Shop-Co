import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io"
import { FaArrowRight, FaTrash } from "react-icons/fa6"
import { FiTag } from "react-icons/fi"
import { ToastContainer, toast } from 'react-toastify'
import { removeItem, updateQuantity, clearCart } from '../../features/cart/cartSlice'

function Cart() {
  const dispatch = useDispatch()
  const items = useSelector(state => state.cart.items)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = Math.round(subtotal * 0.2)
  const delivery = items.length > 0 ? 15 : 0
  const total = subtotal - discount + delivery

  const notify = () => toast.error("Promocode isn't working!")
  const notifyy = () => toast.success("Thanks for your purchase!")

  return (
    <section className='mx-4 md:mx-[90px] py-6 border-t border-black/10 flex items-start flex-col'>
      <Link className='inline-flex items-center gap-[6px] text-[#777] mb-[30px] hover:text-black transition-colors text-sm' to="/">
        Home <IoIosArrowForward /> <span className="text-black font-semibold">Cart</span>
      </Link>
      <div className="w-full flex items-start flex-col gap-6">
        <h1 className="text-[32px] md:text-[40px] font-bold" style={{ fontFamily: 'Integral CF' }}>YOUR CART</h1>

        <div className="w-full flex flex-col md:flex-row items-start gap-5 md:gap-[30px]">

          <div className="w-full md:w-[715px] h-auto px-4 md:px-6 py-4 md:py-5 rounded-[20px] border border-black/10">
            {items.length === 0 ? (
              <p className="text-black/40 text-center py-10 text-base">Your cart is empty</p>
            ) : (
              items.map((item, index) => (
                <div key={item.id} className={`flex items-center justify-between py-4 gap-3 ${index < items.length - 1 ? 'border-b border-black/10' : ''}`}>
                  <img src={item.image} alt={item.name} className="w-[90px] h-[90px] md:w-[100px] md:h-[100px] object-cover rounded-lg bg-[#F0EEED] flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <h3 className="text-base md:text-lg font-bold leading-tight">{item.name}</h3>
                      <button
                        className="bg-transparent border-0 text-[#FF3333] text-lg cursor-pointer transition-all duration-150 active:scale-90 flex-shrink-0 ml-2"
                        onClick={() => dispatch(removeItem(item.id))}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    {item.selectedSize && <p className="text-black/60 text-xs md:text-sm">Size: <span className="text-black font-medium">{item.selectedSize}</span></p>}
                    {item.selectedColor && <p className="text-black/60 text-xs md:text-sm">Color: <span className="text-black font-medium">{item.selectedColor}</span></p>}
                    <div className="flex items-center justify-between mt-1">
                      <h3 className="text-base md:text-lg font-bold">${item.price}</h3>
                      <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[62px] px-4 py-[6px]">
                        <button
                          className="bg-transparent border-0 text-lg cursor-pointer leading-none hover:text-black/50 transition-colors active:scale-90"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        >-</button>
                        <span className="text-sm font-medium min-w-4 text-center">{item.quantity}</span>
                        <button
                          className="bg-transparent border-0 text-lg cursor-pointer leading-none hover:text-black/50 transition-colors active:scale-90"
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="w-full md:flex-1 px-4 md:px-6 py-4 md:py-5 border border-black/10 rounded-[20px] flex items-start flex-col gap-4 md:gap-5">
            <h1 className="text-xl md:text-2xl font-bold">Order Summary</h1>
            <div className="w-full flex flex-col gap-3 md:gap-4">
              <div className="w-full flex items-center justify-between text-sm md:text-base">
                <p>Subtotal</p><span className="font-medium">${subtotal}</span>
              </div>
              <div className="w-full flex items-center justify-between text-sm md:text-base">
                <p>Discount (-20%)</p><span className="text-[#FF3333] font-medium">-${discount}</span>
              </div>
              <div className="w-full flex items-center justify-between text-sm md:text-base">
                <p>Delivery Fee</p><span className="font-medium">${delivery}</span>
              </div>
            </div>
            <div className="w-full pt-4 md:pt-[25px] flex flex-col gap-4 md:gap-[26px] border-t border-black/10">
              <p className='w-full flex items-center justify-between text-lg md:text-xl font-bold'>
                Total <span>${total}</span>
              </p>
              <div className="w-full flex items-center gap-[10px]">
                <div className="flex-1 h-11 md:h-12 px-4 bg-[#F0F0F0] rounded-[62px] flex items-center gap-[10px]">
                  <FiTag className='text-black/40 text-[20px] flex-shrink-0' />
                  <input
                    type="text"
                    className="w-full h-full bg-transparent border-0 placeholder:text-black/40 placeholder:text-sm focus:outline-none"
                    placeholder='Add promo code'
                  />
                </div>
                <button
                  className='px-5 h-11 md:h-12 rounded-[68px] border-0 bg-black text-white text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-95'
                  onClick={notify}
                >Apply</button>
                <ToastContainer />
              </div>
              <button
                className='w-full h-[52px] md:h-[60px] bg-black border-0 rounded-[60px] text-white text-base font-medium flex items-center justify-center gap-[10px] cursor-pointer transition-all duration-200 hover:bg-black/80 active:scale-[0.98] group'
                onClick={(notifyy) => dispatch(clearCart)}
                onChange={notifyy}
              >
                Go to Checkout
                <FaArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Cart
