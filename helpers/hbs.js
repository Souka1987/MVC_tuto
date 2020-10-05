module.exports = {

    stripTags: function (Input) {
        //Pour l'éditeur de texte; fonction permettant de remplacer tous ces symboles par des ''.
        return Input.replace(/<(?:.|\n)*?>/gm, '');
    },
    limit: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    }
}