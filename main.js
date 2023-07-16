var elMovies = document.querySelector('.movies');
var elTemp = document.querySelector('#temp').content;



var show = function(movies, method){
    elMovies.innerHTML = '';
    var fragment = document.createDocumentFragment();

    if(method === 'az'){
        movies.sort(function(m1, m2){
            if(m1.Title > m2.Title){
                return 1;
            } else {
                return -1;
            }
        });
    } else if(method === 'za'){
        movies.sort(function(m1, m2){
            if(m1.Title > m2.Title){
                return -1;
            } else {
                return 1;
            }
        });
    } else if(method === 'rt'){
        movies.sort(function(m1, m2){
            if(m1.imdb_rating > m2.imdb_rating){
                return -1;
            } else {
                return 1;
            }
        });
    }

    movies.forEach(function(movie){
        var clone = elTemp.cloneNode(true);
    
        clone.querySelector('.title').textContent = movie.Title;
        clone.querySelector('.sum-link').href += movie.imdb_id;
        clone.querySelector('.trailer').href += movie.ytid;
        clone.querySelector('.rating').textContent = movie.imdb_rating;
        clone.querySelector('.year').textContent += movie.movie_year;
    
        var ctgs = movie.Categories.split('|');
        ctgs.forEach(function(ctg){
            var li = document.createElement('li');
            li.textContent = ctg;
            clone.querySelector('.ctgs').appendChild(li);
        });
    
        fragment.appendChild(clone);
    });
    
    elMovies.appendChild(fragment);
}

show(movies.slice(0, 100), 'df');
// show(movies);


var cbaseold = [];

movies.forEach(function(movie){
	movie.Categories.split('|').forEach(function(category){
		cbaseold.push(category);
	})
});
// console.log(cbaseold);

var cbase = [];
cbaseold.forEach(function(c){
	if(cbase.indexOf(c) === -1){
		cbase.push(c);
	}
});
cbase.sort();

// yillarni chiqarish
var allyears = [];

movies.forEach(function(movie){
	allyears.push(movie.movie_year);
});

var years = [];

allyears.forEach(function(y){
	if(years.indexOf(y) === -1){
		years.push(y);
	}
});
years.sort(function(y1, y2){
	if(y1 > y2){
		return 1
	} else {
		return -1
	}
});


var elForm = document.querySelector('.form');
var elInput = document.querySelector('#nameinput');
var elSelect = document.querySelector('#categories');
var elSort = document.querySelector('#sort');
var elYears1 = document.querySelector('#startyear');
var elYears2 = document.querySelector('#endyear');


var fillSelect = function(collection, el){
	collection.forEach(function(x){
		var op = document.createElement('option');
		op.value = x;
		op.textContent = x;
		el.appendChild(op);
	})
}
fillSelect(cbase, elSelect);
fillSelect(years, elYears1);
fillSelect(years, elYears2);

elForm.addEventListener('submit', function(evt){
	evt.preventDefault();

	var nameKey = new RegExp(elInput.value, 'gi');
	var catKey = new RegExp(elSelect.value, 'gi');
	var sortMethod = elSort.value;

	var sMovies = movies.filter(function(m){
		return m.Title.toString().match(nameKey) && m.Categories.match(catKey) && m.movie_year >= elYears1.value && m.movie_year <= elYears2.value;		
	});

	show(sMovies, sortMethod);
});
