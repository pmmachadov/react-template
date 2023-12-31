function generateBodyPR(pullRequestsDevelopMerged) {
  const semver = require('semver');

  // Generate and update pull request body
  const mappedTitle = str => {
    const prefix = str.split('-')[0].trim().toLowerCase();
    return {
      prType: prefix,
      title: str,
    };
  };
  let body = '';
  const titles = pullRequestsDevelopMerged.map(item => ({
    ...mappedTitle(item.title),
    url: item.url,
  }));
  console.log('> titles', titles);
  const listTypes = ['fix', 'feature', 'modify', 'breaking'];
  const mappingType = {
    fix: 'patch',
    feature: 'minor',
    modify: 'minor',
    breaking: 'major',
  };
  console.log('> listTypes', listTypes);
  let releaseType = mappingType.fix;
  listTypes.forEach(prType => {
    console.log('> prType', prType);
    body += `\n## ${prType}`;
    const titleTypes = titles.filter(title => title.prType === prType);
    titleTypes.forEach(titleType => {
      releaseType = mappingType[titleType.prType];
      body += `\n - ${titleType.title} [url](${titleType.url})`;
    });
  });
  const finalVersion = semver.inc(process.env.TAG_LATEST, releaseType);
  console.log('> finalVersion', finalVersion);
  console.log('> releaseType', releaseType);
  console.log('> body', body);
  return {
    body,
    finalVersion,
  };
}

const getPullRequstRelease = async ({github, context, lastTagReleaseDate}) => {
	const payload = {
		owner: context.payload.repository.organization,
		repo: context.repo.repo,
		state: 'closed',
		labels: ['QAPassed', 'dev'],
		sort: 'updated',
		since: lastTagReleaseDate,
	}
	return github.rest.issues.listForRepo(payload)
};

module.exports = async ({context, exec, github}) => {
	const createPullRequest = require('./createPullRequest');
	const checkPullRequestRelease = require('./checkPullRequest');
	const updatePackageJson = require('./updatePackageJson');
  // get list of merged PR to develop since last git tag
  const lastTagReleaseDate = new Date(
    Number(process.env.TAG_LATEST_DATE) * 1000,
  ).toISOString();
  console.log('> lastTagReleaseDate', lastTagReleaseDate);

	// Check pull request release exist
	const {processType} = await checkPullRequestRelease({github, context})
	if (processType === 'create') {
		await createPullRequest({context, exec, github})
	} else {
		let pullRequestsDevelopMerged = await getPullRequstRelease({context, github, lastTagReleaseDate})
		console.log('> pullRequestsDevelopMerged', pullRequestsDevelopMerged);

		// generate body
		const {body, finalVersion} = generateBodyPR(pullRequestsDevelopMerged.data);
		await updatePackageJson({exec, version: finalVersion})

		// Get Pull Request Release
		const pullRequestsReleases = await github.rest.pulls.list({
			owner: context.payload.repository.organization,
			repo: context.repo.repo,
			state: 'open',
			base: 'main',
			sort: 'updated',
		});

		// Update
		await github.rest.pulls.update({
			owner: context.payload.repository.organization,
			repo: context.repo.repo,
			pull_number: pullRequestsReleases.data[0].number,
			title: `Release - ${finalVersion}`,
			labels: ['release'],
			body,
		});
	}
};
