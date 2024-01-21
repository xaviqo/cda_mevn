const Cda = require('../models/Cda');
const cdaService = {};
const { log } = require('console');
const CDA_KEY = "cda";

cdaService.get = async (req, res) => {
    try {
        const cdaRs = await Cda.findOne({ cdaKey: CDA_KEY });

        if (cdaRs) {
            res.status(200).json({
                youtube: cdaRs.youtube,
                twitter: cdaRs.twitter,
                facebook: cdaRs.facebook
            });
        } else {
            res.status(404).json({
                code: 404,
                message: `No hay RRSS configuradas`,
                dateTime: new Date(),
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `Error al obtener la información de redes`,
            dateTime: new Date(),
        });
    }
};

cdaService.modify = async  (req,res) => {
    try {
        const { twitter, facebook, youtube } = req.body;

        const options = {
            upsert: true,
            new: true
        };
        const cdaRs = await Cda.findOneAndUpdate(
            { cdaKey: CDA_KEY },
            { $set: { cdaKey: CDA_KEY, twitter, facebook, youtube } },
            options
        );
        res.status(200).json({ message: "Información de redes actualizada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code: 500,
            message: `No se ha podido modificar la información de redes`,
            dateTime: new Date(),
        });
    }
}

module.exports = cdaService;