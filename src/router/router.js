
import { Router, } from "../../fd_libs/index.js";


export default new Router({
  routes: {
    '/': {
      component: ()=>import('../views/layout/layout.js'),
      isCache: true, // bol|fn,是否缓存 
    },
  },
  root: document.querySelector("#app"),
})


