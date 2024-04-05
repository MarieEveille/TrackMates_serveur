const db = require('../../config/database.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// un cours à un chapitre et une ue à un cours du coup le select doit etre sur cours where id_e = 
//liste des cours
const courlist = async () => {
    const [rows] = await db.query('SELECT * FROM cours');
    if (rows.length > 0){
        return rows;
    }
    else {
        throw new Error('Aucun cours disponible');
    }
}

// cours par id 
const courById = async (id_study) => {
    const [rows] = await db.query('SELECT * FROM cours WHERE id_cours = ?' , [id_study]);
    if (rows.length > 0){
        return rows;
    }
    else {
        throw new Error('Aucun cours avec cet id');
    }
}

// ajouter un cours
const addcour = async (id_study,label,contenu,id_chapitre,role) => {
    try{
        if ((role !== 'administration') || (role !== 'enseignant')){
            throw new Error('Vous n avez pas les droits pour ajouter ce cours');
        }   
        else {
            await db.query('INSERT INTO cours(id_cours,label,contenu,id_chapitre) VALUES(?,?,?,?)', [id_study,label,contenu,id_chapitre]);
        }
    }
    catch (err) {
        console.error(err);
        throw new Error('erreur durant l ajout');
    }
}

// supprimer un cours
const deletecour = async (id_study,role) => {
    try{
        if ((role !== 'administration') || (role !== 'enseignant')){
            throw new Error('Vous n avez pas les droits pour supprimer ce cours');
        }
        else {
            await db.query('DELETE FROM cours WHERE id_cours = ?', [id_study]);
        }
    }
    catch (err) {
        console.error(err);
        throw new Error('erreur durant la suppression');
    }
}

// modifier un cours
const updatecour = async (id_study, label, contenu, id_chapitre,role) => {
    try {
        if ((role !== 'administration') || (role !== 'enseignant')){
            throw new Error('Vous n avez pas les droits pour modifier ce cours');
        }
        else {
            await db.query('UPDATE cours SET contenu = ?, label = ? WHERE id_cours = ? AND id_chapitre = ?', [contenu, label, id_study, id_chapitre]);
        }
    } catch (err) {
        console.error(err);
        throw new Error('Erreur durant la modification');
    }
}


module.exports = {
    courlist,
    courById,
    addcour,
    deletecour,
    updatecour
}