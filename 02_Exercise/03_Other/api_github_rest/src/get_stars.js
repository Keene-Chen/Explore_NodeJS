const fs = require('node:fs');
const { Octokit } = require('octokit');

const octokit = new Octokit({
  auth: 'sssss',
});

async function fetchAllStarredRepos() {
  const perPage = 100;
  let page = 1;
  let results = [];

  try {
    let response = await octokit.request('GET /user/starred', {
      headers: {
        'Accept': 'application/vnd.github.v3.star+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      per_page: perPage,
      page,
      sort: 'created',
    });

    results = [...results, ...response.data];
    page++;

    while (response.data.length === perPage) {
      response = await octokit.request('GET /user/starred', {
        headers: {
          'Accept': 'application/vnd.github.v3.star+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        per_page: perPage,
        page,
        sort: 'created',
      });

      results = [...results, ...response.data];
      page++;
    }

    console.log(`Total starred repositories: ${results.length}`);

    // Uncomment below line to print the full names of all starred repositories
    // results.forEach((repo) => console.log(repo.name, repo.full_name, repo.html_url, repo.description, repo.topics));
    return results;
  }
  catch (error) {
    console.error(error.message);
  }
}

// fetchAllStarredRepos().then((res) => {
//   fs.writeFile(
//     'E:/ZM/NodeJS/Yarn_Project/GitHub_REST_API/res/starred_repos.json',
//     JSON.stringify(
//       res.map((repo) => {
//         return {
//           name: repo.repo.name,
//           full_name: repo.repo.full_name,
//           html_url: repo.repo.html_url,
//           description: repo.repo.description,
//           topics: repo.repo.topics,
//           language: repo.repo.language,
//           starred_at: repo.starred_at,
//           created_at: repo.repo.created_at,
//           updated_at: repo.repo.updated_at,
//           pushed_at: repo.repo.pushed_at,
//         };
//       })
//     ),
//     (err) => {
//       if (err) throw err;
//       console.log('Data written to file');
//     }
//   );
// });

module.exports = fetchAllStarredRepos;
