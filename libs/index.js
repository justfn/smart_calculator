/* 入口文件 
*/

import "./compiler/compiler.js";
import { useVary, } from "./vary/Vary.js";
import render from "./render.js";
import Router from "./router/router.js";

export {
  useVary,
  render,
  Router,
}
