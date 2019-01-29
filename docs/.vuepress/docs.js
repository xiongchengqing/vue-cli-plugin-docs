const striptags = require('./strip-tags')
const convert = (str) => {
    str = str.replace(/(&#x)(\w{4});/gi, function($0) {
        return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
    });
    return str;
}


module.exports = (options, ctx) => {
    return {
        name: 'vuepress-plugin-docs',

        enhanceDevServer(app) {
            console.log('app', app)
        },

        enhanceAppFiles() {

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
                    var m = tokens[idx].info.trim().match(new RegExp(`^${name}\\s+(.*)$`))
                    var content = tokens[idx + 1] ? tokens[idx + 1].content : ''

                    // const html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                    var html = striptags.strip(content, ['script', 'style'])
                    var description = (m && m.length > 1) ? m[1] : ''
                    var descriptionHTML = description ? md.render(description).html : ''

                    if (tokens[idx].nesting === 1) {
                        // opening tag
                        // md is an instance of markdown-it, and plz ref its API Doc 
                        // https://markdown-it.github.io/markdown-it/#Renderer.render
                        return `
                            <demo-block class="demo-box">
                                <div class="source" slot="source">${html}</div>
                                    ${descriptionHTML}
                                <div class="highlight" slot="highlight">`;

                    } else {
                        // closing tag
                        return `
                                </div>
                            </demo-block>`;

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