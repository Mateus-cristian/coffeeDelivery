import Header from '../components/header'
import motoboy from '../assets/images/motoboy.png'
import { FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa'
import { MdTimer } from 'react-icons/md'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormCartCheckout } from '../types/@types'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { clearCart } from '../store/cart'

export default function Delivery() {

    const address = useSelector((state: any) => state.address as FormCartCheckout)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        // valida se tem cep pois é um campo obrigatório,se não tiver volta ao ínicio sem renderizar a página
        if (!address.cod) {
            navigate('/')
        }
        // Após a validação apaga os dados da entrega pois não serão mais usados na aplicação 
        // Claro isso só é feito assim porque esse dados não servirão para mais nada
        dispatch(clearCart)
    }, [])

    return (
        <>
            <Header />
            <div className='mt-20'>
                <span className='text-yellowDark xs:text-2xl sm:text-[2rem] font-title font-bold'>Uhu! Pedido confirmado</span>
                <p className='text-subtitle xs:text-lg sm:text-xl font-text font-normal'>Agora é só aguardar que logo o café chegará até você</p>
            </div>
            <div className='xs:pb-10 lg:pb-0 flex gap-24 mt-10 '>
                <div className='xs:w-full xs:p-4 lg:min-w-[32.875rem] border-[1px] rounded-xl border-[#efefef] rounded-bl-[2.75rem] rounded-tr-[2.75rem] sm:p-10'>
                    <div className='flex flex-col gap-9'>
                        <div className='flex gap-2'>
                            <div className='p-2 self-center bg-purple rounded-full '>
                                <FaMapMarkerAlt size={16} color="#fff" />
                            </div>
                            <div>
                                <span className='text-text font-text text-base'>Entrega em <strong>{address.street}, {address.cod}</strong></span>
                                <p className='text-text font-text text-base'>{address.district} - {address.city}, <span className='uppercase'>{address.state}</span></p>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='p-2 self-center bg-yellow rounded-full '>
                                <MdTimer size={16} color="#fff" />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-text font-text text-base'>Previsão de entrega</span>
                                <b className='text-text font-text text-base'>20 min - 30 min </b>
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='p-2 self-center bg-yellowDark rounded-full '>
                                <FaDollarSign size={16} color="#fff" />
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-text font-text text-base'>Pagamento na entrega</span>
                                <b className='text-text font-text text-base'>{address.payment}</b>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='xs:hidden lg:block'>
                    <img src={motoboy} alt="Foto de um homem dirigindo uma moto fazendo uma entrega provavelmente cafés que são os produtos do site" />
                </div>
            </div>
        </>
    )
}
