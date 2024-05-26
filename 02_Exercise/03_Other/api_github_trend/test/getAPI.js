const fs = require('node:fs');
const path = require('node:path');
const { default: axios } = require('axios');
const cheerio = require('cheerio');
const { isNil, omitBy } = require('lodash');

const baseUrl = 'https://github.com/trending';

async function getGitHubData() {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  }
  catch (error) {
    console.error(error);
    return null;
  }
}

async function htmlWriteFile() {
  const html = await getRepositories();
  fs.writeFileSync(path.join(__dirname, '../res/repo.html'), html);
}

async function getRepositories({ language = '', since = 'daily', spokenLanguage = '' } = {}) {
  const html = await fs.promises.readFile(path.join(__dirname, '../res/repo.html'));
  const $ = cheerio.load(html);
  return $('.Box article.Box-row')
    .get()
    .map((repo) => {
      const $repo = $(repo);
      const description = $repo.find('.col-9').text().trim();
      const title = $repo.find('.h3').text().trim();
      const [username, repoName] = title.split('/').map(v => v.trim());
      const relativeUrl = $repo.find('.h3 a').attr('href');
      const currentPeriodStarsString = $repo.find('.float-sm-right').text().trim() || '';
      const builtBy = $repo
        .find('span:contains("Built by")')
        .find('[data-hovercard-type="user"]')
        .map((i, user) => {
          const altString = $(user).children('img').attr('alt');
          const avatarUrl = $(user).children('img').attr('src');
          return {
            username: altString?.slice(1) || null,
            href: `${baseUrl}${user.attribs.href}`,
            avatar: avatarUrl.replace(/\?s=.*$/, ''),
          };
        })
        .get();
      const colorNode = $repo.find('.repo-language-color');
      const langColor = colorNode.length ? colorNode.css('background-color') : null;
      const langNode = $repo.find('[itemprop=programmingLanguage]');
      const lang = langNode.length ? langNode.text().trim() : null;
      const stars = Number.parseInt(
        $repo.find('.mr-3 svg[aria-label=\'star\']').first().parent().text().trim().replace(',', '') || '0',
        10,
      );
      const forks = Number.parseInt(
        $repo.find('svg[aria-label=\'fork\']').first().parent().text().trim().replace(',', '') || '0',
        10,
      );
      const currentPeriodStars = Number.parseInt(currentPeriodStarsString.split(' ')[0].replace(',', '') || '0', 10);

      return omitBy(
        {
          title: title.replace(/\n/g, '').replace(/\s*\/\s*/, '/'),
          description,
          username,
          repoName,
          relativeUrl,
          currentPeriodStarsString,
          builtBy,
          langColor,
          lang,
          stars,
          forks,
          currentPeriodStars,
        },
        isNil,
      );
    });
}

// (async () => {
//   const rest = await getRepositories();
//   console.log(rest);
// })();

async function getDevelopers({ language = '', since = 'daily' } = {}) {
  const data = await fetch(`${baseUrl}/developers/${language}?since=${since}`);
  const $ = cheerio.load(await data.text());
  return $('.Box article.Box-row')
    .get()
    .map((dev) => {
      const $dev = $(dev);
      const relativeUrl = $dev.find('.h3 a').attr('href');
      const sponsorRelativeUrl = $dev.find('span:contains("Sponsor")').parent().attr('href');
      const name = $dev.find('.h3 a').text().trim();
      const username = relativeUrl.slice(1);
      const type = $dev.find('img').parent().attr('data-hovercard-type');
      const $repo = $dev.find('.mt-2 > article');
      $repo.find('svg').remove();

      return omitBy(
        {
          username,
          name,
          type,
          url: `${baseUrl}${relativeUrl}`,
          sponsorUrl: sponsorRelativeUrl ? `${baseUrl}${sponsorRelativeUrl}` : undefined,
          // avatar: removeDefaultAvatarSize($dev.find('img').attr('src')),
          repo: $repo.length
            ? {
                name: $repo.find('a').text().trim(),
                description: $repo.find('.f6.mt-1').text().trim() || /* istanbul ignore next */ '',
                url: `${baseUrl}${$repo.find('a').attr('href')}`,
              }
            : null,
        },
        isNil,
      );
    });
}

// (async () => {
//   const rest = await getDevelopers();
//   console.log(rest);
// })();

module.exports = { getRepositories, getDevelopers };
