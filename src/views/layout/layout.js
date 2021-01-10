import { useVary, } from "../../../libs/index.js";

import Screen from "../Screen/Screen.js";
import Hander from "../Hander/Hander.js";
import "./layout.less";


export default function(props, context){
  let calc_list = useVary([]);
  function handleChange(list){
    calc_list.set(()=>{
      return list;
    });
  } 
  function calc_run(){
    console.log('run');
  } 
  
  return (
    <section class="smart_calculator">
      <div class="layout_lft">
        <div class="part_screen">
          <Screen list={calc_list} /> 
        </div>
        <div class="part_hander">       
          <Hander change={handleChange} calc_run={calc_run}  /> 
        </div>
      </div>
      <div class="layout_rit">
        <div class="part_saves">
          留存
        </div>
        <div class="part_history">
          历史
        </div>
      </div>
    </section>
  );
}



