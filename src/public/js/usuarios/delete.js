const mje = document.querySelector('#deleteUserById')


const deleteUserById = async (id) => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/usuarios/${id}`,options)
	const res = await respuesta.json()
    console.log(res)
	res.success ?
mje.innerHTML =` <div class="alert alert-success alert-dismissible fade show" role="alert">
<strong>${res.data}</strong>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

 :

mje.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
<strong>${res.data}</strong>
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
}