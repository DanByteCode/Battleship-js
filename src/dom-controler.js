
export const $g = (i) => {
   return document.getElementById(i)
}
export const $t = (e, n) => {
   $g(e).textContent = n
}
export const $c = (t, e) => {
   const newElement = document.createElement(t)
   if(e != undefined){
      $g(e).append(newElement)
   }
   return newElement
}