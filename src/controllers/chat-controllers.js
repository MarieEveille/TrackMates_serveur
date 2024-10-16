const chatService = require('../services/chat-services');
const jwt = require('jsonwebtoken');
const {getIdUtilisateurFromToken} = require('../services/user-service');
const {getRoleUtilisateurFromToken} = require('../services/user-service');



// liste des messages

exports.messageList = (async (req,res) => {
    try {
        const messages = await chatService.messageList();
        res.status(200).send(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des messages');
    }
})

// messages par forum

exports.messageByForum = (async (req,res) => {
    try{
        const {id_forum} = req.body;
        const messages = await chatService.messageByForum(id_forum);
        res.status(200).send(messages);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des messages');
    }
})

// ajouter un message

exports.addMessage = (async (req,res) => {
    try{
        const {contenu,id_forum} = req.body;
        const id_etudiant = await getIdUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        await chatService.saveMessage(contenu,id_forum,id_etudiant);
        res.status(200).send('Ajout réussi');
    }
    catch (err){
        console.error(err);
        res.status(500).send('Echec de l ajout');
    }
})

// supprimer un message

exports.deleteMessage = (async (req,res) => {
    try{
        const {id_message} = req.body;
        const id_etudiant = await getIdUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        const role = await getRoleUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        await chatService.deleteMessage(id_message,role,id_etudiant);
        res.status(200).send('Suppression réussie');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression');
    }
})

// modifier un message

exports.updateMessage = (async (req,res) => {
    try{
        const {id_message,contenu,id_forum} = req.body;
        const id_etudiant = await getIdUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        await chatService.updateMessage(id_message,contenu,id_forum,id_etudiant);
        res.status(200).send('Modification réussie');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Echec de la modification');
    }
})

// liste des messages forums quizz

exports.messageListQuizz = (async (req,res) => {
    try {
        const id_quizz = req.body.id_quizz;
        const messages = await chatService.messageListQuizz(id_quizz);
        res.status(200).send(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des messages');
    }
})

// liste des messages forums cours

exports.messageListCours = (async (req,res) => {
    try {
        const id_cours = req.body.id_cours;
        const messages = await chatService.messageListCours(id_cours);
        res.status(200).send(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des messages');
    }
})

// liste des messages forums cours chapitre

exports.messageListCoursChapitre = (async (req,res) => {
    try {
        const {id_chapitre} = req.body;
        const messages = await chatService.messageListCoursChapitre(id_chapitre);
        res.status(200).send(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des messages');
    }
})

// liste des forums pour un cours donné

exports.forumListCours = (async (req,res) => {
    try {
        const {id_chapitre} = req.body;
        const forums = await chatService.forumListCours(id_chapitre);
        res.status(200).send(forums);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des forums');
    }
})

//liste des forums pour tous les chapitres

exports.forumListChapitre = (async (req,res) => {
    try {
        const forums = await chatService.forumListChapitre();
        res.status(200).send(forums);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des forums');
    }
})

// liste des forums pour un quizz donné

exports.forumListQuizz = (async (req,res) => {
    try {
        const {id_quizz} = req.body;
        const forums = await chatService.forumListQuizz(id_quizz);
        res.status(200).send(forums);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des forums');
    }
})

exports.forumList = (async (req,res) => {
    try {
        const {id_forum} = req.body;
        const forums = await chatService.forumList(id_forum);
        res.status(200).send(forums);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la récupération des forums');
    }
})

exports.addForumCours = (async (req,res) => {
    try {
        const {label,id_cours,contenu} = req.body;
        const id_etudiant = await getIdUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        const forum = await chatService.addForumCours(label,id_cours,contenu,id_etudiant);
        res.status(200).send(forum);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ajout');
    }
})

exports.addForumQuizz = (async (req,res) => {
    try {
        const id_utilisateur = await getIdUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        const {label,id_quizz,contenu} = req.body;
        const forum = await chatService.addForumQuizz(label,id_quizz,contenu,id_utilisateur);
        res.status(200).send(forum);
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ajout');
    }
})

exports.updateForum = (async (req,res) => {
    try {
        const {id_forum,label,etat} = req.body;
        const id_utilisateur = await getIdUtilisateurFromToken(req.headers.authorization.split(' ')[1]);
        await chatService.updateForum(id_forum,label,etat,id_utilisateur);
        res.status(200).send('Modification réussie');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la modification');
    }
})

exports.deleteForum = (async (req,res) => {
    try {
        const {id_forum} = req.body;
        await chatService.deleteForum(id_forum);
        res.status(200).send('Suppression réussie');
    } catch (err) {
        console.error(err);
        res.status(500).send('Echec de la suppression');
    }
})

exports.forumClose = (async (req,res) => {
    try{
        const {id_forum} = req.body;
        await chatService.forumClose(id_forum);
        res.status(200).send('Fermeture réussie');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Echec de la fermeture');
    }
})

exports.forumOpen = (async (req,res) => {
    try{
        const {id_forum} = req.body;
        await chatService.forumOpen(id_forum);
        res.status(200).send('Ouverture réussie');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Echec de l ouverture');
    }
})
