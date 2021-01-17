import { useVary, } from "../../../fd_libs/index.js";


import "./Screen.less";

export default function(props, context){
  const lines = useVary([], (list)=>{
    return list.map((lineItm,idx)=>{
      return (
        <div class="Screen_row"> {context.html('&nbsp;')} { lineItm }</div>
      )
    });
  })
  const line = useVary(props.list, (list)=>{
    list = list.value;
    console.log( '# 01', list);
    let str = '';
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
    lines.set((linesList)=>{
      let lastLine = linesList[linesList.length-1];
      if (!lastLine) { return [str]; }
      let l = [...linesList]
      l.pop()
      l.push(str)
      return l;
    })
    return str; 
  })
  
  context.addLine = ()=>{
    lines.set((list)=>{
      let l = [...list];
      l.push('result')
      return l;
    })
  }
  return (
    <section class="Screen">
      { lines }
    </section>
  );
}

