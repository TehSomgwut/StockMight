import ItemStyles from './Item.module.css'

export default function Item({code, name, quantity, minStock}) {
    return (
        <div className={ItemStyles.Item}>
            <p className={ItemStyles.SKU}>{code}</p>
            <p className={ItemStyles.name}>{name}</p>
            <p className={ItemStyles.remain}>{quantity}</p>
            <p className={ItemStyles.danger}>{minStock}</p>
            <div className={ItemStyles.status}>
                <div className={ItemStyles.status2}>
                    <img src={'/Icon/1-Home/Icon.svg'} />
                    <p>ใกล้หมด</p>
                </div>
            </div>
        </div>
    )
}