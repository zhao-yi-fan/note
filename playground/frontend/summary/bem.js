function gen (name, mods) {
  if (!mods) {
    return '';
  }
  if (typeof mods === 'string') {
    return ` ${name}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + gen(name, item), '');
  }
  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? gen(name, key) : ''),
    ''
  );
}
function createBEM (name) {
  return function (el, mods) {
    if (el && typeof el !== 'string') {
      mods = el;
      el = '';
    }
    el = el ? `${name}__${el}` : name;
    return `${el}${gen(el, mods)}`;
  };
}

/**
 * bem helper
 * createBEM('button')() // 'button'
 * createBEM('button')('text') // 'button__text'
 * createBEM('button')({ disabled }) // 'button button--disabled'
 * createBEM('button')('text', { disabled }) // 'button__text button__text--disabled'
 * createBEM('button')(['disabled', 'primary']) // 'button button--disabled button--primary'
 */

// console.log(createBEM('btn')()); // 'btn'
// console.log(createBEM('btn')('disabled')); // 'btn__disabled'
// console.log(createBEM('btn')('a')); // 'btn__a'
