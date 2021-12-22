/**
 * This can be used as an example
 * https://github.com/vuejs/vitepress/blob/master/docs/.vitepress/config.js
 */
module.exports = {
  lang: 'en-US',
  title: 'Vue draggable dash',
  description: 'A vue drag and drop library',
  base: "/vue-draggable-dash/",
  themeConfig: {
    docsDir: 'docs',
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/thespragg/vue-draggable-dash',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'Components',
        children: getComponents(),
      },
    ],
  },
}

function getComponents() {
  return [
    { text: 'Dragable', link: '/pages/dragable/dragable' },
    { text: 'Dropable', link: '/pages/dropable/dropable' },
  ]
}
