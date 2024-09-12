function BasketItem(props) {
    const {
        id,
        title,
        price,
        quantity,
        removeFromBasket = Function.prototype,
        incItemQuantity = Function.prototype,
        decItemQuantity = Function.prototype,
    } = props;
    // console.log(title)
    // console.log(price)
    // console.log(quantity)

    return (
        <li className="collection-item">
            <p>{title}</p>
            <span>
                <i className="material-icons purple-cross item-quantity" onClick={() => decItemQuantity(id)}>remove</i>
                {quantity}
                <i className="material-icons purple-cross item-quantity" onClick={() => incItemQuantity(id)}>add</i> {price * quantity} XCH
            </span>
            <span className="secondary-content">
                <i className="material-icons purple-cross" onClick={() => removeFromBasket(id)}>delete</i>
            </span>
        </li>
    );
}

export {BasketItem};