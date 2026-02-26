const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineSourcePlugin {
  constructor(options) {
    this.reg = options.match;
  }
  processTag (tag, compilation) {
    let newTag, url;
    // link标签也能加载json
    // 找到link script标签 （且判断引入文件后缀） 把文件内容放到innerHTML属性中
    console.log(tag.attributes);
    if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
      newTag = {
        tagName: 'style',
        attributes: {
          type: 'text/css'
        }
      }
      url = tag.attributes.href
    }

    if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
      newTag = {
        tagName: 'script',
        attributes: {
          type: 'application/javascript'
        }
      }
      url = tag.attributes.src
    }
    if (url) {
      newTag.innerHTML = compilation.assets[url].source()
      delete compilation.assets[url]
      return newTag;
    }
    return tag
  }
  processTags (data, compilation) {
    let headTags = [];
    let bodyTags = [];
    data.headTags.forEach((tag) => {
      headTags.push(this.processTag(tag, compilation));
    })
    data.bodyTags.forEach((tag) => {
      bodyTags.push(this.processTag(tag, compilation));
    })

    // 把新的tags返回
    return {
      ...data,
      headTags,
      bodyTags
    }
  }
  apply (compiler) {
    compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterAssetTagGroups', (data, cb) => {
        data = this.processTags(data, compilation)
        console.log(compilation.assets, 'compilation==');
        console.log(compilation, 'compilation==');

        cb(null, data)
      })
    })

  }
}

module.exports = InlineSourcePlugin