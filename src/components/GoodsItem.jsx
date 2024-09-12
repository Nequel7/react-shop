function GoodsItem(props) {
    const {
        id,
        title,
        description,
        price,
        image,
        addToBasket = Function.prototype,
    } = props;

    return <div className="card">
        <div className="card-image">
            <img src={image} alt='Fortnite item'/>
        </div>
        <div className="card-content">
            <span className="card-title">{title}</span>
            <p>{description}</p>
        </div>
        <div className="spacer"></div>
        <div className="card-action">
            <button className='btn' onClick={() => addToBasket({
                id,
                title,
                description,
                price
            })}>Buy</button>
            <span className='right' style={{fontSize: '1.8rem'}}>{price} XCH</span>
        </div>
    </div>
}

export {GoodsItem};