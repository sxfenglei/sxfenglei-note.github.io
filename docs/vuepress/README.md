# vuepress在github上搭建bolg

> 2020.01.08 

## github

- 注册申请一个github账号，创建一个公开的Repository，Repository name建议写成"用户名-项目名.github.io"。
- 在github的用户setting中找到"SSH and GPG keys"配置自己的本地电脑ssh keys这样是为了方便git提交，不用每次都输入账号密码(其实就是免登陆)

## vuepress

1、本地创建项目目录并在项目目录内初始化npm
```shell
    mkdir myvuepress
    cd myvuepress
    npm init -y
```
2、本地项目添加远程github源(刚刚创建的那个git repository)
```shell
    git remote set-url --add origin https://github.com/sxfenglei/sxfenglei-note.github.io.git
```
3、项目安装vuepress并测试运行
```shell
    npm install -D vuepress
    mkdir docs
    echo '# Hello MyVuePress!' > docs/README.md
    npx vuepress dev docs #默认访问localhost:8080 如果可以访问说明成功了
```
4、package.json配置scripts
```shell
"scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
```
以后就直接运行npm run dev 或者npm run build即可。

5、搭建项目目录在docs目录中
```shell
├── docs
│   ├── .vuepress (自定义模板)
│   │   ├── public (静态资源))
│   │   ├── config.js (公共配置)
│   ├── README.md
```
6、配置默认首页
docs/README.md
```shell
---
home: true
heroImage: /img/note.png
actionText: Come on →
actionLink: /vuepress/
footer: MIT Licensed | Copyright © 2020 - sxfenglei
---
```
7、配置菜单和侧边栏
docs/.vuepress/config.js
```shell
module.exports = {
  base: 'sxfenglei-note.github.io',
	title: '学习笔记记录',
	description: '比我优秀的人都那么努力我还抱怨个屁，2020年开始学习记录笔记，生活即便如此也不能在懦弱的抱怨中逃避。',
	head: [
		['link', {rel: 'icon', href:'/img/favicon.ico'}],
		['link', {rel: 'manifest', href:'/manifest.json'}],
	],
	themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '笔记',
              items: [
                { text: 'Web前端', link: '/web/' },
                { text: 'vuepress搭建', link: '/vuepress/' },
              ] 
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://github.com/sxfenglei' },
        ],
        sidebar: 'auto'
    }
}

```

## 部署

1、在根目录创建deploy.sh
```shell
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
#git push -f git@github.com:sxfenglei/sxfenglei-note.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:sxfenglei/sxfenglei-note.github.io.git master:gh-pages

cd -

```

2、在根目录创建.travis.yml
```shell
anguage: node_js
node_js:
  - lts/*
install:
  - npm ci
script:
  - npm run build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

3、发布部署
```shell
    chmod +x deploy.sh
    ./deploy.sh
```

4、在GitHub中配置gitpages
进入刚才在GitHub上创建的项目，在项目 项目 项目的Settings中不是用的settings，勾选"Template repository",在GitHub Pages中就能看到网页访问地址。
刚才项目提交了gh-pages branch分支，所以在GitHub Pages的Source中需要选择gh-pages branch并保存。
访问https://sxfenglei.github.io/sxfenglei-note.github.io/