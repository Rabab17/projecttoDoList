import React, { useState } from 'react'
import { LuNotebookPen } from "react-icons/lu";
import '../App.css'

export default function Header() {
const  [Show,SetShow]=useState(false)

  const dropd = () => {
  SetShow(!Show);

  }

  return (
    <>
      <div className="display-flex justify">
        <LuNotebookPen className='color' />
        <h1 className='colorr'>ملاحظاتي</h1>
      </div>

      <div className='text'>احفظ أفكارك وذكرياتك في مكان واحد</div>

      <form className='form' onSubmit={(e) => e.preventDefault()}>
        <input
          type='search'
          placeholder='ابحث فى ملاحظاتك'
          className='color_search'
        />
        <button className='not' onClick={dropd}>ملاحظة جديده +</button>
      </form>
      {Show && (
             <div className="dropdown-form">
              <form className="note-form">
  <div className="note-title">إنشاء ملاحظة جديدة</div>
  <input type="text" placeholder="عنوان الملاحظة" className="input1" />
  <input type="text" placeholder="أكتب ملاحظتك هنا..." className="input2" />
  <button type="submit" className="save-btn">حفظ</button>
  <button type="submit" className="save-btn" onClick={dropd}>الغاء</button>
</form>

             </div>
           )}
    </>
  );
}
