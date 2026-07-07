// Mobile menu toggle
document.addEventListener('click', function(e){
  var b = e.target.closest('.burger');
  if(b){
    var links = document.querySelector('.nav-links');
    if(links) links.classList.toggle('open');
  }
});

// Mark current nav link active
(function(){
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function(a){
    var href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
})();
