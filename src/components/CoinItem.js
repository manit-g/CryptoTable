import React from 'react'

import './Coins.css'

const CoinItem = (props) => {
    const priceChange = props.coins.price_change_percentage_24h;
    const isPositive = priceChange >= 0;
    
    return (
        <div className='coin-row hover-lift'>
            <p className='rank-number'>{props.coins.market_cap_rank}</p>
            <div className='img-symbol'>
                <img src={props.coins.image} alt={props.coins.name} />
                <div className='coin-info'>
                    <p className='coin-symbol'>{props.coins.symbol.toUpperCase()}</p>
                    <p className='coin-name-small'>{props.coins.name}</p>
                </div>
            </div>
            <p className='price'>${props.coins.current_price.toLocaleString()}</p>
            <p className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
            </p>
            <p className='hide-mobile volume'>${props.coins.total_volume.toLocaleString()}</p>
            <p className='hide-mobile market-cap'>${props.coins.market_cap.toLocaleString()}</p>
        </div>
    )
}

export default CoinItem
