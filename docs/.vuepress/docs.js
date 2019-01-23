
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
                    return params.trim().match(new RegExp(`^${name}\\s+(.*)$`))
                },
                render(tokens, idx) {
                    // tokens see reflink: https://img.xiongc.com/tokens_from_markdownit.json
                    // idx is the current token index
                    const m = tokens[idx].info.trim().match(new RegExp(`^${name}\\s+(.*)$`))

                    if (tokens[idx].nesting === 1) {
                        // opening tag
                        // md is an instance of markdown-it, and plz ref its API Doc 
                        // https://markdown-it.github.io/markdown-it/#Renderer.render
                        return `
                                <details>
                                    <summary> 
                                        ${md.render(m[1]).html} 
                                    </summary>
                                `

                    } else {
                        // closing tag
                        return `
                                </details>
                                `
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