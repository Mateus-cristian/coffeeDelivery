import { useContext, useEffect, useState } from 'react'
import { FaDollarSign, FaMapMarkerAlt, FaRegCreditCard, FaRegMoneyBillAlt, FaRegTrashAlt } from 'react-icons/fa'
import { BsBank } from 'react-icons/bs'
import Header from '../../components/header'
import { Cep, CoffeeProps, FormCartCheckout } from '../../types/@types'
import './styles.css'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { decrementQuantityProductInTheCartCheckout, deleteProductToCart, deliveryAddress, incrementQuantityProductInTheCartCheckout } from '../../store/cart'
import axios from 'axios'


const defaultValues: FormCartCheckout = {
    street: '',
    numberHouse: '',
    city: '',
    cod: '',
    complementation: '',
    district: '',
    state: '',
    payment: ''
}


const addSchema = object().shape({
    street: string().required('A rua é obrigatória'),
    numberHouse: string().required('O número é obrigatório'),
    complementation: string().nullable(),
    district: string().required('O bairro é obrigatório'),
    city: string().required("A cidade é obrigatória"),
    cod: string().required('O cep é obrigatório').max(8, 'Cep Contém 8 digítos apenas'),
    state: string().required('O Estado é obrigatório').max(2, 'Use Apenas a sigla do estado'),
    payment: string().required('O modo de pagamento é obrigatório')
})

