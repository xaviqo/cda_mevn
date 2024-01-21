const Actor = require('../models/Actor');
const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary');
const { log } = require('console');
const actorService = {};
const fs = require('fs');

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SEC
});

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/uploads'),
    filename: function (req, file, cb) {
        if (req.params.id && file){
            const filename = `${req.params.id}_${Date.now().toString().slice(-6)}.${file.originalname.split('.').pop()}`;
            cb(null, filename)
        }
    }})
;

const upload = multer({storage:storage});

actorService.upload = upload.single('cda_file');

actorService.create = async (req, res) => {
    try {
        const actor = new Actor(req.body);
        await actor.save();
        res.status(200).json({
            message: `Perfil de ${actor.name} creado con éxito`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido crear un nuevo perfil`,
            dateTime: new Date()
        });
    }
}

actorService.update = async (req,res) => {

    try {
        await Actor.updateOne(
            { _id : req.params.id },
            { $set: req.body }
        );
        res.status(200).json({
            message: `Perfil actualizado con éxito`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido actualizar el perfil`,
            dateTime: new Date()
        });
    }

}

actorService.uploadVideo = async (req,res) => {
    try {
        const video = {
            title: req.params.title.trim(),
            file: req.file.filename
        };
        await Actor.updateOne(
            { _id : req.params.id },
            { $push: { 'videos' : video }});
        res.status(200).json({
            message: `Perfil actualizado con éxito`
        });
    } catch (error) {
        console.error(error);
    }
}

actorService.uploadImage = async (req,res) => {
    try {
        const cloudinaryResponse = await cloudinary.v2.uploader.upload(req.file.path);

        // comprobar si el actor solo tiene una foto, entonces main = true
        const actor = await Actor.findById({ _id : req.params.id })
            .select({ 'photos': 1 });
        const firstImage = (actor.photos.length === 0);
        const photo = {
            main: firstImage,
            title: req.params.title.trim(),
            publicId: cloudinaryResponse.public_id,
            url: cloudinaryResponse.url,
            secureUrl: cloudinaryResponse.secure_url
        };

        await Actor.updateOne(
            { _id : req.params.id },
            { $push: { 'photos' : photo }});

        res.status(200).json({
            message: `Perfil actualizado con éxito`,
            firstImage: firstImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `Error: ${error.message}`,
            dateTime: new Date()
        });
    }
}

actorService.retrieveVideo = async (req,res) => {
    try {
        const videoFile = path.join(__dirname,'../public/uploads',req.params.idVideo);
        if (!fs.existsSync(videoFile)) {
            return res.status(404).json({ message: 'Video no encontrado' });
        }
        res.sendFile(videoFile);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido recuperar el vídeo solicitado`,
            dateTime: new Date()
        });
    }
}

actorService.retrieveVideos = async (req,res) => {
    try {
        const actor = await Actor.findById({ _id : req.params.id })
            .select({ 'videos': 1 });
        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido recuperar la experiencia del perfil`,
            dateTime: new Date()
        });
    }
}

actorService.retrieveImages = async (req,res) => {
    try {
        const actor = await Actor.findById({ _id : req.params.id })
            .select({ 'photos': 1 });
        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Error cargando las imágenes del actor",
            dateTime: new Date()
        });
    }
}

