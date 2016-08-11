fetch('/api', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hello',
    login: 'World',
  })
})
.then((response)=>{
    //return response.json();
    return response.text();
})
.then((text)=>{
    console.log(text)
});