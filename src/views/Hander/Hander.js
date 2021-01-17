import { useVary, } from "../../../fd_libs/index.js";

import "./Hander.less";

export default function(props, context){
  const elems = {
    getRows(){
      return Array(3).fill(null).map((itm,idx)=>{
        return (
          <div class="row nums_row"> { this.getCols(idx) } </div>
        )
      })
    },
    getCols(rowNum){
      return Array(3).fill(null).map((itm,idx)=>{
        let num = (rowNum*3+idx+1)%10;
        return (
          <button class="col nums_col" onClick={()=>calc_expr.numClickFn(num)}> 
            { num } 
          </button>
        )
      })
    },
  };
  const calc_expr = {
    numTmpIdx: 0, 
    numTmpArr: [ [], [] ],
    calcList: [
      // {
      //   type: 'num',
      //   val: [[1,3,2,0],[1,3]],
      //   dot: '.',
      // },
      // {
      //   type: 'calc',
      //   val: '+',
      // },
    ],
    numClickFn(num){
      if ( this.numTmpArr[1].length>=2 ) { return ; }
      
      let arr = this.numTmpArr[this.numTmpIdx];
      if (arr.length!==0 || num!==0) { arr.push(num); }
      let lastItm = this.calcList[this.calcList.length-1];
      if (!lastItm || lastItm.type!=='num') {
        lastItm = {
          type: 'num',
          val: this.numTmpArr,
          dot: '', 
        }
        this.calcList.push(lastItm);
      }
      lastItm.val = this.numTmpArr;
      props.change(this.calcList);
    },
    dotClickFn(){
      if (this.numTmpIdx===0) {
        this.numTmpIdx = 1;
      }
      let lastItm = this.calcList[this.calcList.length-1];
      if (lastItm && lastItm.type==='num') {
        lastItm.dot = '.';
        props.change(this.calcList);
      }
    },
    calcCickFn(calc){
      this.numTmpIdx = 0; 
      let lastItm = this.calcList[this.calcList.length-1];
      if (lastItm.type==='calc') {
        this.calcList.pop();
      }
      else {
        if (lastItm.val[1].length!==2) {
          lastItm.dot = '.'
          Array(2).fill(null).forEach((itm,idx)=>{
            lastItm.val[1][idx] = lastItm.val[1][idx] ?? 0;
          })
        }
      }
      this.calcList.push({
        type: 'calc',
        val: calc,
      });
      this.numTmpArr = [[],[]];
      props.change(this.calcList);
    },
    backClickFn(){
    }, 
    calcRn(){
      props.calc_run();
    }, 
  };
  
  return (
    <section class="Hander">
      { elems.getRows() }
      <div class="row nums_row">
        <button class="col nums_col" onClick={()=>calc_expr.numClickFn(0)}>0</button>
        <button class="col nums_col" onClick={()=>calc_expr.dotClickFn()}>●</button>
        <button class="col nums_col" onClick={()=>calc_expr.backClickFn()}>←</button>
      </div>
      <div class="row calc_row">
        <button class="col calc_col" onClick={()=>calc_expr.calcCickFn('+')}>+</button>
        <button class="col calc_col" onClick={()=>calc_expr.calcCickFn('-')}>-</button>
        <button class="col calc_col" onClick={()=>calc_expr.calcCickFn('*')}>*</button>
        <button class="col calc_col" onClick={()=>calc_expr.calcCickFn('/')}>/</button>
      </div>
      <button class="runBtn" onClick={calc_expr.calcRn}>run</button>
    </section>
  );
}