actorService.retrieveExperiences = async (req,res) => {
    try {
        const actor = await Actor.findById({ _id : req.params.id }).select({
            'background': 1,
        });

        actor.background.awards?.values.sort(sortByDate);
        actor.background.formation?.values.sort(sortByDate);
        actor.background.experience?.values.sort(sortByDate);

        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido recuperar la experiencia del perfil`,
            dateTime: new Date()
        });
    }
}

actorService.retrieveFullProfile = async (req,res) => {
    try {
        const actor = await Actor.findOne({
            name: { $regex: new RegExp(req.params.name.replace(/-/g, ' '), "i") },
            active: true
        });

        actor.background.awards?.values.sort(sortByDate);
        actor.background.formation?.values.sort(sortByDate);
        actor.background.experience?.values.sort(sortByDate);

        if (actor === null){
            res.status(404).json({
                code: 404,
                message: `El portfolio indicado no existe o no está activo`,
                dateTime: new Date()
            });
        } else {
            res.status(200).json(actor);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `Ha ocurrido un error recuperando el perfil indicado`,
            dateTime: new Date()
        });
    }
}

actorService.retrieveProfile = async (req,res) => {
    try {
        const actor = await Actor.findById({ _id : req.params.id }).select({
            'name': 1,
            'age': 1,
            'sex': 1,
            'height': 1,
            'hair': 1,
            'eyes': 1,
            'languages': 1,
            'skills': 1
        });
        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido recuperar el perfil`,
            dateTime: new Date()
        });
    }
}

actorService.retrieveSocial = async (req,res) => {
    try {
        const actor = await Actor.findById({ _id : req.params.id }).select({
            'media': 1,
        });
        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se han podido recuperar las redes sociales`,
            dateTime: new Date()
        });
    }
}

actorService.removeImage = async (req, res) => {
    try {
        const imageToRemove = req.params.imageId;
        const actor = await Actor.findById({ _id : req.params.id })
            .select({ 'photos': 1 });

        await Actor.updateOne(
            { _id : req.params.id },
            { $set: { 'photos':
                        actor.photos.filter( pht => {
                        return pht.publicId !== imageToRemove;
                    })}}
        );
        res.status(200).json({
            message: "Imagen eliminada"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Error eliminando imagen",
            dateTime: new Date()
        });
    }
}

actorService.changeMainImage = async (req, res) => {
    try {
        const newMainId = req.params.imageId;
        const actor = await Actor.findById({ _id : req.params.id })
            .select({ 'photos': 1 });
        actor.photos.forEach( pht => {
            if (pht.main) pht.main = false;
            if (pht.publicId == newMainId) pht.main = true;
        });
        await Actor.updateOne(
            { _id : req.params.id },
            { $set: actor }
        );
        res.status(200).json({
            message: "Imagen principal cambiada"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Error cambiando la imagen principal",
            dateTime: new Date()
        });
    }
}

actorService.delete = async (req,res) => {
    try {
        const actor = await Actor.findByIdAndRemove({ _id : req.params.id });
        res.status(200).json({
            message: `Perfil de ${actor.name} eliminado con éxito`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido eliminar el perfil`,
            dateTime: new Date()
        });
    }
}

actorService.changeStatus = async (req,res) => {
    try {
        const actor = await Actor.findById({ _id : req.params.id });
        actor.active = !actor.active;
        await actor.save();
        res.status(200).json({
            message: `Perfil de ${actor.name} ${actor.active?'activado':'desactivado'}`,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido cambiar el estado del perfil`,
            dateTime: new Date()
        });
    }
}

actorService.gallery = async (req, res) => {
    try {
        let actorsQuery = Actor.find()
            .select({
                'name': 1,
                'photos': 1,
                'active': 1
            });

        if (!req.query.all) {
            actorsQuery = actorsQuery.where('active').equals(true);
        }

        // Ejecutar la consulta aquí antes de aplicar el mapeo
        const actors = await actorsQuery.exec();

        // Filtrar para que solo envíe fotos que son principales
        const filteredActors = actors.map(actor => {
            const filteredPhotos = actor.photos.filter(photo => photo.main);
            return {
                _id: actor._id,
                active: actor.active,
                name: actor.name,
                photo: filteredPhotos[0] ? filteredPhotos[0] : {
                    publicId: Date.now().toString(),
                    secureUrl: null,
                    url: null
                },
            };
        });

        res.status(200).json(filteredActors);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: "Error cargando galería de la base de datos",
            dateTime: new Date()
        });
    }
};


function sortByDate(a,b) {
    return parseInt(b.date) - parseInt(a.date);
}

module.exports = actorService;