import './css/style.css';
import { form, list, loadMore } from './js/refs';
import { fetchImg } from './js/apiService';
import galleryTmpl from './templates/gallery.hbs';
import * as basicLightbox from 'basiclightbox';

const state = {
  page: 1,
  query: '',
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver(onClickloadMore, options);

loadMore.style.visibility = 'hidden';

form.addEventListener('submit', onSubmitForm);
loadMore.addEventListener('click', onClickloadMore);
list.addEventListener('click', openModal);

async function onSubmitForm(e) {
  e.preventDefault();
  state.page = 1;
  if (!e.currentTarget.elements.query.value.trim()) {
    return;
  }
  loadMore.style.visibility = 'hidden';
  state.query = e.currentTarget.elements.query.value.trim();
  const data = await fetchImg(state.query, state.page);
  list.innerHTML = galleryTmpl(data);
  if (data.length > 11) {
    loadMore.style.visibility = 'visible';
  }
}

async function onClickloadMore() {
  state.page += 1;
  const data = await fetchImg(state.query, state.page);
  list.insertAdjacentHTML('beforeend', galleryTmpl(data));
  if (data.length > 12) {
    loadMore.style.visibility = 'hidden';
  }
  // list.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end',
  // });
  if (state.page === 2) {
    observer.observe(loadMore);
  }
}

function openModal(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  basicLightbox
    .create(
      `
    <img src="${e.target.dataset.src}" width="800" height="600">
`,
    )
    .show();
}
