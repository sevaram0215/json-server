 let form=document.getElementById(
    "form"
 )

// let name = document.getElementsById("name");
// let email = document.getElementsById("email");
// let photo = document.getElementById("photo");
let btn = document.getElementById("btn");

let cont = document.getElementById("cont");
let state = false;
let currentId = null;
let arr = [];
async function postData() {
  let obj = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    photo: document.getElementById("photo").value,
  };
  try {
    let res = await axios.post("http://localhost:8080/user", obj);
    alert("submitted");
  } catch (error) {
    console.log("error");
  }
}

async function getData() {
  try {
    let res = await axios.get("http://localhost:8080/user");
    console.log(res.data);
    arr = res.data;
    displyData(arr);
  } catch (error) {
    console.log(error);
  }
}
getData();


async function deletData(id){
    try{
        let res = await axios.delete(`http://localhost:8080/user/${id}`)
        alert("deleted")
        getData()
    }
    catch(error){
        console.log(error)
    }

}

function displyData(data) {
  cont.innerHTML = "";
  data.map((ele) => {
    let div = document.createElement("div");
    div.id="card_div"
    let name = document.createElement("h2");
    name.innerText = ele.name;
    let email = document.createElement("h3");
    email.innerText = ele.email;
    let photo =document.createElement("img")
    photo.src=ele.photo;
    let btn=document.createElement("button")
    btn.id="edit"
    btn.innerText="Edit"
    btn.addEventListener("click",()=>{
        getDataforEdit(ele)
    });
    let del= document.createElement("button")
    del.id="delet"
    del.innerText="Delete"
    del.addEventListener("click",()=>{
        deletData(ele.id)
    });

    div.append(photo,name,email,btn,del);
    cont.append(div);
  });
}
displyData(arr);

function getDataforEdit(data){
    let obj={
        name: document.getElementById("name").value=data.name,
        email: document.getElementById("email").value=data.email,
        photo: document.getElementById("photo").value=data.photo,

    };
    btn.innerText="update";
    state =true;
    currentId=data.id
}
async function updateData(){
    let updateobj={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        photo: document.getElementById("photo").value,
    };
    try {
        let res =await axios.patch(`http://localhost:8080/user/${currentId}`,updateobj);
        state=false
    }
    catch (err) {
        console.log(err);
    }

}
btn.addEventListener("click",()=>{
    if(state===true){
        updateData()}
        else{
            postData()
        }
});
// btn.addEventListener("click", postData);
