import createMDX from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'

let oldPosts = [
  '/2022/december/updated-opinionated-nextjs-setup',
  '/2022/june/on-writing-tests',
  '/2022/june/on-note-taking',
  '/2022/july/yarn-berry-gitignore',
  '/2022/may/moving-to-pnpm',
  '/2022/may/switching-back-to-notion',
  '/2022/may/upgrade-guides',
  '/2022/january/my-opinionated-nextjs-setup',
  '/2022/january/my-two-favorite-react-tricks',
  '/2022/january/switching-to-iphone',
  '/2024/february/library-docs-monorepo-template',
  '/2024/january/building-better-beacon',
  '/2023/april/nextjs-with-tailwind',
  '/2023/april/thoughts-on-tailwind',
  '/2023/april/avoid-distractions',
  '/2023/october/go-to-git-utils',
  '/2023/december/on-adopting-css-in-js',
  '/2023/december/churn-anxiety',
  '/2023/december/consistent-local-ports-with-wrangler',
  '/2023/december/stop-snacking',
  '/2023/december/being-unopinionated',
  '/2023/december/project-deep-dive-tails',
  '/2023/december/type-safe-process-env',
  '/2023/december/service-monitors-and-observability',
  '/2023/december/no-process-is-invisible-process',
  '/2023/december/fixing-zeds-language-server',
  '/2023/june/fractal-refactoring',
  '/2023/june/10x',
  '/2023/july/29',
  '/2023/july/principles-for-automated-testing',
  '/2023/july/deno',
  '/2023/july/distributable-web-apps',
  '/2023/august/speedbumps',
  '/2023/november/pair-programming',
  '/2023/november/teams-and-caterpillar-tracks',
  '/2023/november/ai-driven-development',
  '/2023/november/project-deep-dive-microfibre',
  '/2023/january/navigating-monorepos-with-ease',
  '/2023/january/dollar-devlog-1',
  '/2023/march/dollar-devlog-2',
  '/2023/march/write-it-down',
  '/2023/march/shiki-on-next-js',
  '/2023/september/on-cto-office-hours',
  '/2023/september/using-marquee-with-react-and-typescript',
  '/2023/september/learning-go',
  '/2023/september/finding-react-artifacts',
  '/2015/december/the-social-max',
  '/2015/december/blogging-vs-working',
  '/2015/december/powerpoint',
  '/2015/december/2015',
  '/2015/december/2016',
  '/2015/november/a-new-look',
  '/2015/november/family-time',
  '/2015/november/thanksgiving',
  '/2015/november/a-new-resume',
  '/2015/november/message',
  '/2015/november/weekend-projects',
  '/2017/april/css-in-js',
  '/2017/january/push-vs-pull-ai',
  '/2017/march/calendar',
  '/2017/march/rebuilding-mustache',
  '/2017/march/redesign-v6',
  '/2017/march/javascript-weirdness',
  '/2019/february/why-you-should-useReducer',
  '/2019/february/start-small',
  '/2019/february/building-a-live-editor',
  '/2019/february/hooks-tips-dependency-array',
  '/2019/february/hooks-tips-instance-variables',
  '/2019/june/simpler-and-smaller',
  '/2019/june/deploying-with-github-actions',
  '/2019/july/bend',
  '/2019/july/theme-first-ui-development',
  '/2019/may/maintenance-costs',
  '/2019/january/react-error-boundaries',
  '/2019/march/snapshot-testing',
  '/2021/october/delete-it',
  '/2021/december/2021-in-music',
  '/2021/february/useConsole',
  '/2021/february/yw',
  '/2021/june/the-squeeze',
  '/2021/june/learning',
  '/2021/august/build-your-developer-toolbox',
  '/2021/august/rtl-checkbox-events',
  '/2021/august/updating-forked-repos',
  '/2021/august/start-fresh',
  '/2021/august/obsidian-sync',
  '/2021/august/on-written-communication',
  '/2021/november/pair-programming-stub',
  '/2021/november/fast-feedback-systems',
  '/2021/november/video-games',
  '/2021/january/hack-sprint',
  '/2021/january/computed-theme',
  '/2021/january/simple-props',
  '/2021/january/2021',
  '/2021/march/array-chunking',
  '/2021/march/writing-node-scripts',
  '/2021/march/on-code-review',
  '/2021/march/fast',
  '/2021/september/linear-tools',
  '/2021/september/mac-setup-guide',
  '/2020/april/a-note-on-meetings',
  '/2020/april/the-rabbit-hole',
  '/2020/april/a-note-on-anti-patterns',
  '/2020/december/pair-code-reviews',
  '/2020/december/nextjs-analytics-with-airtable',
  '/2020/december/literate-programming',
  '/2020/december/sandbox-part-1',
  '/2020/december/2020',
  '/2020/february/back-bay-fens',
  '/2020/july/enhancing-slack',
  '/2020/may/a-note-on-consistency',
  '/2020/march/stateful-providers',
  '/2020/march/draft-pull-requests',
  '/2018/april/understanding-react-16-3-updates',
  '/2018/october/matts-log-october',
  '/2018/december/testing-software',
  '/2018/december/starting-fresh',
  '/2018/july/summer-2018-trip',
  '/2018/july/taking-a-break',
  '/2018/may/complex-ui-components',
  '/2018/november/suspense-plus-graphql',
  '/2018/november/missing-detail',
  '/2018/january/2018',
  '/2018/september/youve-launched-now-what',
  '/2016/april/redesign',
  '/2016/october/css-debate',
  '/2016/october/october-4th',
  '/2016/august/attribute-selectors',
  '/2016/august/redesign-v5',
  '/2016/august/my-new-website',
  '/2016/august/august',
  '/2016/august/pull-quotes',
  '/2016/november/links',
  '/2016/january/building-in-2016',
  '/2016/january/10000-characters',
  '/2016/january/my-first-project-of-2016',
  '/2016/january/clientside',
  '/2016/january/afraid',
  '/2016/january/dji-vs-gopro',
]

/** @type {import('next').NextConfig} */
let config = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    serverComponentsExternalPackages: ['shiki', 'vscode-oniguruma'],
    mdxRs: true,
  },
  async redirects() {
    return [
      ...oldPosts.map((post) => ({
        source: post,
        destination: `/blog/${post}`,
        permanent: true,
      })),
      {
        source: '/posts/tags',
        destination: '/blog/tags',
        permanent: true,
      },
      {
        source: '/posts/tags/:tag',
        destination: '/blog/tags/:tag',
        permanent: true,
      },
      {
        source: '/posts',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

export default createMDX({
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm],
    rehypePlugins: [],
  },
})(config)
