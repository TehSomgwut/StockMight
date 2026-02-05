import StyleReport from './Report.module.css'
// import AlmostExpired from './AlmostExpired/AlmostExpired'
import LowStock from './LowStock/LowStock'
import Header from '../../components/PageHeader/PageHeader'

export default function Report() {
    return (
         <div className={StyleReport.Report}>
            <header>
                <Header header="รายงานและการแจ้งเตือน" description="ภาพรวมและรายงานความสำคัญของระบบสินค้า" />
                <div className={StyleReport["export-report"]}>
                    <img src="/Icon/8-Reports/Icon-2.svg" />
                    <p>ส่งออกรายงาน (CSV)</p>
                </div>
            </header>
            <div>
                 
            </div>
         </div>
    )
}