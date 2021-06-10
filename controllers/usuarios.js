const {response, request}= require('express');
const usuariosGet =(req=request, res=response) =>{
    const params=req.query;
    res.json({
        msg:'get API - controlador',
        query
    });
}
//const usuariosPatch =
const usuariosPost = (req, res=response) =>{
    const {nombre, edad}= req.body;
    res.json({
        msg:'post API - controlador',
        nombre, edad
    });
}
const usuariosDelete = (req, res=response) =>{
    res.json({
        msg:'delete API - controlador'
    });
}
const usuariosPut = (req, res=response) =>{
    const {id}=req.params;
    


    res.json({
        msg:'put API - controlador',
        id
    });
}
module.exports={
    usuariosGet,
    //usuariosPatch,
    usuariosPost,
    usuariosDelete,
    usuariosPut,

}