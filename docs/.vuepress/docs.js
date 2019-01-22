
module.exports = (options, ctx) => {
    return {
        name: 'vuepress-plugin-docs',

        enhanceDevServer(app) {
            console.log('app', app)
        },

        extendMarkdown(md)  {
            const name = 'demo'

            md.set({ breaks: true })
            md.use(require('markdown-it-container'), name, {
                validate(params) {
                    return params.trim().match(new RegExp(`^${name}\s+(.*)$`))
                },
                render(tokens, idx) {
                    const m = tokens[idx].info.trim().match(new RegExp(`^${name}\s+(.*)$`))

                    if (tokens[idx].nesting === 1) {
                        // opening tag
                        return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';

                    } else {
                        // closing tag
                        return '</details>\n';
                    }
                }
            })
        },

        async ready() {
            console.log('file ready')
        },

        async updated() {
            console.log('file updated')
        }
    }
}