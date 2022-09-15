import React from 'react'
import icon1 from '../../assets/images/icon-1.svg'
import icon2 from '../../assets/images/icon-2.svg'
import icon3 from '../../assets/images/icon-3.svg'
import icon4 from '../../assets/images/icon-4.svg'
import banner from '../../assets/images/banner.png'

export default function Banner() {
    return (
        <div className='flex gap-14 mt-24'>
            <div className='xs:max-w-full md:max-w-[60%]'>
                <div className='flex flex-col gap-4'>
                    <h1 className='xs:max-w-[70%] xs:text-3xl text-title font-extrabold font-title md:max-w-[600px] md:text-5xl'>Encontre o café perfeito para qualquer hora do dia</h1>
                    <p className='xs:max-w-[65%] xs:text-lg text-text md:text-xl md:max-w-[525px]'>Com o Coffee Delivery você recebe seu café onde estiver, a qualquer hora.</p>
                </div>
                <div className='xs:flex xs:flex-wrap xs:gap-5 md:grid md:grid-cols-2 gap-y-[1.25rem] mt-16'>
                    <div className='flex gap-2'>
                        <img src={icon1} alt="" />
                        <span>Compra simples e segura</span>
                    </div>
                    <div className='flex gap-2'>
                        <img src={icon2} alt="" />
                        <span>Embalagem mantém o café intacto</span>
                    </div>
                    <div className='flex gap-2'>
                        <img src={icon3} alt="" />
                        <span>Entrega rápida e rastreada</span>
                    </div>
                    <div className='flex gap-2'>
                        <img src={icon4} alt="" />
                        <span>O café chega fresquinho até você</span>
                    </div>
                </div>
            </div>
            <div className='xs:hidden md:block'>
                <img src={banner} alt="" />
            </div>
        </div>
    )
}
