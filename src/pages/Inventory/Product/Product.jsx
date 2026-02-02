import styleP from './Product.module.css'

export default function Product({name, src, unit, productID, catagory, remain, stockStatus, status, manage}) {
    return (
        <div className={styleP.Product}>
            <div className={styleP["product-name"]}>
                <img src={src} alt={name} />
                <div>
                    <h5>{name}</h5>
                    <p>{ unit }</p>
                </div>
            </div>
            <p>{productID}</p>
            <p>{catagory}</p>
            <p>{remain}</p>
            {stockStatus=="ปกติ" ? 
                <div>
                    
                </div>
            : 
                <div>
                    
                </div>
             }
            <div>{status}</div>
            <div className={styleP.manage}>
                <img src="./Icon/2-Inventory/Icon-2.svg" />
                <img src="./Icon/2-Inventory/Icon-1.svg" />
            </div>
        </div>
    )
}