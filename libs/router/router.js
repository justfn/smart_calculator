
import { render, } from "../index.js";

export default class Router {
  constructor(routeOptions = {}){ 
    const {
      routes = {},
      root = document.body,
    } = routeOptions;
    this.$routes = [];
    this.$route_map = this._dealRoutes(routes);
    this._root = root; 
    this._cached_routes = {
      // <path>: <Page>
    };
    
    this._hashchangeListener({
      newURL: window.location.href, 
    })
    window.addEventListener("hashchange", this._hashchangeListener);
  }
  
  $update_cache = (path, isCache)=>{
    
  }
  
  _dealRoutes = (routes, routeMap={}, prefix='' )=>{
    for(let pathKey in routes){
      let pathOption = routes[pathKey];
      if ( !/^\//.test(pathKey) ) {
        pathKey = `${prefix}/${pathKey}`;
      }
      routeMap[pathKey] = pathOption;
      this.$routes.push({
        ...pathOption,
        path: pathKey,
      })
      let children = pathOption.children;
      if (children) {
        this._dealRoutes(children, routeMap, pathKey)
      }
    };
    return routeMap;
  }
  _hashchangeListener = (evt)=>{
    // console.log(location.hash);
    // console.log(evt);
    // evt.oldURL: "http://0.0.0.0:9000/#/home"
    // evt.newURL: "http://0.0.0.0:9000/#/tic_tac_toe"
    if (evt.oldURL) {
      let oldPathObj = this._getHashPathObj(evt.oldURL);
      let oldPathOption = this.$route_map[oldPathObj.path] ?? {};
      
      if (oldPathOption.isCache) {
        this._cached_routes[oldPathObj.path] = this._root.lastElementChild;
        // console.log( '缓存html', this._root.lastElementChild );
      }
    }
    
    let pathObj = this._getHashPathObj(evt.newURL);
    if (!pathObj.path) {
      window.location.hash = '/'
      return ;
    }
    
    let pathOption = this.$route_map[pathObj.path] ?? {};
    Promise.resolve( this._cached_routes[pathObj.path] )
    // 先读缓存 
    .then((htmlNode)=>{
      if (htmlNode) { 
        this._root.innerHTML = '';
        // console.log('加载缓存', htmlNode);
        render( htmlNode, this._root );
        return Promise.reject();
      }
      
      if (!pathOption.component) { return Promise.reject(); }
      
      return pathOption.component(); 
    })
    // 再读缓存 
    .then((module)=>{
      let Cpt = module.default;
      this._root.innerHTML = '';
      render( <Cpt />, this._root )
    })
    .catch((err)=>{
      if (err) { console.log(err); }
    })
  }
  _getHashPathObj = (fullUrl)=>{
    let result = {
      path: '',
      query: {},
      hash: '',
    }
    let hash = fullUrl.split('#')[1];
    if (!hash) { return result; }
    
    let [path, queryMore] = hash.split('?');
    result.path = path;
    if ( queryMore ) {
      let [ query, hash ] = queryMore.split('#');
      query.split('&').forEach((itm,idx)=>{
        let [key, val] = itm.split('=')
        result.query[key] = val ?? '';
      })
      if (hash) {
        result.hash = hash;
      }
    }
    
    return result;
  }
}


















