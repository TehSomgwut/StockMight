import StyleCategory from './Category.module.css'

export default function Category({Cname, amount, status}) {
    return (
         <div className={StyleCategory.Category}>
            <p>{Cname}</p>
            <p style={{color: "var(--gray)"}}>{amount} รายการ</p>
            <p className={ status=="ใช้งาน" ? StyleCategory["in-use"] : StyleCategory["out-use"]}>{status}</p>
            <div className={StyleCategory.manage}>
                <img src="/Icon/6-Categories/Icon-1.svg" />
                <img src="/Icon/6-Categories/Icon.svg" />
            </div>
         </div>
    )
}