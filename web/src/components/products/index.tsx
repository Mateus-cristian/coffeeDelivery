
import { useEffect } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch, } from 'react-redux';
import { AppDispatch, decrementQuantityProduct, fetchCoffes, incrementProductToCart, incrementQuantityProduct, } from '../../store/cart';
import { CoffeeProps } from '../../types/@types';


export default function Products() {

    const dispatch = useDispatch<AppDispatch>();

    const coffes = useSelector((state: any) => state.coffes)

    function increaseQuantityTheItem(value: CoffeeProps) {
        dispatch(incrementQuantityProduct(value))
    }

    function decrementQuantityTheItem(value: CoffeeProps) {
        dispatch(decrementQuantityProduct(value))
    }

    function addProductToCart(value: CoffeeProps) {
        dispatch(incrementProductToCart(value))
    }


    useEffect(() => {
        dispatch(fetchCoffes())
    }, [dispatch])


    return (
        <div className='mt-32 flex flex-col align-start'>
            <h2 className='text-subtitle text-[2rem] font-title font-extrabold'>Nossos cafés</h2>
            <div className='grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-20 place-items-center pb-20 xxl:place-items-start xxl:grid-cols-[repeat(auto-fit,minmax(288px,1fr))] '>
                {coffes.map((coffee: CoffeeProps) =>
                    <div key={coffee.id} className='relative rounded-md rounded-tr-[2rem] rounded-bl-[2rem] bg-alt min-h-[310px] max-w-[256px]'>
                        <img src={coffee.image} alt="" className='mx-auto translate-y-[-20px]' />
                        <div className='flex flex-col px-5 pb-5'>
                            <div className='flex justify-center gap-1'>
                                {coffee.variation.map((item, index) => (
                                    <span key={index} className='inline text-center py-1 px-2 text-yellowDark bg-yellowLight rounded-[30px] max-h-5 max-w-20 text-[0.625rem] font-bold uppercase translate-y-[-10px]'>
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                            <span className='text-center text-title font-title text-xl font-bold '>{coffee.name}</span>
                            <p className='font-text text-label text-sm text-center mt-2'>{coffee.description}</p>
                            <div className='flex justify-between mt-10'>
                                <div className='flex items-center'>
                                    <p className='font-title font-bold text-2xl'><span className='font-text font-normal text-sm'>R$</span>{coffee.price.toFixed(2)}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <div>
                                        <p className='bg-secondary
                             rounded-md px-2 py-1 text-center'><span className='px-2 text-purpleDark text-lg cursor-pointer '
                                                onClick={() => decrementQuantityTheItem(coffee)}>-</span>{coffee.quantity}<span className='px-2 text-purpleDark text-lg cursor-pointer' onClick={() => increaseQuantityTheItem(coffee)}>+</span></p>
                                    </div>
                                    <div className={`bg-purpleDark p-2 rounded-md ${coffee.quantity > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`} onClick={() => addProductToCart(coffee)}>
                                        <FaShoppingCart size={22} color={'#fff'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
