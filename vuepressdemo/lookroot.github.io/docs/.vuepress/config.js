module.exports = {
  "title": "recodemo",
  "description": "recodemo",
  "dest": "public",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  // 导航栏
  "themeConfig": {
    "nav": [{
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [{
          "text": "GitHub",
          "link": "https://github.com/lookroot",
          "icon": "reco-github"
        }]
      }
    ],
    // "sidebar": {
    //   '/views/': [
    //     '',
    //     {
    //       title: 'vue教程',
    //       collapsable: true, // 不可折叠
    //       children: ['vue/vif', 'vue/vfor']
    //     }
    //   ]
    // },
    "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "author": "lookroot",
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": {
    "vuepress-plugin-auto-sidebar": {}
  }
}