import StyleInputField from './InputField.module.css'

export default function InputField({ name, placeholder, description, isReq, addClass }) {
    
    const isLong = addClass === StyleInputField.long;
    const InputTag = isLong ? 'textarea' : 'input';

    return (
        <div className={`${StyleInputField["input-field"]} ${addClass}`}>
            <p>{name}</p>
            
            {/* 2. ใช้ Tag ที่เลือกไว้ และใส่ attributes แบบ Dynamic */}
            <InputTag 
                type={isLong ? undefined : 'text'}
                placeholder={placeholder} 
                required={isReq}
            />
            
            <p className={StyleInputField.description}>{description}</p>
        </div>
    )
}