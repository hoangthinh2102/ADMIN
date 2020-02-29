$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });
  
async function loadDocucments () {
  let results = await firebase
  .firestore()
  .collection('documents')
  // .where('users','array-contains', currentEmail)
  .get();
let documents = transformDocs(results.docs);
//console.log(documents);
return documents;
}
// let a = loadDocucments()
 

function transformDocs(docs) {
  let datas = [];
  for (let doc of docs) {
      let data = doc.data();
      data.id = doc.id;
      datas.push(data)
  }
  return datas
}

async function displaySanPham(id) {
  // var group = [];
  // for (let i = 0; i < array.length; i++) {
  //   const element = array[index];
    
  // }
  let array = await loadDocucments()
  
  var s = "";
  let itemCount = Math.ceil(array.length / 3);
  for (let i = 0; i < itemCount; i++) {
      s += `<div class="row">`
      for (let j = i * 3; j < i * 3 + 3; j++)
          if (j < array.length) {
              const element = array[j];
              
              
              s += `<div class="col-sm-4" style="padding: 10px">
                  <div class="card" style="rem" >
                      <img   src="${element.image}" alt="${element.name}" style="width:100%; height:15rem">
                      <div class="card-body">
                          <h4  class="card-title" >${element.name}</h4>
                          <p class="cost" >${numberWithCommas(element.price)}đ</p>
                          
                          <button type="button" class="btn btn-primary" id="status">${element.sellStatus}</button>
                          
                      </div>
                  </div>
              </div>`
          }
      s += "</div>"
          
          
      
  }
  document.getElementById(id).innerHTML = s;
  //console.log(1);
  
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function displayProfile(id) {
  let a = await loadDocucments()
  let s = "";

  for (let i = 0; i < a.length; i++) {
    const element = a[i];
   
  s+= `
  <tr>
        <th scope="row">${i + 1}</th>
        <td>${element.createdAt}</td>
        <td>${element.price}Đ</td>
        <td>${element.name}</td>
        <td>${element.owner.name}</td>
        </tr>
      

  `
    
    

  }
  
  document.getElementById(id).innerHTML = s
  
}

// async function check() {
//   let a = await loadDocucments();
//   for (let i = 0; i < a.length; i++) {
//     const element = a[i];
    
    
    
//     if (element.sellStatus == 'selling') {
//       let x = document.getElementById("status");
//       x.style.backgroundColor = 'red'
//     }
    
//   }
// }








