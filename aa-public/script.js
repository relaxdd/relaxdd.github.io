(function () {
  const wrapper = document.querySelector('#wrapper');
  const initialProjects = document.querySelectorAll('#wrapper > li');

  /*
   * ============================
   */

  function sortingProjects() {
    const order = document.querySelector('#order');
    const orderby = document.querySelector('#orderby');

    function extractTsFromDate(li) {
      const year = li.dataset?.['year'] ?? '';
      const month = li.dataset?.['month'] ?? '';

      if (!year) return 0;
      return new Date(year + (month ? `-${month}` : '')).getTime();
    }

    function extractInnerText(li) {
      return li.querySelector('a').innerText;
    }

    function sortListItems(orderby, order) {
      if (!orderby) {
        wrapper.innerHTML = '';
        wrapper.append(...initialProjects);
      } else {
        const projects = document.querySelectorAll('#wrapper > li');
        const elements = [...projects];

        elements.sort((a, b) => {
          switch (true) {
            case orderby === 'date' && order === 'asc':
              return extractTsFromDate(a) - extractTsFromDate(b);
            case orderby === 'date' && order === 'desc':
              return extractTsFromDate(b) - extractTsFromDate(a);
            case orderby === 'name' && order === 'asc':
              return extractInnerText(a).localeCompare(extractInnerText(b));
            case orderby === 'name' && order === 'desc':
              return extractInnerText(b).localeCompare(extractInnerText(a));
            default:
              return 0;
          }
        });

        wrapper.innerHTML = '';
        wrapper.append(...elements);
      }
    }

    window.addEventListener('load', () => {
      sortListItems(orderby.value, order.value);
    });

    orderby.addEventListener('change', (e) => {
      sortListItems(e.target.value, order.value);
    });

    order.addEventListener('change', (e) => {
      sortListItems(orderby.value, e.target.value);
    });
  }

  function filteringProjects() {
    const filter = document.querySelector('#filters');
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
  }

  function toggleProjectSections() {
    const headers = document.querySelectorAll('.projects_section__header');

    for (const header of headers) {
      header.addEventListener('click', function (e) {
        const article = e.target.closest('.projects_section');
        if (!article) return;

        if (!article.hasAttribute('data-hidden')) {
          article.setAttribute('data-hidden', '');
        } else {
          article.removeAttribute('data-hidden');
        }
      });
    }
  }

  /*
   * ============================
   */

  sortingProjects();
  filteringProjects();
  toggleProjectSections();
})();
