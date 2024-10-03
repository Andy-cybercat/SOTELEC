//Ruta para administrar usuarios
import {Router} from 'express'
const router = Router()

const folder = 'Usuarios'

const folder2 = 'login'
import UsuarioService from '../services/users.service.js'
const Usuario = new UsuarioService()
router.get('/login',async (req,res)=>{
    res.render(`${folder}/index`)
})
router.get('/create',async (req,res)=>{
    res.render(`${folder}/create`)
})


router.get('/edit/:id',async (req,res)=>{
    const id = req.params.id
    const usuario =  await Usuario.searchUsuario(id)
    res.render(`${folder}/edit`, {usuario})

})

router.get('/',async(req,res) => {
    try{
        
        const usuarios = await Usuario.getUsuarios()
        res.render('Usuarios/index',{usuarios})
    } catch(error) {

        console.log(error)
    }
})
router.post('/', async (req,res) => {
    try{
    const usuario = req.body
    const answer = await Usuario.storeUsuario(usuario)
    if(answer.length > 0){
        return res.status(200).json({success:true,data:"usuario registrado con éxito"})
    }else{
        return res.status(400).json({success:false,data:"No se pudo realizar el registro"})
    }
}catch(err){
    return res.status(400).json({success:false,data:"error al registrar usuario"})
    }

})
router.put('/:id', async (req,res) => {
    const id = req.params.id
    const {AREA,CORREOUSUARIO,NOMBREUSUARIO} = req.body
    const usuario = {AREA,CORREOUSUARIO,NOMBREUSUARIO}
    const answer = await Usuario.updateUsuario(id,usuario)
    if(answer > 0){
        return res.status(200).json({success:true,data:"se a actualizado el usuario con exito"})
    }else{
        return res.status(400).json({success:false,data:"No se a podido actualizar el usuario"})
    }
})
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const answer = await Usuario.deleteUsuario(id)
    if(answer > 0){
        return res.status(200).json({success:true,data:"usuario eliminado con exito"})
    }else{
        return res.status(400).json({success:false,data:"No se pudo eliminar el usuario"})
    }
})
router.get('/:id', async (req,res) =>{
    const id = req.params.id
    const answer = await Usuario.searchUsuario(id)
    if(answer.length > 0){
        return res.status(200).json({sucesss :true,data:answer})
    }else{
        return res.status(400).json({success:false,data:"No se encuentra el registro"})
    }
})

export default router