/** 可变量对象 
* @author  fsl 
* @time    时间值 
* -----------------------------
* @import   引入方式说明 
* @example  使用方式说明 
* -----------------------------
* @detail  
- 01 详细说明1 
* -----------------------------
* @todo  
- 1 代办事项1 
*/

/* 可变量类 
*/
export default class Vary {
  constructor(val, nId) {
    this.isAlive = true; 
    this._num_id = nId ?? NaN;
    this._value = val; 
    this._mounteds = [];
    this._sets = [];
    this._watchs = [];
  }
  
  /* 对外接口 */
  // 取值 
  get = ()=>{ return this._value; }
  get value(){ return this._value; }
  // 设值  
  set = (setHandle, isLazy=true)=>{
    if (!this.isAlive) { return Promise.reject('sleeping'); }
    
    let pre_v = this.get();
    let nxt_v = null;
    if (isLazy) { 
      nxt_v = setHandle(pre_v); 
      this._sets.forEach(setFn=>{ setFn(nxt_v, isLazy); });
    }
    else {
      this._sets.forEach(setFn=>{ 
        nxt_v = setFn(setHandle, isLazy)[0]; 
      });
    }
    this._value = nxt_v;
    this._watchs.forEach( watchFn=>{
      watchFn(pre_v, nxt_v);
    })
    return Promise.resolve(nxt_v);
  }
  set value(val){ this.set(v=>val, true) }
  // 收集渲染后执行的函数 
  mounted = (mountedHandle)=>{
    this._mounteds.push(mountedHandle);
  }
  // 收集更新时执行的函数 
  watch = (watchHandle)=>{
    this._watchs.push((p_v, n_v)=>{
      watchHandle(p_v, n_v);
    })
  }
  // 控制开关 
  on = ()=>{ this.isAlive = true; }
  off = (isDied=false)=>{ 
    if (isDied) {
      // todo 待优化 
      for(let key in this){
        this[key] = null; 
      };
    }
    else {
      this.isAlive = false; 
    }
  }  
  
  /* 工具方法 */
  // 收集更新 
  $add_set = (setRun, ...moreInfo)=>{
    this._sets.push((setVal, isLazy)=>{
      let pre_v = this.get();
      let nxt_v = setVal; 
      if (!isLazy) { nxt_v = setVal(pre_v, ...moreInfo); }
      let args = setRun(pre_v, nxt_v, ...moreInfo);
      return [nxt_v, ...args];
    });
  }
  // 执行初始化 
  $mounted_run = (...args)=>{
    this._mounteds.forEach((mountedFn,idx)=>{
      mountedFn(this.get(),...args);
    })
  }
}

/* 是否为可变量对象 
*/
export function isVary(val){
  return val instanceof Vary;
}

/* 使用可变量 
*/
let use_vary_num_id = 0; 
export function useVary(val){
  // console.log( use_vary_num_id );
  const varyVal = new Vary(val, use_vary_num_id++);
  return varyVal;
}

