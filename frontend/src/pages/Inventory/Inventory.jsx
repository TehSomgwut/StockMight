import styleI from './Inventory.module.css';
import Header from '../../components/PageHeader/PageHeader';
import Card from './AllProductCard/Card';
import Product from './Product/Product';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
export default function Inventory() {

    const [ products, setProducts] = useState([])
    const [ showCheckbox, setShowCheckbox ] = useState(false)
    const [ allProducts, setAllProducts ] = useState(products)
    // const [ filter, setFilter ] = useState({keyword: "", sorted: "", status: []})
    useEffect(() => {
        async function getProduct() {
            try {
                const res = await fetch('http://localhost:3000/api/product/', {method: "GET"})
                if (res.ok) {
                    const productsData = await res.json()
                    setProducts(productsData)
                    setAllProducts(productsData)
                    // console.log("Products: " ,products, "productData: ", productsData)
                }
            }
            catch {
                window.alert("การเชื่อมต่อกับ Supply ล้มเหลว")
            }
        }

        getProduct()
        socket.on('updateSupply', () => {
            getProduct()
        })

        return () => {
            socket.off('updateSupply')
        }
        // setProducts(
        //     [
        //         {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ปกติ", status: "กำลังใช้งาน"},
        //         {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ต่ำกว่าจุดสั่งซื้อ", status: "กำลังใช้งาน"},
        //         {name: "เครื่องพิมพ์เลเซอร์ HP LaserJet Pro", src:"/Icon/2-Inventory/Icon.svg", unit: "ชิ้น", productID: "ELC-001", category: "อิเล็กทรอนิกส์", remain: "15", stockStatus: "ต่ำกว่าจุดสั่งซื้อ", status: ""},
        //     ]
        // )
    }, [])

    // useEffect(() => {
    //     console.log(filter)
    //     let result = [...allProducts]
    //     if(filter.keyword) {
    //         result = result.filter(item => item.name.toLowerCase().includes(filter.keyword) || 
    //         item.code.toLowerCase().includes(filter.keyword))
    //     }

    //     if(filter.status.length > 0) {
    //         result = result.filter(item => filter.status.includes(item.status))
    //     }
    // }, [filter, allProducts])

    function sortProduct(e) {
        const option = e.target.value
        switch (option) {
            case "1": {
                const sorted = [...products].sort((a, b) => a.category.localeCompare(b.category));
                setProducts(sorted)
                break
            }
            case "2": {
                const sorted = [...products].sort((a, b) => a.metric.localeCompare(b.metric));
                setProducts(sorted)
                break
            }
            case "3": {
                const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
                setProducts(sorted)
                break
            }
            case "4": {
                const sorted = [...products].sort((a, b) => a.quantity - b.quantity);
                setProducts(sorted)
                break
            }
            case "5": {
                const sorted = [...products].sort((a, b) => a.code.localeCompare(b.code));
                setProducts(sorted)
                break
            }
        }
    }
    const [selectedFilters, setSelectedFilters] = useState([]);

    function filterProduct(e) { // Function นี้ใช้ Gemini ทำให้เพื่อลดต้นทุนเวลา
        const isChecked = e.target.checked;
        const option = e.target.value;
        
        // 1. อัปเดตรายการที่ติ๊ก
        let newFilters;
        if (isChecked) {
            newFilters = [...selectedFilters, option]; 
        } else {
            newFilters = selectedFilters.filter(val => val !== option); 
        }
        
        // เซ็ต State จำไว้
        setSelectedFilters(newFilters);

        // 2. ถ้าไม่ได้ติ๊กอะไรเลย ให้โชว์ทั้งหมด
        if (newFilters.length === 0) {
            setProducts(allProducts); 
            return;
        }

        // 🟢 3. กระบวนการกรองข้อมูล (เปลี่ยนเป็น AND Logic)
        const filteredData = allProducts.filter(item => {
            // .every() จะเอาค่าใน newFilters มาเช็คทีละอัน 
            // ถ้ามีอันไหน return false แม้แต่อันเดียว สินค้านั้นจะถูกคัดทิ้งทันที
            return newFilters.every(filterOption => {
                if (filterOption === "1") return item.status === 'active';
                if (filterOption === "2") return item.quantity < item.minStock;
                if (filterOption === "3") return item.quantity >= item.minStock;
                return true; // เผื่อกรณีหลุดเคสอื่นๆ
            });
        });

        // อัปเดตหน้าจอ
        setProducts(filteredData);
    }

    function searchSupply(e) {
        const target = e.target.value
            const searched = allProducts.filter((item) => item.name.toLowerCase().includes(target) || item.code.includes(target))
            setProducts(searched)
    }
    

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
                    <input type='text' id='product-search' name='product-search' placeholder='ค้นหารหัสสินค้า หรือชื่อสินค้า' onChange={searchSupply} />
                </label>
                <label htmlFor="search-filter">
                    <img src="/Icon/2-Inventory/Icon-3.svg" />
                    <select id="search-filter" name="search-filter" onChange={sortProduct}>
                        <option value="">เรียงลำดับตาม</option>
                        <option value="1">ตามหมวดหมู่</option>
                        <option value="2">ตามหน่วยนับ</option>
                        <option value="3">ตามชื่อ</option>
                        <option value="4">ตามจำนวนคงเหลือ</option>
                        <option value="5">ตามรหัสสินค้า</option>
                    </select>
                    <div style={{display: 'flex', gap: '10px'}} onClick={() => setShowCheckbox(!showCheckbox)}>
                        <img src="/Icon/2-Inventory/Icon-3.svg" />
                        <span>กรองสถานะ</span>
                    </div>
                    <span id="filter1" name="filter1">
                        <div className={styleI["checkbox-container"]} style={ showCheckbox ? {display: 'block'} : {display: 'none'}}>
                            <label><input type='checkbox' onChange={filterProduct} value="1" name="activeCheckbox" />สถานะใช้งาน</label>
                            <label><input type='checkbox' onChange={filterProduct} value="2" name="lowStockCheckbox" />ต่ำกว่าจุดสั่งซื้อ</label>
                            <label><input type='checkbox' onChange={filterProduct} value="3" name="normalCheckbox" />สถานะปกติ</label>
                        </div>
                    </span>
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
                { products.length !== 0 ? products.map((item) => {
                    return <Product key={item._id} {...item} />
                }) : <p style={{fontSize: '0.9em', color: 'var(--gray)', padding: '20px'}}>ไม่พบสินค้า</p>}
            </div>
        </div>
    )
}