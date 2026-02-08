const mongoose = require('mongoose');

const schemaName = new mongoose.Schema({
    title: {type: String, unique: true, required: true},  // title เป็นข้อความที่ไม่สามารถซ้ำกัน (unique: true) ได้และขาดไม่ได้หรือไม่สามารถเป็นค่าว่างได้ (required)
    name: String,
    history: {
        activity: String,
        image: String,
        date: {type: Date, default: Date.now}, // date เป็นข้อมูลประเภท Date ถ้าข้อมูลนี้เป็นค่า่ว่างให้ใส่เวลาปัจจุบันเป็นพื้นฐานแทน (default: Date.now)
        amount: Number
    }
})

const Bota = mongoose.model("Test", schemaName); // ตั้งชื่อตัวแปร Bota = โมเดล(Table ใน SQL นั่นแหละ) ชื่อว่า Test(หัวตาราง ชื่อตาราง) โดยใช้ schemaName เป็นโครงสร้างตาราง

module.exports = Bota; // ส่งโมดูลนี้ออกไปให้ Database ส่วนนี้เต้จัดการเอง