import StyleReport from './Report.module.css'
// import AlmostExpired from './AlmostExpired/AlmostExpired'
import LowStock from './LowStock/LowStock'
import Header from '../../components/PageHeader/PageHeader'
import BarC from '../Dashboard/barChart/Bar'

export default function Report() {
    const LowStockItem = [
        {productID: "ELC-002", name: "หมึกพิมพ์ Cannon 810 สีดำ", quantity:5, alert:15, type:"LowStock"},
        {productID: "OFF-001", name: "กระดาษ A4 Double A 80 แกรม", quantity:3, alert:8, type:"LowStock"},
        {productID: "ELC-002", name: "ปูนซีเมนต์ตราช้าง", quantity:150, alert:200, type:"LowStock"},
    ]
    const totalReport = LowStockItem.length
    const strokeColor = () => {
        if (totalReport < 3) {
            return '#00A63E'
        }
        else if (totalReport <= 5) {
            return '#FF6200'
        }
        else if (totalReport > 5) {
            return '#FF0000'
        }
    }
    const LowStockData =
        {header: {hName: "รายการใกล้หมด", hDescription: "สินค้าที่คงเหลือต่ำกว่าหรือเท่าจุดแจ้งเตือน", 
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.7304 18L13.7304 4C13.556 3.6922 13.303 3.43618 12.9973 3.25806C12.6917 3.07995 12.3442 2.9861 11.9904 2.9861C11.6366 2.9861 11.2892 3.07995 10.9835 3.25806C10.6778 3.43618 10.4249 3.6922 10.2504 4L2.25042 18C2.0741 18.3054 1.98165 18.6519 1.98243 19.0045C1.98321 19.3571 2.0772 19.7032 2.25486 20.0078C2.43253 20.3124 2.68757 20.5646 2.99411 20.7388C3.30066 20.9131 3.64783 21.0032 4.00042 21H20.0004C20.3513 20.9996 20.6959 20.907 20.9997 20.7313C21.3035 20.5556 21.5556 20.3031 21.7309 19.9991C21.9062 19.6951 21.9985 19.3504 21.9984 18.9995C21.9983 18.6486 21.9059 18.3039 21.7304 18Z" stroke={strokeColor()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 9V13" stroke={strokeColor()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 17H12.01" stroke={strokeColor()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        }, total: totalReport, 
    ItemData : LowStockItem}




    const ExpiringSoonItems = [
        {productID: "ELC-002", name: "หมึกพิมพ์ Cannon 810 สีดำ", quantity:5, alert:15, type:""},
        {productID: "OFF-001", name: "กระดาษ A4 Double A 80 แกรม", quantity:3, alert:8, type:""},
        {productID: "ELC-002", name: "ปูนซีเมนต์ตราช้าง", quantity:150, alert:200, type:""},
    ]
    const ExpiringSoonAmount = ExpiringSoonItems.length
    const strokeColorE = () => {
        if (ExpiringSoonAmount < 3) {
            return '#00A63E'
        }
        else if (ExpiringSoonAmount <= 5) {
            return '#FF6200'
        }
        else if (ExpiringSoonAmount > 5) {
            return '#FF0000'
        }
    }
    const ExpiringSoonData = {
        header: {hName: "รายการใกล้หมดอายุ", hDescription: "สินค้าหมดอายุภายใน 30 วัน", 
            svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={strokeColorE()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 6V12L16 14" stroke={strokeColorE()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        }, total: ExpiringSoonAmount, ItemData: ExpiringSoonItems
    }


    const chartData = [
        {date: "21 ม.ค.", Import: 50, Export: 30},
        {date: "22 ม.ค.", Import: 35, Export: 40},
        {date: "23 ม.ค.", Import: 60, Export: 35},
        {date: "24 ม.ค.", Import: 40, Export: 50},
        {date: "25 ม.ค.", Import: 70, Export: 40},
        {date: "26 ม.ค.", Import: 50, Export: 40},
        {date: "27 ม.ค.", Import: 40, Export: 35},
    ]


    return (
         <div className={StyleReport.Report}>
            <header>
                <Header header="รายงานและการแจ้งเตือน" description="ภาพรวมและรายงานความสำคัญของระบบสินค้า" />
                <div className={StyleReport["export-report"]}>
                    <img src="/Icon/8-Reports/Icon-2.svg" />
                    <p>ส่งออกรายงาน (CSV)</p>
                </div>
            </header>
            <div className={StyleReport["risky-container"]}>
                 <LowStock {...LowStockData} />
                 <LowStock {...ExpiringSoonData} />
            </div>
            <div className={StyleReport["chart-container"]} >
                <p>สรุปรับเข้า-เบิกออก (7 วันล่าสุด)</p>
                <BarC data={chartData} />
            </div>
         </div>
    )
}