export default function Cart() {

    const dispatch = useDispatch()

    const coffeCart = useSelector((state: any) => state.coffeCart as CoffeeProps[])
    const totalItens = useSelector((state: any) => state.totalItens as number)
    const priceTotal = useSelector((state: any) => state.priceTotal as number)


    const [cepCompleted, setCepCompleted] = useState({} as Cep)

    const { control, handleSubmit, formState, setValue, watch } = useForm({ defaultValues, resolver: yupResolver(addSchema) })
    const { errors } = formState;

    const navigate = useNavigate()

    const submit = (data: FormCartCheckout) => {
        dispatch(deliveryAddress(data))
        navigate('/delivery')
    }

    const searchCep = async (cep: string) => {
        const response = await axios.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
        setCepCompleted(response.data)
    }

    useEffect(() => {
        const cepCode = watch('cod')
        if (cepCode) {
            setValue('street', cepCompleted.logradouro)
            setValue('city', cepCompleted.localidade)
            setValue('state', cepCompleted.uf)
            setValue('district', cepCompleted.bairro)

        }
    }, [searchCep])

    const cepMask = (cep: string) => {
        return cep.replace(/([0-9]{5})([0-9]{3})/, '$1-$2')
    }


    return (
        <>
            <Header />
            <form className='xs:flex-wrap xl:flex-nowrap flex w-full gap-8 mt-40 pb-40' onSubmit={handleSubmit(submit)}>
                <div className='xs:w-full xl:w-[60%]'>
                    <span className='text-lg font-bold font-title text-title'>Complete seu pedido</span>
                    <div className='flex flex-col gap-3 mt-5' >
                        <div className='bg-secondary rounded-xl p-10'>
                            <div className='flex flex-col gap-8 overflow-hidden'>
                                <div className='flex gap-2 '>
                                    <FaMapMarkerAlt size={19} color={'#C47F17'} className="relative top-1" />
                                    <div>
                                        <span className='font-text text-subtitle text-base'>Endereço de Entrega</span>
                                        <p className='font-text text-subtitle text-sm'>Informe o endereço onde deseja receber seu pedido</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-4 flex-col '>
                                        <div className='flex flex-col'>
                                            <Controller
                                                control={control}
                                                name='cod'
                                                render={({ field }) => (
                                                    <input type="text"
                                                        onBlur={() => searchCep(field.value)}
                                                        value={field.value ? cepMask(field.value) : ''}
                                                        onChange={(event) => field.onChange(event?.target.value)}
                                                        placeholder='95040-210'
                                                        className='xs:w-full md:w-[40%] p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text'
                                                    />
                                                )}
                                            />
                                            {errors.cod && <p className='text-[#f03] text-xs'>{errors.cod.message}</p>}
                                        </div>
                                        <div className='flex flex-col'>
                                            <input
                                                value={cepCompleted.logradouro ?? null} type="text" placeholder='Rua dr Jandir da Silva' className='flex-1 p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text' />
                                            {errors.street && <p className='text-[#f03] text-xs'>{errors.street.message}</p>}
                                        </div>
                                    </div>
                                    <div className='xs:flex-col md:flex-row flex gap-4'>
                                        <div className='flex flex-col'>
                                            <Controller
                                                control={control}
                                                name='numberHouse'
                                                render={({ field }) => (
                                                    <input {...field} type="text" placeholder='102' className='w-[40 %] p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text' />
                                                )}
                                            />
                                            {errors.numberHouse && <p className='text-[#f03] text-xs'>{errors.numberHouse.message}</p>}
                                        </div>
                                        <div className='flex flex-col flex-1'>
                                            <div className='relative '>
                                                <Controller
                                                    control={control}
                                                    name='complementation'
                                                    render={({ field }) => (
                                                        <input {...field} type="text" placeholder='Complemento' className='w-full p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text' />
                                                    )}
                                                />
                                                <p className='absolute text-label font-text italic text-xs right-3 top-[0.875rem]'>Opcional</p>
                                            </div>
                                            {errors.complementation && <p className='text-[#f03] text-xs'>{errors.complementation.message}</p>}
                                        </div>
                                    </div>
                                    <div className='xs:flex-col md:flex-row flex gap-4 flex-shrink-0'>
                                        <div className='flex flex-col'>
                                            <input type="text" value={cepCompleted.bairro ?? null} placeholder='Desvio rizzo' className='p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text' />
                                            {errors.district && <p className='text-[#f03] text-xs'>{errors.district.message}</p>}
                                        </div>
                                        <div className='flex flex-col shrink w-full'>
                                            <input value={cepCompleted.localidade ?? null} type="text" placeholder='Caxias do Sul' className=' p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text' />
                                            {errors.city && <p className='text-[#f03] text-xs'>{errors.city.message}</p>}
                                        </div>
                                        <div className='flex flex-col xs:w-full md:w-[10%]'>
                                            <input value={cepCompleted.uf ?? null} type="text" placeholder='RS' className=' p-2 bg-[#EdEdEd] rounded-[0.25rem] border-2 border-[#E6E5E5] outline-[#8047F8] text-text' />
                                            {errors.state && <p className='text-[#f03] text-xs'>{errors.state.message}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-secondary rounded-xl p-10'>
                            <div className='flex gap-2'>
                                <FaDollarSign size={22} color={'#8047F8'} />
                                <div>
                                    <span className='font-text text-lg text-subtitle'>Pagamento</span>
                                    <p className='font-text text-sm text-label'>O pagamento é feito na entrega. Escolha a forma que deseja pagar</p>
                                </div>
                            </div>
                            <div className='xs:flex-wrap xs:gap-1 xl:flex-nowrap flex md:gap-2 mt-8 '>
                                <div>
                                    <Controller
                                        control={control}
                                        name='payment'
                                        render={({ field }) => (
                                            <input type="radio" {...field} value="Cartão de crédito" name="pagamento" id="credito" className='opacity-0' />
                                        )}
                                    />
                                    <label htmlFor="credito" className='cursor-pointer flex items-center justify-start gap-2 bg-alt p-4 rounded-md min-w-[11.25rem] uppercase text-xs text-text font-medium'><span><FaRegCreditCard size={16} color={'#8047F8'} /></span>Cartão de crédito</label>
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name='payment'
                                        render={({ field }) => (
                                            <input type="radio" {...field} value="Cartão de débito" name="pagamento" id="debito" className='opacity-0' />
                                        )}
                                    />
                                    <label htmlFor="debito" className='cursor-pointer flex items-center justify-start gap-2 bg-alt p-4 rounded-md min-w-[11.25rem] uppercase text-xs text-text font-medium'><span><BsBank size={16} color={'#8047F8'} /></span>Cartão de débito</label>
                                </div>
                                <div>
                                    <Controller
                                        control={control}
                                        name='payment'
                                        render={({ field }) => (
                                            <input type="radio" {...field} value="Dinheiro" name="pagamento" id="dinheiro" className='opacity-0' />
                                        )}
                                    />
                                    <label htmlFor="dinheiro" className='cursor-pointer flex items-center justify-start gap-2 bg-alt p-4 rounded-md min-w-[11.25rem] uppercase text-xs text-text font-medium'><span><FaRegMoneyBillAlt size={16} color={'#8047F8'} /></span>Dinheiro</label>
                                </div>
                            </div>
                            {errors.payment && <p className='text-[#f03] text-xs mt-4'>{errors.payment.message}</p>}
                        </div>
                    </div>
                </div>
                <div className='flex-1 '>
                    <span className='text-lg font-bold font-title text-title'>Cafés selecionados</span>
                    <div className='bg-secondary xs:p-5 md:p-10 mt-5 rounded-bl-[2.75rem] rounded-tr-[2.75rem]'>
                        {coffeCart.map((coffee: CoffeeProps) => (
                            <div className='flex items-center gap-4 border-b-[1px] border-[#E6E5E5] py-7'>
                                <img src={coffee.image} alt="Foto Café expresso" className='xs:w-12 xs:h-12 sm:w-16 sm:h-16' />
                                <div className='flex justify-between w-full'>
                                    <div className='flex flex-col' key={coffee.id}>
                                        <span className='font-text text-subtitle xs:text-xs xs:font-bold md:font-normal sm:text-base'>{coffee.name}</span>
                                        <div className='flex gap-3 xs:flex-col xs:mt-1 sm:mt-0 sm:flex-row'>
                                            <p className='bg-alt rounded-md px-2 py-1 text-center items-center'>
                                                <span className='px-2 text-purpleDark text-lg cursor-pointer' onClick={() => dispatch(decrementQuantityProductInTheCartCheckout(coffee))}>-</span>
                                                {coffee.quantity}
                                                <span className='px-2 text-purpleDark text-lg cursor-pointer'
                                                    onClick={() => dispatch(incrementQuantityProductInTheCartCheckout(coffee))}>+</span>
                                            </p>
                                            <p onClick={() => dispatch(deleteProductToCart(coffee))}
                                                className='bg-alt rounded-md px-2 py-1 text-center flex gap-2 items-center cursor-pointer xs:justify-center sm:justify-start'>
                                                <FaRegTrashAlt color='#8047F8' />
                                                <span>Deletar</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='xs:text-xs sm:text-base font-text text-subtitle font-bold '>
                                        R$ {coffee.amount.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='flex flex-col gap-3 mt-6'>

                            <div className='flex justify-between'>
                                <p className='font-text text-sm text-text'>Total de itens</p>
                                <span className='font-text text-sm text-text'>
                                    {totalItens.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                            <div className='flex justify-between'>
                                <p className='font-text text-sm text-text'>Entrega</p>
                                <span className='font-text text-sm text-text'>R$ 10.90</span>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-text font-title font-bold text-xl'>Total</p>
                                <span className='text-text font-title font-bold text-xl'>
                                    {priceTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </span>
                            </div>
                            <button disabled={coffeCart.length === 0} type='submit' className={`font-text font-bold text-sm text-[#fff] ${coffeCart.length === 0 ? 'bg-[gray] hover:bg-[gray] transition-colors cursor-not-allowed' : 'bg-yellowDark cursor-pointer'} p-4 rounded uppercase 639`}>Confimar pedido</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}
