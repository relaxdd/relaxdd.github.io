(function () {
  class Locality {
    /**
     * @returns {URLSearchParams}
     */
    static getSearchParams() {
      return new URL(window.location.href).searchParams;
    }

    /**
     * @param {string} key
     * @returns {string|null}
     */
    static getSearchParam(key) {
      return Locality.getSearchParams().get(key);
    }

    /**
     * @param {string[]} keys
     * @returns {Record<string, string|null>}
     */
    static getSearchParamByKeys(keys) {
      const obj = {};
      const searchParams = Locality.getSearchParams();

      for (const key of keys) {
        obj[key] = searchParams.get(key);
      }

      return obj;
    }

    /**
     * @param {string} key
     * @param {string} value
     */
    static setSearchParam(key, value = '') {
      const url = new URL(window.location.href);
      url.searchParams.set(key, value);
      window.history.replaceState('', '', url);
    }

    /**
     * @param {string} key
     */
    static deleteSearchParam(key) {
      const url = new URL(window.location.href);
      url.searchParams.delete(key);
      window.history.replaceState('', '', url);
    }
  }

  /*
   * ============================
   */

  /**
   * @param {number} began
   * @returns {string[]}
   */
  function generateAllowedYearsFrom(began) {
    const result = [];
    const nowYear = new Date().getFullYear();

    for (let i = began; i <= nowYear; i++) {
      result.push(String(i));
    }

    return result;
  }

  function generateYearFilterOptions(allowedYears) {
    const nodes = [];

    const $option = document.createElement('option');
    $option.setAttribute('value', '');
    $option.innerText = 'Year';
    nodes.push($option);

    for (const year of allowedYears) {
      const $option = document.createElement('option');
      $option.setAttribute('value', year);
      $option.innerText = year;
      nodes.push($option);
    }

    return nodes;
  }

  /*
   * ============================
   */

  function main() {
    const $wrapper = document.querySelector('#wrapper');
    const $initialProjects = document.querySelectorAll('#wrapper > li');
    const $yearFilter = document.querySelector('#date-filter');

    const allowed = {
      order: ['asc', 'desc'],
      orderby: ['name', 'date'],
      type: ['php', 'html', 'html_mobile', 'js', 'react'],
      year: generateAllowedYearsFrom(2019),
    };

    /*
     * ================= Sync =================
     */

    if ($yearFilter.querySelectorAll('option').length !== allowed.year.length + 1) {
      $yearFilter.innerHTML = '';
      $yearFilter.append(...generateYearFilterOptions(allowed.year));
    }

    /*
     * ================ Helpers ================
     */

    /**
     * @param {string[]} keys
     * @param {Record<string, string[]>} allowed
     * @returns {Record<string, string|null>}
     */
    function getClearedSearchParams(keys, allowed) {
      const clear = {};
      const values = Locality.getSearchParamByKeys(keys);

      for (const key in values) {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
          if (key in allowed && values[key] !== null && allowed[key].includes(values[key])) {
            clear[key] = values[key];
          } else {
            Locality.deleteSearchParam(key);
          }
        }
      }

      return clear;
    }

    /*
     * ================ Modules ================
     */

    function sortingProjects() {
      const $order = document.querySelector('#order');
      const $orderby = document.querySelector('#orderby');

      /**
       * @param {HTMLElement} li
       * @returns {number}
       */
      function extractTsFromDate(li) {
        const year = li.dataset?.['year'] ?? '';
        const month = li.dataset?.['month'] ?? '';

        if (!year) return 0;
        return new Date(year + (month ? `-${month}` : '')).getTime();
      }

      /**
       * @param {HTMLElement} li
       * @returns {string}
       */
      function extractInnerText(li) {
        return li.querySelector('a').innerText;
      }

      /**
       * @param {string} orderby
       * @param {string} order
       * @returns {void}
       */
      function insertFormState(orderby, order) {
        $order.value = order;
        $orderby.value = orderby;
      }

      /**
       * @param {string} orderby
       * @param {string} order
       * @returns {void}
       */
      function sortListItems(orderby, order) {
        if (!orderby) {
          $wrapper.innerHTML = '';
          $wrapper.append(...$initialProjects);
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

          $wrapper.innerHTML = '';
          $wrapper.append(...elements);
        }
      }

      /*
       * ===============================
       */

      window.addEventListener('load', () => {
        const initial = { order: $order.value, orderby: $orderby.value };
        const search = getClearedSearchParams(['order', 'orderby'], allowed);
        const merged = { ...initial, ...search };

        sortListItems(merged.orderby, merged.order);
        insertFormState(merged.orderby, merged.order);
      });

      $orderby.addEventListener('change', (e) => {
        sortListItems(e.target.value, $order.value);

        if (!e.target.value) Locality.deleteSearchParam('orderby');
        else Locality.setSearchParam('orderby', e.target.value);
      });

      $order.addEventListener('change', (e) => {
        sortListItems($orderby.value, e.target.value);

        if (!e.target.value || e.target.value === 'asc') {
          Locality.deleteSearchParam('order');
        } else {
          Locality.setSearchParam('order', e.target.value);
        }
      });
    }

    function filteringProjects() {
      const $filter = document.querySelector('#filters');
      const $typeFilter = document.querySelector('#type-filter');
      const $projects = document.querySelectorAll('#wrapper > li');

      /*
       * ============================
       */

      /**
       * @param {string} type
       * @param {string} year
       * @returns {void}
       */
      function insertFormState(type, year) {
        $typeFilter.value = type;
        $yearFilter.value = year;
      }

      /**
       * @param {string} type
       * @param {string} year
       * @returns {void}
       */
      function replaceState(type, year) {
        if (!type && !year) {
          for (const $project of $projects) {
            $project.style.removeProperty('display');
          }
        } else {
          for (const $project of $projects) {
            const years = $project.dataset?.['year'] ?? '';
            const types = $project.dataset?.['types'] ?? '';

            if (type && !types) continue;
            if (year && !years) continue;

            const parse = types.split(';');
            const display = (type ? parse.includes(type) : true) && (year ? years === year : true);

            if (display) $project.style.removeProperty('display');
            else $project.style.setProperty('display', 'none');
          }
        }
      }

      /*
       * ============================
       */

      window.addEventListener('load', () => {
        const initial = { type: $typeFilter.value, year: $yearFilter.value };
        const search = getClearedSearchParams(['type', 'year'], allowed);
        const merged = { ...initial, ...search };

        replaceState(merged.type, merged.year);
        insertFormState(merged.type, merged.year);
      });

      $typeFilter.addEventListener('change', (e) => {
        replaceState(e.target.value, $yearFilter.value);

        if (!e.target.value) Locality.deleteSearchParam('type');
        else Locality.setSearchParam('type', e.target.value);
      });

      $yearFilter.addEventListener('change', (e) => {
        replaceState($typeFilter.value, e.target.value);

        if (!e.target.value) Locality.deleteSearchParam('year');
        else Locality.setSearchParam('year', e.target.value);
      });

      $filter.addEventListener('reset', () => {
        replaceState('', '');
        insertFormState('', '');

        Locality.deleteSearchParam('type');
        Locality.deleteSearchParam('year');
      });
    }

    function toggleProjectSections() {
      const $headers = document.querySelectorAll('.projects_section__header');

      for (const header of $headers) {
        header.addEventListener('click', function (e) {
          const $article = e.target.closest('.projects_section');
          if (!$article) return;

          if (!$article.hasAttribute('data-hidden')) {
            $article.setAttribute('data-hidden', '');
          } else {
            $article.removeAttribute('data-hidden');
          }
        });
      }
    }

    /*
     * ============= Initialization =============
     */

    sortingProjects();
    filteringProjects();
    toggleProjectSections();
  }

  /*
   * ============================
   */

  main();
})();
