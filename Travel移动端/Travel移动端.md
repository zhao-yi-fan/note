master放整个项目所有功能最新的代码

index-swiper分支存放具体功能开发完成时的代码

企业中开发一个新功能测试没问题之后创建新的分支上传该功能的代码，再合并到整个项目中

- 创建新的分支
- `git pull`
- `git checkout [index-swiper]`切换到index-swiper分支
- `git add .`和`git commit -m ''`和`git push`之后
- `git checkout master`切换到主分支master
- `git merge origin/index-swiper`把线上index-swiper分支上新增的内容合并到本地的master分支
- `git push`把master新增的内容也提交到线上

## 轮播图

- `vue-awesome-swiper`

## 发送ajax

- `fetch`
- `axios` 推荐 在node服务器发送http请求 在浏览器端可以发送xhr请求
- `vue-resource`

## better-scroll



## localStorage

HTML5新API