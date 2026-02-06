import dbStyles from './Dashboard.module.css';
import Detail from './OverallDetail/OverallDetail';
import BarC from './barChart/Bar';
import LowStock from './LowStock/LowStock';
import Header from '../../components/PageHeader/PageHeader'

export default function Dashboard() {
    const dashboardData = [
        {
            src: '/Icon/1-Home/Icon-6.svg',
            text: "จำนวนรายการสินค้า (SKU)",
            data: "7"
        },
        {
            src: '/Icon/1-Home/Icon-5.svg',
            text: "จำนวนคงเหลือรวม",
            data: "218 หน่วย"
        },
        {
            src: '/Icon/1-Home/Icon-4.svg',
            text: "รายการใกล้หมด",
            data: "3",
            alert: null
        },
        {
            src: '/Icon/1-Home/Icon-2.svg',
            text: "จำนวนรายใกล้หมดอายุ (30 วัน)",
            data: "0"
        },
        {
            src: '/Icon/1-Home/Icon-1.svg',
            text: "รับเข้าสินค้าวันนี้",
            data: "5 หน่วย"
        },
        {
            src: '/Icon/1-Home/Icon-10.svg',
            text: "เบิกออกสินค้าวันนี้",
            data: "2 หน่วย"
        },

    ]
    const chartData = [
        { date: "1 ก.พ. ", Import: 60, Export: 30},
        { date: "2 ก.พ. ", Import: 40, Export: 50},
        { date: "3 ก.พ. ", Import: 70, Export: 40},
        { date: "4 ก.พ. ", Import: 50, Export: 30},
        { date: "5 ก.พ. ", Import: 50, Export: 40},
        { date: "6 ก.พ. ", Import: 30, Export: 20},
        { date: "7 ก.พ. ", Import: 20, Export: 30}
    ]
    return (
        <div className={dbStyles.Dashboard}>
            <Header header="แดชบอร์ดคลังสินค้า" description="ภาพรวมและสถิติการจัดการคลังสินค้า" />
            <div className={dbStyles["overall-container"]}>
                {
                    dashboardData.map((item, index) => {
                        return <Detail key={index} src={item.src} text={item.text} data={item.data} alert={item.alert} />
                    })
                }
            </div>
            <div className={dbStyles["weekly"]}>
                <div className={dbStyles["bar-chart-container"]}>
                    <BarC data={chartData} />
                </div>
                <div className={dbStyles["low-stock"]}>
                    <LowStock />
                </div>
            </div>
        </div>
    )
}