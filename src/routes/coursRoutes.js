const express = require('express');
const router = express.Router();
const {validate, validateField} = require('../middlewares/sanitizeInput');
const {verifyTokenBlacklist, verifyAuthorisation, verifyIsTeacher } = require('../middlewares/verifyAuthorisation');
const {verifyIsAdministration} = require('../middlewares/verifyAuthorisation');
const {verifyOwner} = require('../middlewares/verifyAuthorisation');
const {coursConfig} = require('../middlewares/objectConfig.js');
const {ueConfig} = require('../middlewares/objectConfig.js');
const { courlist, courById, addcours, updatecours, deletecours } = require('../controllers/cours-controllers');

router.get('/allcours-chapitre',[validateField('id_chapitre'),verifyAuthorisation, verifyTokenBlacklist] , courlist); // les etudiants peuvent voir les cours
router.post('/cours-id',[validateField('id_study'), verifyAuthorisation, verifyTokenBlacklist], courById);

router.post('/add-cours', [validateField('id_study','label','contenu','id_chapitre'), verifyAuthorisation, verifyTokenBlacklist], addcours);
router.post('/update-cours',[validateField('id_study','label','contenu','id_chapitre'),verifyAuthorisation, verifyTokenBlacklist,verifyOwner(ueConfig,"id_study")], updatecours); // reservé au créateur
router.post('/delete-cours',[validateField('id_study'),verifyAuthorisation, verifyTokenBlacklist,verifyIsTeacher,verifyOwner(ueConfig,"id_study")], deletecours);// reservé au créateur

module.exports = router;
