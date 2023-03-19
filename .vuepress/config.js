import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchProPlugin } from "vuepress-plugin-search-pro";
import vuepressPluginKanBanNiang from "@vuepress-reco/vuepress-plugin-kan-ban-niang";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "xwxr'Blog",
  description: "忘记昨天,直面今天,迎接明天",
  head: [['link', { rel: 'icon', href: '/icon.svg' }]],
  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    })
  ],
  theme,
});
