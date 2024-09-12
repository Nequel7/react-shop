import {useState, useEffect} from 'react'
import {API_URL} from '../config'
import {Preloader} from './Preloader'
import {GoodsList} from './GoodsList'
import {Cart} from "./Cart";
import {BasketList} from "./BasketList";
import {Alert} from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');


    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.id === item.id)
        // console.log(itemIndex);
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {...orderItem, quantity: orderItem.quantity + 1};
                } else {
                    return orderItem;
                }
            })
            // console.log(newOrder);
            setOrder(newOrder);
        }
        setAlertName(item.title);

    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter((item) => item.id !== itemId);
        setOrder(newOrder);

    };

    const incItemQuantity = (itemId) => {
        const newOrder = order.map((item) => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + 1;
                return {...item, quantity: newQuantity}

            } else {
                return item;

            }
        })
        setOrder(newOrder);

    };

    const decItemQuantity = (itemId) => {
        const newOrder = order.map((item) => {
            if (item.id === itemId && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                return {...item, quantity: newQuantity}

            } else {
                return item;

            }
        })
        setOrder(newOrder);

    };

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
        setAlertName('')
    };

    useEffect(function getGoods() {
        fetch(API_URL).then(response => response.json()).then((data) => {
            data && setGoods(data);
            setLoading(false);
        })
    }, []);

    // order.reduce((acc, item) => acc + item.quantity, 0)
    return (
        <main className='content container'>
            <Cart quantity={order.reduce((acc, item) => acc + item.quantity, 0)} handleBasketShow={handleBasketShow}/>
            {loading ? < Preloader/> : <GoodsList goods={goods} addToBasket={addToBasket}/>}
            {
                isBasketShow &&
                <BasketList
                    order={order}
                    handleBasketShow={handleBasketShow}
                    removeFromBasket={removeFromBasket}
                    incItemQuantity={incItemQuantity}
                    decItemQuantity={decItemQuantity}
                />
            }
            {
                alertName && <Alert name={alertName} closeAlert={closeAlert}/>
            }
        </main>
    );
}

export {Shop}