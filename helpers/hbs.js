module.exports = {

    stripTags : function(Input){
        //Pour l'éditeur de texte; fonction permettant de remplacer tous ces symboles par des ''.
        return Input.replace(/<(?:.|\n)*?>/gm,'');
    }
}