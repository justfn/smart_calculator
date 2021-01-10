import { useVary, } from "../../../libs/index.js";

import "./Hander.less";

let calc_list = [
  // {
  //   type: 'num',
  //   val: [[1,3,2,0],[1,3]],
  // },
  // {
  //   type: 'calc',
  //   val: '+',
  // },
]
let num_tmp_idx = 0;
let num_tmp = [
  [],
  []
];
// function lastItmType(flg){
//   let lastItm = calc_list[calc_list.length-1];
//   if (lastItm && lastItm.type===flg) { return true; }
// 
//   return false;
// } 
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
        <button class="col nums_col" onClick={()=>numClickFn(num)}> 
          { num } 
        </button>
      )
    })
  }

  function numClickFn(num){
    let arr = num_tmp[num_tmp_idx];
    if (arr.length!==0 || num!==0) { arr.push(num); }
    let lastItm = calc_list[calc_list.length-1];
    if (!lastItm || lastItm.type!=='num') {
      lastItm = {
        type: 'num',
        val: num_tmp,
        dot: '', 
      }
      calc_list.push(lastItm);
    }
    lastItm.val = num_tmp;
    props.change(calc_list);
  } 
  function dotClickFn(){
    if (num_tmp_idx===0) {
      num_tmp_idx = 1;
    }
    let lastItm = calc_list[calc_list.length-1];
    if (lastItm && lastItm.type==='num') {
      lastItm.dot = '.';
      props.change(calc_list);
    }
  }
  function calcCickFn(calc){
    num_tmp_idx = 0; 
    let lastItm = calc_list[calc_list.length-1];
    if (lastItm.type==='calc') {
      calc_list.pop();
    }
    calc_list.push({
      type: 'calc',
      val: calc,
    });
    num_tmp = [[],[]];
    props.change(calc_list);
  } 
  function backClickFn(){
  } 
  function calcRn(){
    props.calc_run();
  } 
  
  return (
    <section class="Hander">
      <button onClick={calcRn}>run</button>
      { getRows() }
      <div class="row nums_row">
        <button class="col nums_col" onClick={()=>numClickFn(0)}>0</button>
        <button class="col nums_col" onClick={()=>dotClickFn()}>●</button>
        <button class="col nums_col" onClick={()=>backClickFn()}>←</button>
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