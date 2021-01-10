import { isVary, } from "../vary/Vary.js";
// import compiler from "./compiler.js";


export default function main(elem, child, varyWrap, isCpt ) {
  /* brance: vary */
  if (isVary(child)) { 
    main(elem, child.get(false), child, isCpt); 
    return ;
  }
  /* brance: arr */
  if (child instanceof Array) { 
    // Feature: 子节点为数组且为动态的时 
    if (varyWrap) {
      child.forEach(cldItm=>{
        // elem.appendChild(cldItm);
        main(elem, cldItm, null, isCpt)
      })
      varyWrap.$mounted_run(...child);
      varyWrap.$add_set((p_v, n_v)=>{
        // let pNode = p_v[0].parentNode;
        let pNode = elem;
        pNode.innerHTML = '';
        // todo 待优化 
        n_v.forEach((i)=>{
          // pNode.appendChild(i);
          main(elem, i, null, isCpt); 
        })
        return [n_v];
      })
      return ;
    }
    
    child.forEach((cldItm,idx)=>{
      main(elem, cldItm, null, isCpt);
    })
    return ;
  }
  
  
  /* Result: undefind null */
  if (child === undefined || child === null) {
    deal_text(elem, '', varyWrap);
    return;
  }
  /* Result: text */
  if (typeof child === 'string' || typeof child === 'number' ) {
    child += '';
    deal_text(elem, child, varyWrap);
    return ;
  }
  /* Result: node */
  if (child instanceof Node) { 
    deal_node(elem, child, varyWrap);
    return ;
  }
  /* Result: other */
  console.warn('# todo child', elem, child);
  main(elem, child.toString(), null, isCpt);
}

function deal_text(elem, text, varyWrap){
  
  let txtNode = document.createTextNode(text);
  elem.appendChild(txtNode);
  
  if (varyWrap) {
    varyWrap.$mounted_run(text);
    varyWrap.$add_set((p_v, n_v)=>{
      txtNode.textContent = n_v;
      return [n_v];
    }, txtNode)
  }
  
} 
function deal_node(elem, node, varyWrap){
  elem.appendChild(node);
  
  if (varyWrap) {
    varyWrap.$mounted_run(node);
    varyWrap.$add_set((p_v, n_v)=>{
      let pNode = p_v.parentNode;
      pNode.removeChild(p_v);
      pNode.appendChild(n_v); 
      return [n_v];
    }, elem)
  }
} 







