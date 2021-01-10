import { useVary, } from "../../../libs/index.js";


import "./Screen.less";

export default function(props, context){
  let lines = useVary([]);
  props.list.watch((p_v,n_v)=>{
    console.log( p_v, n_v);
  });
  
  return (
    <section class="Screen">
      <div class="Screen_row">111+222</div>
      <div class="Screen_row">{ props.list }</div>
    </section>
  );
}