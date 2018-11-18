module.exports = {
  if_eq: function(a, b, options){
    if (a === b) {
      return options.fn(this);
    }
    return options.inverse(this);
  },

  if_inside_array: function(value, array, options){
    if (array.indexOf(value) >= 0) {
      return options.fn(this);
    }
    return options.inverse(this);
  },
}
