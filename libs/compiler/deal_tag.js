import { isVary, } from "../vary/Vary.js";
import deal_attrs from "./deal_attrs.js";



export default function main(tag, attrs, varyWrap){
  /* Vary */
  if (isVary(tag)) {
    // tag.$mounted_run();
    return main(tag.get(false), attrs, tag);
  }
  
  /* output 1: component */
  if (typeof tag === 'function') {
    // 注意：此处又将调用 compiler 
    let { elem, ...rest } = add_cpt_apis(tag, attrs);
    // Feature: 组件动态化 注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      let pNode = elem.parentNode;
      let pre_node = elem;
      let nxt_node = null;
      varyWrap.$add_set((p_v, n_v)=>{
        pNode = pNode ?? pre_node.parentNode;
        nxt_node = n_v(attrs, {
          mounted: (fn)=>{
          },
        })
        pNode.replaceChild(nxt_node, pre_node);
        pre_node = nxt_node;
        // 替换掉组件 
        return [n_v, pNode];
      })
    }
    
    return {
      elem: elem,
      isCpt: true, 
      ...rest,
    };
  }
  /* output 2: tagName 最终的出口 */
  if (typeof tag === 'string') {
    let elem = document.createElement(tag);
    // Feature: 标签名动态化,注意 变量名需大写否则jsx不处理  
    if (varyWrap) {
      let pNode = elem.parentNode;
      let pre_node = elem; 
      let nxt_node = null;
      varyWrap.$add_set((p_v, n_v, atrs)=>{
        // Feature_more: 设值为false的值，则直接删除该节点 
        if (!n_v) { 
          pre_node.parentNode.removeChild(pre_node);
          return [];
        }
        
        pNode = pNode ?? pre_node.parentNode;
        // console.log( pNode );
        nxt_node = document.createElement(n_v);
        deal_attrs(nxt_node, atrs, false)
        Array.prototype.forEach.call( [...pre_node.childNodes], (itm)=>{
          nxt_node.appendChild(itm);
        })
        pNode.replaceChild(nxt_node, pre_node);
        pre_node = nxt_node;
        return [n_v, pNode];
      }, attrs)
    }
    
    return {
      elem: elem,
      isCpt: false, 
    }
  }
  /* output 3: other todo */
  console.warn('# todo tag', tag, attrs, varyWrap);
}
function add_cpt_apis(cpt,attrs){
  let mountedFns = [];
  let elem = cpt(attrs, {
    // 搜集初始化执行操作 
    mounted: (fn)=>{
      mountedFns.push(fn)
    },
    // 提供插入富文本的能力 
    html(htmlStr){
      let div = document.createElement("div")
      div.innerHTML = htmlStr;
      return [...div.childNodes];
    },
  });
  return {
    elem,
    mountedFns,
  }
}



