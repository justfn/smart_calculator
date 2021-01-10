import { useVary, } from "../../../libs/index.js";

import "./Hander.less";

let calc_list = [
  // {
  //   type: 'num',
  //   val: '123123',
  // },
  // {
  //   type: 'calc',
  //   val: '+',
  // },
]
let num_tmp = '';
export default function(props, context){
  function getRows(){
    return Array(3).fill(null).map((itm,idx)=>{
    return (
      <div class="row nums_row"> { getCols(idx) } </div>
    )
  })
  } 
  function getCols(rowNum){
    return Array(3).fill(null).map((itm,idx)=>{
      let num = (rowNum*3+idx+1)%10;
      return (
        <button class="col nums_col" onClick={()=>numClickFn(`${num}`)}> 
          { num } 
        </button>
      )
    })
  }

  function numClickFn(num){
    num_tmp += num;
    let lastItm = calc_list[calc_list.length-1];
    if (!lastItm || lastItm.type!=='num') {
      calc_list.push({
        type: 'num',
        val: num_tmp,
      })
      lastItm = calc_list[calc_list.length-1];
    }
    lastItm.val = num_tmp;
    props.change(calc_list);
  } 
  function calcCickFn(calc){
    calc_list.push({
      type: 'calc',
      val: calc,
    });
    num_tmp = '';
    props.change(calc_list);
    console.log( calc_list );
  } 
  function calcRn(){
    props.calc_run();
  } 
  
  return (
    <section class="Hander">
      <button onClick={calcRn}>run</button>
      { getRows() }
      <div class="row nums_row">
        <button class="col nums_col" onClick={()=>numClickFn('0')}>0</button>
        <button class="col nums_col" onClick={()=>numClickFn('00')}>00</button>
        <button class="col nums_col" onClick={()=>numClickFn('.')}>.</button>
      </div>
      <div class="row calc_row">
        <button class="col calc_col" onClick={()=>calcCickFn('+')}>+</button>
        <button class="col calc_col" onClick={()=>calcCickFn('-')}>-</button>
        <button class="col calc_col" onClick={()=>calcCickFn('*')}>*</button>
        <button class="col calc_col" onClick={()=>calcCickFn('/')}>/</button>
      </div>
      
      
      
      
    </section>
  );
}