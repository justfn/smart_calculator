// import compiler from "./compiler/index.js";

export default function render(fEl, elWrap){
  let elem = fEl; 
  // if (typeof fEl === 'function') { elem = fEl(); }
  
  // const elem = compiler(fEl);
  elWrap.appendChild(elem);
} 



