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
                { text: 'JS&Node.js', link: '/JavaScript/' },
                { text: '后端服务', link: '/service/' },
              ] 
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://github.com/sxfenglei' },
        ],
        sidebar: 'auto'
    }
}
