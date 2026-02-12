import StyleUnit from './Unit.module.css'
import StyleCategory from '../../Categories/Category/Category.module.css'

export default function Unit({name, description, status}) {
    if (status == "active") {
        status = "ใช้งาน"
    }
    else if (status == "inactive") {
        status = "ไม่ใช้งาน"
    }
    
    return (
         <div className={StyleCategory.Category}>
            <p>{name}</p>
            <p style={{color: "var(--gray)"}}>{description}</p>
            <p className={ status=="ใช้งาน" ? StyleCategory["in-use"] : StyleCategory["out-use"]}>{status}</p>
            <div className={StyleCategory.manage}>
                <img src="/Icon/6-Categories/Icon-1.svg" />
                <img src="/Icon/6-Categories/Icon.svg" />
            </div>
         </div>
    )
}