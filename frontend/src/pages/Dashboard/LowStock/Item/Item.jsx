import ItemStyles from './Item.module.css'

export default function Item({SKU, name, remain, danger, status}) {
    return (
        <div className={ItemStyles.Item}>
            <p className={ItemStyles.SKU}>{SKU}</p>
            <p className={ItemStyles.name}>{name}</p>
            <p className={ItemStyles.remain}>{remain}</p>
            <p className={ItemStyles.danger}>{danger}</p>
            <div className={ItemStyles.status}>
                {status ? <div className={ItemStyles.status2}>
                    <img src={status.src} />
                    <p>{status.text}</p>
                </div> : " - "}
            </div>
        </div>
    )
}