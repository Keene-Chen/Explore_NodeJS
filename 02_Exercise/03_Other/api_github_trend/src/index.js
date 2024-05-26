const fs = require('node:fs');
const path = require('node:path');
const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { fetchRepositories } = require('./fetch');

const GITHUB_URL = 'https://github.com';
const url = `${GITHUB_URL}/trending`;

// const getRepositories = async function () {
//   try {
//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// (async function () {
//   const html = await getRepositories();
//   fs.writeFileSync(path.join(__dirname, './1.html'), html);
// })();

const html = fs.readFileSync('./1.html');
const $ = cheerio.load(html);
$('.Box article.Box-row')
  .get()
  .map((repo) => {
    const $repo = $(repo);
    const title = $repo.find('.h3').text().trim();
    const [username, repoName] = title.split('/').map(v => v.trim());
    const relativeUrl = $repo.find('.h3').find('a').attr('href');
    const currentPeriodStarsString
      = $repo.find('.float-sm-right').text().trim()
      /* istanbul ignore next */ || '';

    const builtBy = $repo
      .find('span:contains("Built by")')
      .find('[data-hovercard-type="user"]')
      .map((i, user) => {
        const altString = $(user).children('img').attr('alt');
        const avatarUrl = $(user).children('img').attr('src');
        return {
          username: altString
            ? altString.slice(1)
            : /* istanbul ignore next */ null,
          href: `${GITHUB_URL}${user.attribs.href}`,
          // avatar: removeDefaultAvatarSize(avatarUrl),
        };
      })
      .get();

    const colorNode = $repo.find('.repo-language-color');
    const langColor = colorNode.length
      ? colorNode.css('background-color')
      : null;

    const langNode = $repo.find('[itemprop=programmingLanguage]');

    const lang = langNode.length
      ? langNode.text().trim()
      : /* istanbul ignore next */ null;
    console.log(username, repoName, relativeUrl);
    return true;
  });
