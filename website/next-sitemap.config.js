/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://marionrenauld.com',
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  outDir: 'dist'
  // ...other options
}
