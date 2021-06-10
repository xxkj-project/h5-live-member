## 唐僧直播会员系统

h5 移动端项目(唐僧直播 app 内嵌 h5);

app 访问入口 我的 =》会员中心

#### 技术栈

vue + vant

#### 蓝湖地址(UI 图)

[蓝湖] https://lanhuapp.com/web/#/item/project/board?pid=18aed99f-d3ef-4089-b232-39f98a8fb344

#### 接口文档地址

[测试接口文档] http://tapi.whkuaiyu.com/live/doc.html
[测试接口文档] http://tapi.whkuaiyu.com/login/doc.html

#### 访问地址

[本地测试] http://192.168.90.35:8899/index?key=3ghptfDEvP0QUlRGNahu%2B21uD957EH4bpWjiBJJjtqBGEwXdLXcyMex3PLcJJuYEzkrcKFJ4RDSnH9X36uRaMo4%2B7w3KCHMd629CkXkTBZyMzjvnZzXjdmBc0qzkO9AY&statusBarHeight=20

[线上测试服测试] http://tapi.whkuaiyu.com/livemember/index?key=3ghptfDEvP0QUlRGNahu%2B21uD957EH4bpWjiBJJjtqBGEwXdLXcyMex3PLcJJuYEzkrcKFJ4RDSnH9X36uRaMo4%2B7w3KCHMd629CkXkTBZyMzjvnZzXjdmBc0qzkO9AY&statusBarHeight=20

[线上正式服测试] http://live.whkuaiyu.com:8888/livemember/index?key=yzuuXL0R%2FhwlCe9ZwCjlFaEvMKkYptxxbXG%2BxfG%2FgwGKoXvImL5%2FUZ5UtDyqJLdSvXv2AUPwbuK62XzzT78nqEEmICRiRWGbFiyHmVyR%2F%2FhWdD3b%2F0xU4v%2BbW1NtRwK5

#### 项目相关地址

- 常用地址

```bash

# git 地址：

  http://git.whkuaiyu.com/H5/h5-live-member

#测试服务器地址：

  地址：54.222.167.84
  路径：/usr/share/nginx/html/livemember

#正式服务器地址：

  地址：lvs01 -- 18.162.251.202
  路径：/usr/share/nginx/html/livemember

#接口域名：

  测试：https://tapi.whkuaiyu.com
  正式：http://live.whkuaiyu.com:8888


```

#### 访问参数相关

- 相关参数(参数可能只用其中的某一些，但 key，device，statusBarHeight 为必需的参数)

```bash

# 访问地址(访问方式本地和线上一样都需要拼接参数key)
  访问地址：域名/livemember/ + 页面路由 + ?参数=参数值

# key值(可以找后台要一个)
  key = 'kx9iqky9%2BTQr4FxEWT5s9nidnw2wfyGD6XDmL%2FNcTrBHutj20po7fvVm%2FcDpEkiC4vkqSg4o0JfZMdj7zXQYjF%2BzXHonKnLg%2BqCxHxHqN1MCm86CcQqRGf%2BVxpjyOAvs';

# device(android/ios) 该参数是否在项目中使用，自行取舍
  device = Android/ios

# language(语言类型,0 中文、2英文)
  language = 0/2

# statusBarHeight(顶部状态栏)
  statusBarHeight = 客户端自己定义

# useridx (用户id)
  useridx = 20001022

# 例如：
  http://live.whkuaiyu.com:8888/livemember/index?device=Android&key=yzuuXL0R%2FhwlCe9ZwCjlFaEvMKkYptxxbXG%2BxfG%2FgwGKoXvImL5%2FUZ5UtDyqJLdSvXv2AUPwbuK62XzzT78nqEEmICRiRWGbFiyHmVyR%2F%2FhWdD3b%2F0xU4v%2BbW1NtRwK5&language=0&bridge=1&useridx=20001022&statusBarHeight=38


```

#### 运行及打包

- 常用命令

```bash

# 运行项目
  yarn serve

# 以指定环境打包项目(目前环境有dev、test、prod，具体以项目的.env相关文件)
  yarn build:环境名； 例如：打包正式服 yarn build:prod

```

#### 第三方插件

- vue-clipboard2 复制插件

```bash

# html
  <div
    v-clipboard:copy="infoData.currencyAddress"
    v-clipboard:success="onCopy"
    v-clipboard:error="onError"
    class="copyBtn"
  >
    复制地址
  </div>

# js
  methods: {
    onCopy() {
      this.$toast('复制成功')
    },
    onError() {
      this.$toast('复制失败')
    },
  }


```

#### 结构

#### 代码规范

- 代码规范的目的是提高项目的可维护性。
  <!-- - 请阅读以上目录结构，了解每个文件和文件夹的作用，按照项目结构风格来编程。 -->
- 项目已配置 eslint + prettier，需要自行配置好编辑器才能生效。

#### vscode 相关配置

- KoroFileHeader (文件头部注释说明，快捷键：cart + alt + i), 根据个人喜好自行选择

  1、安装 KoroFileHeader 插件
  2、打开 vscode 设置的 setting.json 添加如下配置

```bash

"fileheader.customMade": {
  "Author": "wangshengxian",
  "Date": "Do not edit",
  "LastEditors": "wangshengxian",
  "LastEditTime": "Do not edit",
  "Desc": ""
}


```

- eslint：

  1、安装 eslint 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"eslint.validate": [
    "javascript",
    "javascriptreact",
    "vue-html",
    "vue"
  ],
"eslint.options": {
  "plugins": ["html"]
},


```

- prettier：

  1、安装 prettier 插件。
  2、打开 vscode 设置的 settings.json，添加以下配置：

```bash

"[html]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"vetur.format.defaultFormatter.html": "js-beautify-html",
"vetur.format.defaultFormatterOptions": {
  "prettier": {
    "eslintIntegration": true,
    "singleQuote": true,
    "semi": true
  }
},


```

- 还需要安装个插件：EditorConfig for VS Code (用来自动识别项目的.editorconfig 文件配置，保持编辑器编码风格的统一。)

  根路径下添加.editorconfig 文件，添加如下配置

```bash

  # https://editorconfig.org
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = crlf
  insert_final_newline = true
  trim_trailing_whitespace = true

  [*.md]
  insert_final_newline = false
  trim_trailing_whitespace = false


```
