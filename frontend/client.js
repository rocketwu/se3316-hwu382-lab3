var itemList;

function load(){
    setInterval(getAllItem,2000);
}

function createItem(){
    let iName=document.querySelector('#createName').value;
    let iPrice=Number(document.querySelector('#createPrice').value);
    let iTax=Number(document.querySelector('#createTax').value);
    
    let detail="name="+iName+"&price="+iPrice+"&tax="+iTax;
    
    fetch('https://se3316-hwu382-lab3-hwu382.c9users.io/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: detail
    }).then(res=>{
        return res.json();
        
    }).then(myJson=>{
        alert(myJson.message);
    });
    getAllItem();
}

function getAllItem(){
    let request = new Request('https://se3316-hwu382-lab3-hwu382.c9users.io/carts')
    fetch(request).then((res)=>res.json()).then((data)=>{
        itemList=data;
        updateUI();
    });
}

function deleteItem(){
    let obj=document.querySelector('#itemToDelete'),
        id=obj.options[obj.selectedIndex].value,
        url='https://se3316-hwu382-lab3-hwu382.c9users.io/carts/'+id;
    
    fetch(url,{method:"DELETE"}).then(res=>{
        return res.json();
        
    }).then(myJson=>{
        alert(myJson.message);
    });
    
    getAllItem();
}

function findItem(){
    let obj=document.querySelector('#itemToFind'),
        id=obj.options[obj.selectedIndex].value,
        url='https://se3316-hwu382-lab3-hwu382.c9users.io/carts/'+id;
    
    fetch(url).then((res)=>res.json()).then((d)=>{
        let pNode=document.querySelector('#singleItem'),
        childs=pNode.childNodes,
        size=childs.length;
        for (let i = 0; i < size; i++) {
            pNode.removeChild(childs[0]);
        }
        let n=createNode('p'),
                p=createNode('p'),
                t=createNode('p'),
                q=createNode('p'),
                node=createNode('div');
        n.innerHTML='name: ' + d.name;
        p.innerHTML='price: ' + d.price;
        t.innerHTML='tax: ' + d.tax;
        q.innerHTML='quantity: ' + d.quantity;
        append(node,n);
        append(node,p);
        append(node,t);
        append(node,q);
        append(pNode,node);
        
    });
}

function quantityItem(){
    let obj=document.querySelector('#itemToQuantity'),
        q=Number(document.querySelector('#updateQ').value),
        id=obj.options[obj.selectedIndex].value,
        url='https://se3316-hwu382-lab3-hwu382.c9users.io/carts/'+id+'/quantity';
    
    fetch(url,{
        method:"PUT",
        body:"quantity="+q,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        
    }).then(res=>{
        return res.json();
        
    }).then(myJson=>{
        alert(myJson.message);
    });
    
    getAllItem();
}

function taxItem(){
    let obj=document.querySelector('#itemToTax'),
        q=Number(document.querySelector('#updateT').value),
        id=obj.options[obj.selectedIndex].value,
        url='https://se3316-hwu382-lab3-hwu382.c9users.io/carts/'+id+'/tax';
    
    fetch(url,{
        method:"PUT",
        body:"tax="+q,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
        
    }).then(res=>{
        return res.json();
        
    }).then(myJson=>{
        alert(myJson.message);
    });
    
    getAllItem();
}

function updateUI(){
    //update get all function
    {
        let pNode=document.querySelector('#allItem'),
            childs=pNode.childNodes,
            size=childs.length;
        for (let i = 0; i < size; i++) {
            pNode.removeChild(childs[0]);
        }
        itemList.map((d)=>{
            let n=createNode('p'),
                p=createNode('p'),
                t=createNode('p'),
                q=createNode('p'),
                node=createNode('div');
            addText(n,"Name: "+d.name);
            addText(p,"Price: "+d.price);
            addText(t,"Tax: "+d.tax);
            addText(q,"Quantity: "+d.quantity);
            append(node,n);
            append(node,p);
            append(node,t);
            append(node,q);
            append(node,createNode('hr'));
            append(pNode,node);
        });
    }
    
    //update select in delete
    {
        let cNode=document.querySelector('#itemToDelete'),
            pNode=cNode.parentNode;
        pNode.removeChild(cNode);
        cNode=createNode('select');
        cNode.setAttribute('id','itemToDelete');
        append(pNode,cNode);
        
        itemList.map((d)=>{
            let o=createNode('option');
            o.setAttribute('value',d._id);
            addText(o,d.name);
            append(cNode,o);
        });
    }
    
    //update select in get single
    {
        let cNode=document.querySelector('#itemToFind'),
            pNode=cNode.parentNode;
        pNode.removeChild(cNode);
        cNode=createNode('select');
        cNode.setAttribute('id','itemToFind');
        append(pNode,cNode);
        
        itemList.map((d)=>{
            let o=createNode('option');
            o.setAttribute('value',d._id);
            addText(o,d.name);
            append(cNode,o);
        });
    }
    
    //update select in quantity update
    {
        let cNode=document.querySelector('#itemToQuantity'),
            pNode=cNode.parentNode;
        pNode.removeChild(cNode);
        cNode=createNode('select');
        cNode.setAttribute('id','itemToQuantity');
        append(pNode,cNode);
        
        itemList.map((d)=>{
            let o=createNode('option');
            o.setAttribute('value',d._id);
            addText(o,d.name);
            append(cNode,o);
        });
    }
    
    //update select in tax update
        {
        let cNode=document.querySelector('#itemToTax'),
            pNode=cNode.parentNode;
        pNode.removeChild(cNode);
        cNode=createNode('select');
        cNode.setAttribute('id','itemToTax');
        append(pNode,cNode);
        
        itemList.map((d)=>{
            let o=createNode('option');
            o.setAttribute('value',d._id);
            addText(o,d.name);
            append(cNode,o);
        });
    }
}

  function createNode(element) {
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }
  
  function addText(element, data){
      let text=document.createTextNode(data);
      append(element,text);
  }