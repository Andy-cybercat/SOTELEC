const mje = document.querySelector('#createUsermje')
document.querySelector('#createUser').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
	//console.log(data)
	llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/usuarios`,options)
	const res = await respuesta.json()
	res.success ?

mje.innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="success">
  
<strong>${res.data}</strong> 
<button type="button" class="btn-close" data-bs-dismiss="success" aria-label="Close"></button>

 </div>`
:
 mje.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert">
  
<strong>${res.data}</strong>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>

 </div>`
	console.log(res)
}