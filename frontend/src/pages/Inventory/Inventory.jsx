import styleI from './Inventory.module.css';
import Header from '../../components/PageHeader/PageHeader';
import Card from './AllProductCard/Card';
import Product from './Product/Product';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Inventory({ productsData }) {
    const [ products, setProducts] = useState([]);
    const [ showCheckbox, setShowCheckbox ] = useState(false);
    const [ allProducts, setAllProducts ] = useState([]);
    const [ selectedFilters, setSelectedFilters] = useState([]);

    // อัปเดต State เมื่อ Props (productsData) เปลี่ยนแปลง
    useEffect(() => {
        setProducts(productsData || []);
        setAllProducts(productsData || []);
    }, [productsData]);

    function sortProduct(e) {
        const option = e.target.value;
        switch (option) {
            case "1": {
                const sorted = [...products].sort((a, b) => (a.category?.name || "").localeCompare(b.category?.name || ""));
                setProducts(sorted);
                break;
            }
            case "2": {
                const sorted = [...products].sort((a, b) => (a.metric?.name || "").localeCompare(b.metric?.name || ""));
                setProducts(sorted);
                break;
            }
            case "3": {
                const sorted = [...products].sort((a, b) => a.name.localeCompare(b.name));
                setProducts(sorted);
                break;
            }
            case "4": {
                const sorted = [...products].sort((a, b) => a.quantity - b.quantity);
                setProducts(sorted);
                break;
            }
            case "5": {
                const sorted = [...products].sort((a, b) => a.code.localeCompare(b.code));
                setProducts(sorted);
                break;
            }
            default:
                break;
        }
    }

    function filterProduct(e) {
        const isChecked = e.target.checked;
        const option = e.target.value;
        
        let newFilters;
        if (isChecked) {
            newFilters = [...selectedFilters, option]; 
        } else {
            newFilters = selectedFilters.filter(val => val !== option); 
        }
        
        setSelectedFilters(newFilters);

        if (newFilters.length === 0) {
            setProducts(allProducts); 
            return;
        }

        const filteredData = allProducts.filter(item => {
            return newFilters.every(filterOption => {
                if (filterOption === "1") return item.status === 'active';
                if (filterOption === "2") return item.quantity < item.minStock;
                if (filterOption === "3") return item.quantity >= item.minStock;
                return true; 
            });
        });

        setProducts(filteredData);
    }

    function searchSupply(e) {
        const target = e.target.value.toLowerCase();
        const searched = allProducts.filter((item) => 
            item.name.toLowerCase().includes(target) || 
            item.code.toLowerCase().includes(target)
        );
        setProducts(searched);
    }
    
    const cards = [
        {text: "สินค้าทั้งหมด", value: products.length, src:"/Icon/2-Inventory/Icon-7.svg", CN:"blue"},
        {text: "สินค้าใช้งาน", value: products.filter((item) => item.status === 'active').length, src:"/Icon/2-Inventory/Icon-6.svg", CN:"green"},
        {text: "สต๊อกต่ำ", value: products.filter((item) => item.quantity < item.minStock).length, src:"/Icon/2-Inventory/Icon.svg", CN: "orange"},
        {text: "หมดสต๊อก", value: products.filter((item) => item.quantity === 0).length, src:"/Icon/2-Inventory/Icon-20.svg", CN:"red"}
    ];

    return (
        <div className={styleI["inventory-container"]}>
            <div className={styleI["header-container"]}>
                <Header header="สินค้าคงคลัง" description="จัดการข้อมูลสินค้าทั้งหมด" />
                <Link to={'/pages/add-product'} style={{textDecoration: 'none'}}>
                    <button>
                        <img src="/Icon/2-Inventory/Icon-9.svg" alt="add"/>
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
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='product-search'>
                    <img src="/Icon/2-Inventory/Icon-4.svg" alt="search"/>
                    <input type='text' id='product-search' name='product-search' placeholder='ค้นหารหัสสินค้า หรือชื่อสินค้า' onChange={searchSupply} />
                </label>
                <label htmlFor="search-filter">
                    <img src="/Icon/2-Inventory/Icon-3.svg" alt="filter"/>
                    <select id="search-filter" name="search-filter" onChange={sortProduct}>
                        <option value="">เรียงลำดับตาม</option>
                        <option value="1">ตามหมวดหมู่</option>
                        <option value="2">ตามหน่วยนับ</option>
                        <option value="3">ตามชื่อ</option>
                        <option value="4">ตามจำนวนคงเหลือ</option>
                        <option value="5">ตามรหัสสินค้า</option>
                    </select>
                    <div style={{display: 'flex', gap: '10px', cursor: 'pointer'}} onClick={() => setShowCheckbox(!showCheckbox)}>
                        <img src="/Icon/2-Inventory/Icon-3.svg" alt="filter"/>
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
    );
}