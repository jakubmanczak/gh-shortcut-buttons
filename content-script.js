// Giving the context switcher on the dashboard a title + deboldifying the context switcher title
document
	.querySelector('.dashboard-sidebar')
	.childNodes[1].childNodes[1].childNodes[1].classList.remove('text-bold');

let contextSwitcherSign = document.createElement('h2');
contextSwitcherSign.classList.value = 'hide-sm hide-md f5 mb-1';
document
	.querySelector('.dashboard-sidebar')
	.childNodes[1].childNodes[1].childNodes[1].prepend(contextSwitcherSign);
contextSwitcherSign.innerText = 'Context Switch';

// Removing the top margin from context switcher
document
	.querySelector('.dashboard-sidebar')
	.childNodes[1].classList.remove('mt-3');

// Adding the profile button + misc buttons to the top of the dashboard sidebar
let ghShortcutBtns = document.createElement('div');
ghShortcutBtns.classList.add(
	'border-bottom',
	'color-border-secondary',
	'pt-3',
	'mt-3'
);

let crntUserName = document.querySelector('.avatar-user').alt.substring(1);
let crntAvatar =
	document.querySelector('.avatar-user').src.split('?')[0] + '?s=60&v=4';

fetch(`https://api.github.com/users/${crntUserName}`)
	.then((response) => (response.status === 403 ? undefined : response.json()))
	.then((data) => {
		if (data !== undefined) {
			document.querySelector('.ghsb-displayName').innerHTML = data.name;
			document.querySelector('.ghsb-flwrs').innerHTML = data.followers;
			document.querySelector('.ghsb-flwing').innerHTML = data.following;
			document.querySelector('.ghsb-repoCount').innerText = data.public_repos;
			document.querySelector('.ghsb-gistCount').innerText = data.public_gists;
		} else {
			let rateLimitPrompt = document.createElement('div');
			rateLimitPrompt.innerHTML = 'The rate limit has been exceeded.';
			rateLimitPrompt.style = 'color: #ff7675; display: block';
			rateLimitPrompt.classList.add('pb-3');

			document
				.querySelector('.ghsb-maindiv')
				.parentNode.insertBefore(
					rateLimitPrompt,
					document.querySelector('.ghsb-maindiv').nextSibling
				);
		}
	});

fetch(`https://api.github.com/users/${crntUserName}/starred?per_page=1`).then(
	(response) => {
		if (response.status !== 403)
			document.querySelector(
				'.ghsb-starCount'
			).innerHTML = response.headers
				.get('link')
				.split(',')[1]
				.split(';')[0]
				.split('=')[2]
				.slice(0, -1);
	}
);

document.querySelector('.dashboard-sidebar').prepend(ghShortcutBtns);

ghShortcutBtns.innerHTML = `
	<div style="display: flex; gap: .5rem" class="ghsb-maindiv">

		<a href="https://github.com/${crntUserName}" style="color: inherit">
			<img src="${crntAvatar}" alt="@${crntUserName}" class="avatar-user" style="width: 60px; height: 60px" />
		</a>

		<div style="display: flex; flex-direction: column">

			<a href="https://github.com/${crntUserName}" style="color: inherit">
				<h2 style="display: inline-block" class="ghsb-displayName">${crntUserName}</h2>
			</a>

			<div class="mb-3">

				<a class="Link--secondary no-underline no-wrap" href="https://github.com/${crntUserName}?tab=stars">
					<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" class="octicon octicon-star text-icon-tertiary"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
					<span class="text-bold color-text-primary ghsb-starCount">...</span>
				</a> 
					·
				<a class="Link--secondary no-underline no-wrap" href="https://github.com/${crntUserName}?tab=repositories">
					<svg class="octicon octicon-star text-icon-tertiary" height="16" viewBox="0 0 16 16" version="1.1" width="16" aria-hidden="true"><path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path></svg>
					<span class="text-bold color-text-primary ghsb-repoCount">...</span>
				</a>
					·
				<a class="Link--secondary no-underline no-wrap" href="https://gist.github.com/${crntUserName}">
					<svg class="octicon octicon-star text-icon-tertiary" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M1.75 1.5a.25.25 0 00-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 00.25-.25V1.75a.25.25 0 00-.25-.25H1.75zM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zm9.22 3.72a.75.75 0 000 1.06L10.69 8 9.22 9.47a.75.75 0 101.06 1.06l2-2a.75.75 0 000-1.06l-2-2a.75.75 0 00-1.06 0zM6.78 6.53a.75.75 0 00-1.06-1.06l-2 2a.75.75 0 000 1.06l2 2a.75.75 0 101.06-1.06L5.31 8l1.47-1.47z"></path></svg>
					<span class="text-bold color-text-primary ghsb-gistCount">...</span>
				</a>
					·
				<a class="Link--secondary no-underline no-wrap" href="https://github.com/${crntUserName}?tab=following">
					<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" class="octicon octicon-people text-icon-tertiary"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
					<span class="text-bold color-text-primary ghsb-flwing">...</span>
				</a>

			</div>

		</div>

	</div>
	
	<div class="mb-3">
		<a class="Link--secondary no-underline no-wrap" href="https://github.com/${crntUserName}?tab=followers">
			You have
			<svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" class="octicon octicon-people text-icon-tertiary"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
			<span class="text-bold color-text-primary ghsb-flwrs">...</span>
			followers.
		</a>
	</div>

	`;
