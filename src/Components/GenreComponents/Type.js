import React from 'react'

const Type = ({ setType }) => {

    function clickHandler(event) {
        let btn1 = document.getElementById('btn1')
        let btn2 = document.getElementById('btn2')
        let value = event.target.innerText;
        if(value === 'Movies') {
            btn1.classList.add('active');
            btn2.classList.remove('active');
        } else {
            btn1.classList.remove('active');
            btn2.classList.add('active');
        }
        setType(value);
    }

  return (
    <div className={'typeContainer'}>
        <button className={'btn1 active'}  onClick={clickHandler} id='btn1'>Movies</button>
        <button className={'btn2'} onClick={clickHandler} id='btn2'>Shows</button>
    </div>
  )
}

export default Type;