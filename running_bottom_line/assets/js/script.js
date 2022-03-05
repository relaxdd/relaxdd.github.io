const tabPanelClass = "run-line__content-block";
const tabNavBtns = document.querySelectorAll(".run-line__nav-btn");
const tabPanelList = document.querySelectorAll(`.${tabPanelClass}`);
const tabNavLine = document.querySelector(".run-line__nav-emphasis");

const changeVisibleTab = (target) => {
  const currentPanel = target.getAttribute("aria-controls");

  for (let i = 0; i < tabNavBtns.length; i++) {
    tabNavBtns[i].setAttribute("aria-expanded", "false");

    if (tabPanelList[i].getAttribute("id") === currentPanel) {
      tabPanelList[i].classList.add(`${tabPanelClass}__visible`);
    } else {
      tabPanelList[i].classList.remove(`${tabPanelClass}__visible`);
    }
  }

  target.setAttribute("aria-expanded", "true");
};

const moveNavigationLine = (target) => {
  const targetWidth = target.getBoundingClientRect().width.toFixed(2);
  const posX = target.offsetLeft;
  const index = Array.from(target.parentNode.children).indexOf(target);

  tabNavLine.style.width = targetWidth + "px";
  tabNavLine.style.transform = `translateX(${posX}px)`;
  tabNavLine.setAttribute("data-offset", posX);
  tabNavLine.setAttribute("data-index", index);
};

const onMouseoverHandler = ({ target }) => {
  const posX = target.offsetLeft;
  const offset = +tabNavLine.getAttribute("data-offset");

  if (posX === offset) return false;

  const direction = posX > offset;
  const targetWidth = +tabNavLine.getBoundingClientRect().width.toFixed(2);
  const activeIndex = +tabNavLine.getAttribute("data-index");
  const remainsBtns = [...tabNavBtns].filter((_, i) =>
    (direction ? i >= activeIndex : i <= activeIndex)
  );
  const shiftIndex = direction
    ? remainsBtns.indexOf(target)
    : remainsBtns.reverse().indexOf(target);
  const newShift = Math.round((50 / (tabNavBtns.length - 1)) * shiftIndex);
  const newOffset = +(targetWidth * (newShift / 100)).toFixed(2);
  const finalShift = direction ? offset + newOffset : offset - newOffset;

  tabNavLine.style.transform = `translateX(${finalShift}px)`;
};

const onMouseLeaveHandler = () => {
  const offset = tabNavLine.getAttribute("data-offset");
  tabNavLine.style.transform = `translateX(${offset}px)`;
};

// Events Lintener
tabNavBtns.forEach((navBtn) => {
  navBtn.addEventListener("click", (e) => {
    changeVisibleTab(e.target);
    moveNavigationLine(e.target);
  });

  navBtn.addEventListener("mouseover", onMouseoverHandler);
  navBtn.addEventListener("mouseleave", onMouseLeaveHandler);
});

window.onload = () => {
  const activeTarget = [...tabNavBtns].filter((navBtn) => {
    return navBtn.getAttribute("aria-expanded") === "true";
  });

  moveNavigationLine(activeTarget[0]);
};

// const arr = [0, 1, 2, 3, 4, 5, 6];

// console.log(arr.filter((_, i) => {
//   return i <= 2;
// }));
