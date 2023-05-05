# HOWTO: Create a private mirror of a GitHub repository

Example:

* Public upstream repository: <https://github.com/ObelusFamily/Anythink-Market-kqkg9ci8>
* Private mirror: <https://github.com/gmacario/Anythink-Market-private>

Step-by-step instructions

Sign in to <https://github.com/>,
then [create a new repository](https://github.com/new):

- Repository template: No template
- Owner: `gmacario`
- Repository name: `Anythink-Market-private`
- Description (optional): `Private mirror of https://github.com/ObelusFamily/Anythink-Market-kqkg9ci8`
- Visibility: **Private** - You choose who can see and commit to this repository
- Initialize this repository with:
  - [ ] Add a README file
  - Add .gitignore
    - .gitignore template: None
  - Choose a license:
    - License: None
    
then click "Create repository".

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

<!-- EOF -->
