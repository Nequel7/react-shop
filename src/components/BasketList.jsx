import {BasketItem} from './BasketItem'

function BasketList(props) {
    const {
        order = [],
        handleBasketShow = Function.prototype,
        removeFromBasket = Function.prototype,
        incItemQuantity = Function.prototype,
        decItemQuantity = Function.prototype,
    } = props;
    // console.log(order)
    return (
        <ul className="collection basket-list">
            <li className="collection-item center deep-purple darken-3 white-text" onClick={handleBasketShow}>
                Basket
                <span className="secondary-content">
                    <i className="material-icons white-text">close</i>
                </span>
            </li>
            {
                order.length ? order.map((item) => {
                    // console.log(item)
                    return <BasketItem
                        key={item.id}
                        {...item}
                        removeFromBasket={removeFromBasket}
                        incItemQuantity={incItemQuantity}
                        decItemQuantity={decItemQuantity}
                    />
                }) : <li className="collection-item">Basket is empty</li>
            }

            <li className="collection-item deep-purple darken-3 white-text">Total
                price: {Math.round((order.reduce((acc, item) => acc + item.quantity * item.price, 0)) * 100) / 100} XCH
                <span className="secondary-content white-text item-quantity">
                    <div className="create-order">
                        <span style={{marginRight:'0.5rem'}}>
                            Order
                        </span>

                    <i className="material-icons white-text">local_shipping</i>
                    </div>
                </span>
            </li>
        </ul>
    );
}

export {BasketList};