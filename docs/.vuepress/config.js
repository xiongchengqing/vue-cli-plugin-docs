const path = require('path')
const docs = require('./docs')

module.exports = {
    title: '公共组件库',
    description: '华图前端公共组件库',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    themeConfig: {
        sidebar: [
            {
                title: '组件介绍',
                collapsable: false,
                children: [
                  '/'
                ]
            }
        ]
    },
    // abspath here
    plugins: [
        [ 
            '@vuepress/register-components', 
            {
                componentsDir: path.join(__dirname, '/parts')
            }
        ],
        [ 
            docs,
            {

            }
        ]
    ]
}