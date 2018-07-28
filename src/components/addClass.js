export function addClass(){
var elements = document.getElementsByClassName("itemList");
console.log('element: ',elements)
for(var i = 0; i < elements.length; i++)
{
  elements[i].onclick = function(){
        
        // remove class from sibling
        
        var el = elements[0];
        while(el)
        {
            if(el.tagName === "DIV"){
                //remove class
                el.classList.remove("CommandListItem");
                
            }
            // pass to the new sibling
            el = el.nextSibling;
        }
        
      this.classList.add("CommandListItem");  
  };
}}