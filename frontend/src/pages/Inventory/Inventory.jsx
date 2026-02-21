import styleI from './Inventory.module.css';
import Header from '../../components/PageHeader/PageHeader';
import Card from './AllProductCard/Card';
import Product from './Product/Product';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
export default function Inventory() {

    const [ products, setProducts] = useState([])
    useEffect(() => {
        async function getProduct() {
            try {
                const res = await fetch('http://localhost:3000/api/product/', {method: "GET"})
                if (res.ok) {
                    const productsData = await res.json()
                    setProducts(productsData)
                    // console.log("Products: " ,products, "productData: ", productsData)
                }
            }
            catch {
                window.alert("การเชื่อมต่อกับ Supply ล้มเหลว")
            }
        }

        getProduct()
        // setProducts(
        //     [
        //         {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ปกติ", status: "กำลังใช้งาน"},
        //         {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ต่ำกว่าจุดสั่งซื้อ", status: "กำลังใช้งาน"},
        //         {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ต่ำกว่าจุดสั่งซื้อ", status: ""},
        //     ]
        // )
    }, [])

    const cards = [
        {text: "สินค้าทั้งหมด", value: products.length, src:"/Icon/2-Inventory/Icon-7.svg", CN:"blue"},
        {text: "สินค้าใช้งาน", value: products.filter((item) => item.status == 'active').length, src:"/Icon/2-Inventory/Icon-6.svg", CN:"green"},
        {text: "สต๊อกต่ำ", value: products.filter((item) => item.quantity < item.minStock).length, src:"/Icon/2-Inventory/Icon.svg", CN: "orange"},
        {text: "หมดสต๊อก", value: products.filter((item) => item.quantity == 0).length, src:"/Icon/2-Inventory/Icon-20.svg", CN:"red"}
    ]

    // const products = [
    //     {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ปกติ", status: "กำลังใช้งาน"},
    //     {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ต่ำกว่าจุดสั่งซื้อ", status: "กำลังใช้งาน"},
    //     {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ต่ำกว่าจุดสั่งซื้อ", status: ""},
    // ]
    return (
        <div className={styleI["inventory-container"]}>
            <div className={styleI["header-container"]}>
                <Header header="สินค้าคงคลัง" description="จัดการข้อมูลสินค้าทั้งหมด" />
                <Link to={'/pages/add-product'} style={{textDecoration: 'none'}}>
                    <button>
                        <img src="/Icon/2-Inventory/Icon-9.svg" />
                        <p>เพิ่มสินค้าใหม่</p>
                    </button>
                </Link>
            </div>
            <div className={styleI["card-container"]}>
                {cards ? 
                
                    cards.map((item, index) => {
                        return <Card key={index} {...item} />
                    })
            : "ไม่มีข้อมูลสินค้า" }
            </div>
            <form>
                <label htmlFor='product-search'>
                    <img src="/Icon/2-Inventory/Icon-4.svg" />
                    <input type='text' id='product-search' name='product-search' placeholder='ค้นหารหัสสินค้า หรือชื่อสินค้า' />
                </label>
                <label htmlFor="search-filter">
                    <img src="/Icon/2-Inventory/Icon-3.svg" />
                    <select id="search-filter" name="search-filter">
                        <option value="">กรุณาเลือก</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
            </form>
            <div className={styleI["product-table"]}>
                <p className={styleI.Thead}>สินค้า</p>
                <p className={styleI.Thead}>รหัสสินค้า</p>
                <p className={styleI.Thead}>หมวดหมู่</p>
                <p className={styleI.Thead}>คงเหลือ</p>
                <p className={styleI.Thead}>สถานะสต๊อก</p>
                <p className={styleI.Thead}>สถานะ</p>
                <p className={styleI.Thead}>จัดการ</p>
                { products.length !== 0 ? products.map((item, index) => {
                    return <Product key={index} {...item} />
                }) : <p style={{fontSize: '0.9em', color: 'var(--gray)', padding: '20px'}}>ไม่พบสินค้า</p>}
            </div>
        </div>
    )
}