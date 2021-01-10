import { useVary, } from "../../../libs/index.js";


import "./Screen.less";

export default function(props, context){
  let lines = useVary(props.list.value, (list)=>{
    let str = '';
    console.log( list );
    list.map((itm,idx)=>{
      if (itm.type==='calc') {
        str += itm.val
      }
      else {
        itm.val[0].forEach(itm1=>{
          str += itm1
        })
        str += itm.dot;
        itm.val[1].forEach(itm1=>{
          str += itm1
        })
      }
    });
    return str; 
  });
  props.list.watch((p_v,n_v)=>{
    lines.value = n_v;
  });
  
  return (
    <section class="Screen">
      <div class="Screen_row"> {context.html('&nbsp;')} { lines }</div>
    </section>
  );
}

