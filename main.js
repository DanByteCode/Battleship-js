(()=>{"use strict";function t(t=0,e="H"){let n=t,o=e,r=0,a=[];return{length:()=>n,hit:function(t){for(const o of a)if(n=t,(e=o.coord)[0]==n[0]&&e[1]==n[1]&&!o.hit)return o.hit=!0,r++,!0;var e,n;return!1},getHits:()=>r,itSunk:function(){return r>=n},addCoord:function(t){const e={coord:t,hit:!1};a.push(e)},getCoords:()=>a,getDir:()=>o}}function e(){let e=0;const n=function(t,e){const n=new Array(10);for(let t=0;t<10;t++)n[t]=new Array(10).fill(null);return n}();function o(t){const[e,o]=t;return n.at(e).at(o)}function r(t,e=1,o="V"){let[r,a]=t,i=0,s=0;const d=t=>{const e=a<9&&n[t][a+1],o=a>0&&n[t][a-1];return e||o},l=t=>{const e=r<9&&n[r+1][t],o=r>0&&n[r-1][t];return e||o};if("V"==o){i=r,s=r+e;const t=i>0&&n[i-1][a],o=s<10&&n[s][a];if(t||o)return!1;for(let t=i;t<s;t++)if(t>=10||n[t][a]||d(t))return!1}else if("H"==o){i=a,s=a+e;const t=i>0&&n[r][i-1],o=s<10&&n[r][s];if(t||o)return!1;for(let t=i;t<s;t++)if(t>=10||n[r][t]||l(t))return!1}return!0}return{shipsAvailable:()=>e>0,available:r,addShip:function(o,a=1,i="H"){if(r(o,a,i)){const r=new t(a,i);if("V"==i){const t=o[0],e=o[0]+a;for(let a=t;a<e;a++)n[a][o[1]]=r,r.addCoord([a,o[1]])}else if("H"==i){const t=o[1],e=o[1]+a;for(let a=t;a<e;a++)n[o[0]][a]=r,r.addCoord([o[0],a])}return e++,!0}return!1},getBoard:()=>n,getShip:o,receiveAttack:function(t){const o=n[t[0]][t[1]];let r=!1;return null!=o&&o.hit(t)&&(r=!0,o.itSunk()&&e--),r},shipCount:e,board:n,deleteShip:function(t){o(t).getCoords().forEach((t=>{n[t.coord[0]][t.coord[1]]=null})),e--},getShipCount:()=>e}}function n(t="",n=!1){let o=t;const r=new e,a=n,i=[];return{getName:()=>o,getShip:function(t){return r.getShip(t)},getBoard:()=>r,randomPlay:function(){let t=0,e=0;do{t=Math.floor(10*Math.random()),e=Math.floor(10*Math.random())}while(i.find((n=>n[0]==t&&n[1]==e))&&i.length<100);return i.push([t,e]),[t,e]},isArtificial:()=>a,setName:t=>{o=t},randomBuild:function(t){let e=0,n=0,o="H";for(let a=t.length-1;a>=0;a--)for(let i=0;i<t[a].stock;i++){do{e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random()),o=Math.floor(8*Math.random())%2==0?"V":"H"}while(!r.available([e,n],t[a].long,o));r.addShip([e,n],t[a].long,o)}},lastPlay:()=>i[i.length-1]}}function o(){let t={},e={},o={},a=new r(2,2,1,1),i=0;const s=()=>{o=o===t?e:t};function d(t){return o.getBoard().receiveAttack(t)?o.getBoard().getShip(t):(s(),!1)}return{init:function(r="Player 1",s="Player 2"){t=new n(r),e=new n(s),t.randomBuild(a),e.randomBuild(a),o=e,i=t.getBoard().getShipCount()},switchPlayer:s,play:d,getCurrentPlayer:()=>o.getName(),autoPlay:function(){return d(t.randomPlay())},getLastPlay:function(){return t.lastPlay()},isShip:function(e){return null!==t.getBoard().getShip(e)},addShip:function(e,n=a[pos].long,o=dir){return t.getBoard().addShip(e,n,o)},deleteShip:function(e){t.getBoard().deleteShip(e)},getBoard:function(){return t.getBoard()},getShipStatus:function(){return{initialShips:i,shipsPlayerOne:t.getBoard().getShipCount(),shipsPlayerTwo:e.getBoard().getShipCount()}},available:function(e,n,o){return t.getBoard().available(e,n,o)}}}function r(t,e,n,o){return[{name:"Frigate",long:2,stock:t},{name:"Destroyer",long:3,stock:e},{name:"Battleship",long:4,stock:n},{name:"War Cruiser",long:5,stock:o}]}const a=t=>document.getElementById(t),i=(t,e)=>{a(t).textContent=e},s=(t,e)=>{const n=document.createElement(t);return null!=e&&a(e).append(n),n};(new function(){const t=new o;let e=!1,n=[],r=!0,d=!0;function l(t,e=!1){for(let n=0;n<10;n++){const o=s("div",t);o.classList.add("row");for(let r=0;r<10;r++){const a=s("div");a.classList.add("box"),a.dataset.r=n,a.dataset.c=r,a.id=`${t}-r${n}-c${r}`,e?(u(a,n,r),h(a,n,r)):c(a,n,r),o.append(a),v()}}}function c(e,n,o){e.addEventListener("click",(()=>{if("box"==e.className&&r){const a=t.play([n,o]);if(f(e,a,"two"),!a){let e=!0;r=!1;const n=setInterval((()=>{e?(e=t.autoPlay(),f(p("one",t.getLastPlay()),e,"one")):(r=!0,clearInterval(n))}),300)}}}))}function u(o,r,a){const i=[r,a];o.addEventListener("dragstart",(o=>{"box ship"==o.srcElement.className&&d?(e=!0,n=t.getBoard().getShip(i),m(i),v()):(e=!1,o.preventDefault())})),o.addEventListener("dragenter",(e=>{const r=parseInt(o.dataset.r),a=parseInt(o.dataset.c),i=t.available([r,a],n.length(),n.getDir())?"selected":"bad";o.classList.add(i)})),o.addEventListener("dragleave",(()=>{o.classList.remove("selected"),o.classList.remove("bad")})),o.addEventListener("dragover",(t=>{t.preventDefault()})),o.addEventListener("dragend",(e=>{"none"==e.dataTransfer.dropEffect&&(t.addShip(n.getCoords()[0].coord,n.length(),n.getDir()),v())})),o.addEventListener("drop",(r=>{o.classList.remove("selected"),o.classList.remove("bad"),e&&(t.addShip(i,n.length(),n.getDir())||t.addShip(n.getCoords()[0].coord,n.length(),n.getDir()),v(),e=!1)}))}function h(o,r,a){const i=[r,a];o.addEventListener("click",(o=>{if("box ship"==o.srcElement.className&&d?(e=!0,n=t.getBoard().getShip(i),m(i)):e=!1,e){const e="H"==n.getDir()?"V":"H";t.addShip(i,n.length(),e)||t.addShip(n.getCoords()[0].coord,n.length(),n.getDir())}v(),e=!1}))}function f(t,e,n){if(e){if(t.classList.add("hit"),e.itSunk()){for(const t of e.getCoords())p(n,t.coord).classList.add("sunk");g()}}else t.classList.add("fail")}function g(){const e=t.getShipStatus();i("count-one",`${e.shipsPlayerOne}/${e.initialShips}`),i("count-two",`${e.shipsPlayerTwo}/${e.initialShips}`),e.shipsPlayerOne<1?(i("game-over","YOU LOSE"),a("modal").showModal()):e.shipsPlayerTwo<1&&(i("game-over","YOU WIN"),a("modal").showModal())}function p(t,e){return a(`board-${t}-r${e[0]}-c${e[1]}`)}function m(e){t.isShip(e)&&t.deleteShip(e)}function v(){const e=a("board-one").getElementsByClassName("box");for(let n=0;n<e.length;n++){const o=e[n],r=parseInt(o.dataset.r),a=parseInt(o.dataset.c);t.isShip([r,a])?(o.classList.add("ship"),o.classList.remove("warn"),o.setAttribute("draggable",!0)):(o.classList.remove("ship"),o.classList.remove("warn"),o.setAttribute("draggable",!1),!t.available([r,a],1)&&d&&o.classList.add("warn"))}}return{init:function(){t.init(),l("board-two"),l("board-one",!0),g(),a("btn").addEventListener("click",(()=>{a("initial").classList.add("hide"),a("player-two").classList.remove("hide"),d=!1,v()})),a("btn-new").addEventListener("click",(()=>{t.init(),e=!1,r=!0,d=!0,a("board-one").innerHTML="",a("board-two").innerHTML="",l("board-two"),l("board-one",!0),a("initial").classList.remove("hide"),a("player-two").classList.add("hide"),g(),v(),a("modal").close()}))}}}).init()})();