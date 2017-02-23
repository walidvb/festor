function setLocalStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

(() => {
  let favouriteFilter;
  let favourites = getLocalStorage('favourites') || [];
  $(document).on('click touch', '.favourite-trigger', (e) => {
    console.log(e);
    const id = $(e.target).parents('[data-id]').data('id');
    toggleFav(id);
  });
  $(document).on('turbolinks:load ready', () => {
    favouriteFilter = $('.filters .favourite');
    favouriteFilter.data('value', favourites);
    favourites.forEach((elem) => $(`[data-id="${elem}"]`).addClass('fav'))
  });

  function toggleFav(id){
    console.log(id);
    if(!favourites.includes(id)){
      favourites.push(id);
    }
    else{
      const index = favourites.indexOf(id);
      favourites.splice(index, 1);
    }
    $(`[data-id="${id}"]`).toggleClass('fav');
    favouriteFilter.data('value', favourites)
    setLocalStorage('favourites', favourites);
  }
})();
