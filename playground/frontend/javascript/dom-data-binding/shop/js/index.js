/**
 * 商品排序主实现
 * - 通过异步请求加载数据
 * - 同一列重复点击切换升/降序；切换列时从升序开始
 * - 排序后使用 DocumentFragment 批量移动节点，减少页面更新次数
 */
(function () {
  const listBox = document.getElementById('list');
  const linkList = Array.from(document.querySelectorAll('#header a'));
  let productData = [];
  let activeField = null;
  let direction = 1;

  function normalizeValue(value, field) {
    return field === 'time' ? Number(value.replace(/-/g, '')) : Number(value);
  }

  function renderProducts() {
    listBox.innerHTML = productData
      .map(
        ({ title, img, price, hot, time }) => `
          <li data-time="${time}" data-price="${price}" data-hot="${hot}">
            <a href="javascript:;">
              <img src="${img}" alt="${title}">
              <p title="${title}">${title}</p>
              <span>￥${price}</span><br>
              <span>上架时间：${time}</span><br>
              <span>热度：${hot}</span>
            </a>
          </li>`,
      )
      .join('');
  }

  function updateSortIndicator() {
    linkList.forEach((link) => {
      const isActive = link.dataset.field === activeField;
      link.querySelector('.up').classList.toggle('bg', isActive && direction === 1);
      link.querySelector('.down').classList.toggle('bg', isActive && direction === -1);
    });
  }

  function sortProducts(field) {
    if (activeField === field) {
      direction *= -1;
    } else {
      activeField = field;
      direction = 1;
    }

    const productList = Array.from(listBox.children);
    productList.sort((a, b) => {
      const left = normalizeValue(a.dataset[field], field);
      const right = normalizeValue(b.dataset[field], field);
      return (left - right) * direction;
    });

    const fragment = document.createDocumentFragment();
    productList.forEach((product) => fragment.appendChild(product));
    listBox.appendChild(fragment);
    updateSortIndicator();
  }

  function bindEvents() {
    linkList.forEach((link) => {
      link.addEventListener('click', () => sortProducts(link.dataset.field));
    });
  }

  function loadProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/product.json');
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        productData = JSON.parse(xhr.responseText);
        renderProducts();
      }
    };
    xhr.send();
  }

  bindEvents();
  loadProducts();
})();
