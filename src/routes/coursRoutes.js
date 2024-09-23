const express = require('express');
const router = express.Router();
const {handleValidationErrors, validateField, exceptionField} = require('../middlewares/sanitizeInput');
const {verifyTokenBlacklist, verifyAuthorisation, verifyIsTeacher } = require('../middlewares/verifyAuthorisation');
const {verifyOwner} = require('../middlewares/verifyAuthorisation');
const {ueConfig} = require('../middlewares/objectConfig.js');
const { courlist, courById, addcours, updatecours, deletecours, ChapitreById } = require('../controllers/cours-controllers');

router.post('/allcours-chapitre',[validateField('id_chapitre'), handleValidationErrors, verifyAuthorisation, verifyTokenBlacklist] , courlist); // les etudiants peuvent voir les cours
router.post('/cours-id',[validateField('id_study'), handleValidationErrors, verifyAuthorisation, verifyTokenBlacklist], courById);
router.post('/getChapitreById', [validateField('id_chapitre'), handleValidationErrors, verifyAuthorisation, verifyTokenBlacklist], ChapitreById);

router.post('/add-cours', [exceptionField('contenu', 'label',), validateField('id_study','id_chapitre'), handleValidationErrors, verifyAuthorisation,verifyTokenBlacklist, verifyIsTeacher], addcours);
router.post('/update-cours',[exceptionField('contenu', 'label'), validateField('id_study'), handleValidationErrors, verifyAuthorisation, verifyTokenBlacklist, verifyIsTeacher, verifyOwner(ueConfig,"id_study")], updatecours); // reservé au créateur
router.post('/delete-cours',[validateField('id_study'), handleValidationErrors, verifyAuthorisation, verifyTokenBlacklist, verifyIsTeacher, verifyOwner(ueConfig,"id_study")], deletecours);// reservé au créateur

module.exports = router;
