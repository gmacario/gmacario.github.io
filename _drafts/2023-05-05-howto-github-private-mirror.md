# Creating private forks of a GitHub repository

## Problem statement

Sometimes it may be useful or needed to have a private repository on GitHub which is a fork (or just a mirror) of a public repository.

The "Fork" button available on the GitHub web interface does not allow to change the visibility rule of the fork. That means that only public forks can be created from public repositories, and private forks for private repositories.
Furthermore, forks created via the web interface on GitHub will be visibile to all the users who have access to either the upstream repository or its forks.

This is supposed to be a features, but for some use cases this might be a limitation (let me say, some users are shy...).
For instances, this might be useful to work to a new feature in a private repository before making it available to the public.

The procedure detailed in the following section is just a little bit more complex than pushing a button on a web page but solves the problem.

The same procedure can also be applied to create a public fork to a private repository. This might be useful for instance for making only some branches (`main` or `release`) public, and keeping the development branch or some enterprise features restricted.

## Step-by-step instructions

Let us assume we want to do the following:

- Public upstream repository: <https://github.com/ObelusFamily/Anythink-Market-kqkg9ci8>
- Private fork to be created: <https://github.com/gmacario/Anythink-Market-private>

### Create the private repository

Sign in to <https://github.com/>,
then [create a new repository](https://github.com/new):

- Repository template: No template
- Owner: `gmacario`
- Repository name: `Anythink-Market-private`
- Description (optional): `Private fork of https://github.com/ObelusFamily/Anythink-Market-kqkg9ci8`
- Visibility: **Private** - You choose who can see and commit to this repository
- Initialize this repository with:
  - [ ] Add a README file
  - Add .gitignore
    - .gitignore template: None
  - Choose a license:
    - License: None

then click "Create repository".

### Populate the private repository

Open a shell and type the following commands

```bash
git clone https://github.com/ObelusFamily/Anythink-Market-kqkg9ci8
mv Anythink-Market-kqkg9ci8 Anythink-Market-private
cd Anythink-Market-private/
ls -la
git remote -v
git remote add upstream https://github.com/ObelusFamily/Anythink-Market-kqkg9ci8
git remote set-url origin https://github.com/gmacario/Anythink-Market-private.git
git branch -av
git fetch --all
git push -u --tags origin main
```

That's it!

### Add features to the private fork

Now on you may work on `origin` (your private fork) as usual.

```bash
git checkout -b feat/my-feature
# Do something
git commit -m "Blah blah blah"
git push -u origin feat/my-feature
```

You may now create pull requests to your private fork, run GitHub Actions to build and test your changes, etc.

### Create a Pull Request to upstream repository

When you are ready to submit your changes upstream you just have to do the following:

```bash
git checkout feat/my-feature
git push upstream feat/my-feature
```

then create your Pull Request to the upstream repository.

<!-- EOF -->
