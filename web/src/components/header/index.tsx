import React, { useContext, useEffect } from 'react'
import Logo from '../../assets/images/Logo.svg'
import { FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { CartContextProvider } from '../../Cart/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {


    const coffeCart = useSelector((state: any) => state.coffeCart)

    const navigate = useNavigate()

    function goToCartCheckout() {
        navigate('/cart')
    }


    return (
        <header className='h-[6.5rem] items-center flex  justify-between'>
            <Link to="/">
                <img src={Logo} alt="Logo da cafeteria um copo de café e a direita escrito coffe delivery" />
            </Link>
            <div className='flex gap-2'>
                <div className='flex gap-1 bg-purpleLight p-2 rounded-md'>
                    <div className='cursor-pointer'>
                        <FaMapMarkerAlt size={22} color={'8047F8'} />
                    </div>
                    <span className='text-purpleDark text-sm font-text cursor-pointer'>Porto Alegre, RS</span>
                </div>

                <div className='bg-yellowLight p-2 rounded-md relative cursor-pointer' onClick={() => goToCartCheckout()} >
                    <sup className='absolute py-[0.7rem] px-[0.5rem] bg-yellowDark rounded-full text-[#fff] right-[-10px] top=[-10px]'>
                        {coffeCart.length}
                    </sup>
                    <FaShoppingCart size={22} color={'#C47F17'} />
                </div>

            </div>
        </header>
    )
}
