import StyleLS from './LowStock.module.css'

export default function LowStock({header: {hName, hDescription, svg}, total}) {
    const color = () => {
        if(total == 0) {
            return "safe"
        }
        else if (total < 4) {
            return 'risly'
        }
        else {
            return 'danger'
        }
    }
    return (
         <div className={StyleLS.LowStock}>
            <header>
                <div>
                    <h2>{hName}</h2>
                    <p>{hDescription}</p>
                </div>
                <div className={StyleLS[color]}>{svg}</div>
            </header>
            <h1 className={StyleLS[color]}>{total} รายการ</h1>
            <div>
                
            </div>
         </div>
    )
}