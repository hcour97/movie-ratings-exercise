let currentId = 0;
let moviesList = [];

$(function() {

$("#movies-form").on('submit', function(e) {
    e.preventDefault();
    let title = $('#movie-title').val();
    let rating = $('#movie-rating').val();


    let movieData = {title, rating, currentId}
    console.log(movieData);
    const HTMLtoAppend = createMovieDataHTML(movieData);
    currentId ++;

    moviesList.push(movieData);
    

    $("#movie-table").append(HTMLtoAppend);
    $('#movies-form').trigger(reset);
});

$("tbody").on("click", ".btn.btn-danger", function() {
    let removeIndex = moviesList.findIndex(movie => movie.currentId === +$(e.target).data("delIdx"));
    moviesList.splice(removeIndex, 1);
    $(e.target).closest("tr").remove();
});

$(".fas").on("click", function(e) {
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);
    
    $("#movie-table-body").empty();

    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    $(evt.target).toggleClass("fa-sort-down");
    $(evt.target).toggleClass("fa-sort-up");
});

function sortBy(array, keyToSortBy, direction) {
    return array.sort(function(a, b) {
      // since rating is a number, we have to convert these strings to numbers
      if (keyToSortBy === "rating") {
        a[keyToSortBy] = +a[keyToSortBy];
        b[keyToSortBy] = +b[keyToSortBy];
      }
      if (a[keyToSortBy] > b[keyToSortBy]) {
        return direction === "up" ? 1 : -1;
      } else if (b[keyToSortBy] > a[keyToSortBy]) {
        return direction === "up" ? -1 : 1;
      }
      return 0;
    });
}

function createMovieDataHTML(data) {
    return `
      <tr>
        <td>${data.title}</td>
        <td>${data.rating}</td>
        <td>
          <button class="btn btn-danger" data-delete-id=${data.currentId}>
            Delete
          </button>
        </td>
      <tr>
    `;
}})
