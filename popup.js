fetch('http://www.example.com?par=0').then(r => r.text()).then(result => {
  console.log(result)
})