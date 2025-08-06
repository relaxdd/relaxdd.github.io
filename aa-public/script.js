(function () {
  const filter = document.querySelector('.filters');
  const typeFilter = document.querySelector('#type-filter');
  const yearFilter = document.querySelector('#date-filter');
  const projects = document.querySelectorAll('#wrapper > li');

  function replaceState(type, year) {
    if (!type && !year) {
      for (const project of projects) {
        project.style.removeProperty('display');
      }
    } else {
      for (const project of projects) {
        const years = project.dataset?.['year'] ?? '';
        const types = project.dataset?.['types'] ?? '';

        if (type && !types) continue;
        if (year && !years) continue;

        const parse = types.split(';');
        const display = (type ? parse.includes(type) : true) && (year ? years === year : true);

        if (display) project.style.removeProperty('display');
        else project.style.setProperty('display', 'none');
      }
    }
  }

  window.addEventListener('load', () => {
    replaceState(typeFilter.value, yearFilter.value);
  });

  typeFilter.addEventListener('change', (e) => {
    replaceState(e.target.value, yearFilter.value);
  });

  yearFilter.addEventListener('change', (e) => {
    replaceState(typeFilter.value, e.target.value);
  });

  filter.addEventListener('reset', () => {
    typeFilter.value = '';
    yearFilter.value = '';

    replaceState('', '');
  });
})();
