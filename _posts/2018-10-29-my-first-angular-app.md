---

layout: post
title:  "Writing my first Angular.js application"
tags:   howto angularjs nodejs

---

<!-- 2018-10-16 12:29 CEST -->

### Introduction

This article explains how to install and create a simple [Angular.js](https://angular.io/) application.

The following instructions have been tested on my laptop "HW2457" running [MS Windows 7 64-bit](https://en.wikipedia.org/wiki/Windows_7) and [Cygwin 64-bit](https://cygwin.com/index.html), and have also been reproduced on hosts running [Ubuntu 18.04.1 LTS 64-bit](https://www.ubuntu.com/).

## Installing Angular on your laptop

### Step 0: Prerequisites

Follow the instructions at <https://nodejs.org/> to install  [Node.js](https://nodejs.org/) as well as the [npm](https://www.npmjs.com/) command.

<!-- 2018-10-29 09:41 CET -->

Logged as `gpmacario@hw2457`, start a Cygwin bash shell and verify that the `node` and `npm` commands have been installed correctly:

```
gpmacario@HW2457:~ $ node --version
v8.12.0
gpmacario@HW2457:~ $ npm --version
6.4.1
gpmacario@HW2457:~ $
```

### Step 1: Install the Angular CLI

Use the `npm` command to install the Angular Command Line Interface:

```shell
npm install -g @angular/cli
```

Notice that the `-g` option installs the command globally. You might need to prepend the above command with `sudo` for the command to complete with success.

If everything is OK you should get a similar result:

```
gpmacario@HW2457:~ $ npm install -g @angular/cli
C:\Users\GPMacario\AppData\Roaming\npm\ng -> C:\Users\GPMacario\AppData\Roaming\npm\node_modules\@angular\cli\bin\ng
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\@angular\cli\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

+ @angular/cli@7.0.3
added 268 packages from 205 contributors in 38.154s
gpmacario@HW2457:~ $
```

Type `ng version` to verify that the Angular CLI has been installed correctly:

```
TODO
```

If you type `ng` with no options you will get a short command line help:

```
TODO
```

### Step 2: Create a workspace and initial application

Type the `ng new <appname>` command to create a new workspace and the initial Angular.js application:

```shell
ng new my-first-angular-app
```

Result:

```
gpmacario@HW2457:~/github/gmacario $ ng new my-first-angular-app
CREATE my-first-angular-app/angular.json (3894 bytes)
CREATE my-first-angular-app/package.json (1327 bytes)
CREATE my-first-angular-app/README.md (1034 bytes)
CREATE my-first-angular-app/tsconfig.json (408 bytes)
CREATE my-first-angular-app/tslint.json (2837 bytes)
CREATE my-first-angular-app/.editorconfig (245 bytes)
CREATE my-first-angular-app/.gitignore (503 bytes)
CREATE my-first-angular-app/src/favicon.ico (5430 bytes)
CREATE my-first-angular-app/src/index.html (304 bytes)
CREATE my-first-angular-app/src/main.ts (372 bytes)
CREATE my-first-angular-app/src/polyfills.ts (3234 bytes)
CREATE my-first-angular-app/src/test.ts (642 bytes)
CREATE my-first-angular-app/src/styles.css (80 bytes)
CREATE my-first-angular-app/src/browserslist (388 bytes)
CREATE my-first-angular-app/src/karma.conf.js (964 bytes)
CREATE my-first-angular-app/src/tsconfig.app.json (166 bytes)
CREATE my-first-angular-app/src/tsconfig.spec.json (256 bytes)
CREATE my-first-angular-app/src/tslint.json (314 bytes)
CREATE my-first-angular-app/src/assets/.gitkeep (0 bytes)
CREATE my-first-angular-app/src/environments/environment.prod.ts (51 bytes)
CREATE my-first-angular-app/src/environments/environment.ts (662 bytes)
CREATE my-first-angular-app/src/app/app.module.ts (314 bytes)
CREATE my-first-angular-app/src/app/app.component.html (1141 bytes)
CREATE my-first-angular-app/src/app/app.component.spec.ts (1020 bytes)
CREATE my-first-angular-app/src/app/app.component.ts (224 bytes)
CREATE my-first-angular-app/src/app/app.component.css (0 bytes)
CREATE my-first-angular-app/e2e/protractor.conf.js (752 bytes)
CREATE my-first-angular-app/e2e/tsconfig.e2e.json (213 bytes)
CREATE my-first-angular-app/e2e/src/app.e2e-spec.ts (316 bytes)
CREATE my-first-angular-app/e2e/src/app.po.ts (208 bytes)
npm WARN deprecated circular-json@0.5.9: CircularJSON is in maintenance only, flatted is its successor.

> node-sass@4.9.3 install C:\Users\GPMacario\Documents\github\gmacario\my-first-angular-app\node_modules\node-sass
> node scripts/install.js

Downloading binary from https://github.com/sass/node-sass/releases/download/v4.9.3/win32-x64-57_binding.node
Download complete
Binary saved to C:\Users\GPMacario\Documents\github\gmacario\my-first-angular-app\node_modules\node-sass\vendor\win32-x64-57\binding.node
Caching binary to C:\Users\GPMacario\AppData\Roaming\npm-cache\node-sass\4.9.3\win32-x64-57_binding.node

> node-sass@4.9.3 postinstall C:\Users\GPMacario\Documents\github\gmacario\my-first-angular-app\node_modules\node-sass
> node scripts/build.js

Binary found at C:\Users\GPMacario\Documents\github\gmacario\my-first-angular-app\node_modules\node-sass\vendor\win32-x64-57\binding.node
Testing binary
Binary is fine
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

added 1097 packages from 1162 contributors and audited 39128 packages in 94.992s
found 0 vulnerabilities

    Successfully initialized git.
gpmacario@HW2457:~/github/gmacario $
```

Inspect the files just created:

```
gpmacario@HW2457:~/github/gmacario $ cd my-first-angular-app/
gpmacario@HW2457:~/github/gmacario/my-first-angular-app (master)$ ls -la
totale 527
drwxr-xr-x+ 1 gpmacario AROL+Group(513)      0 29 ott 09.48 .
drwxr-xr-x+ 1 gpmacario AROL+Group(513)      0 29 ott 09.46 ..
-rwxr-xr-x  1 gpmacario AROL+Group(513)    245 29 ott 09.46 .editorconfig
drwxr-xr-x+ 1 gpmacario AROL+Group(513)      0 29 ott 09.48 .git
-rwxr-xr-x  1 gpmacario AROL+Group(513)    503 29 ott 09.46 .gitignore
-rwxr-xr-x  1 gpmacario AROL+Group(513)   3894 29 ott 09.46 angular.json
drwxr-xr-x+ 1 gpmacario AROL+Group(513)      0 29 ott 09.46 e2e
drwxr-xr-x+ 1 gpmacario AROL+Group(513)      0 29 ott 09.48 node_modules
-rwxr-xr-x  1 gpmacario AROL+Group(513)   1327 29 ott 09.46 package.json
-rwxr-xr-x  1 gpmacario AROL+Group(513) 371916 29 ott 09.48 package-lock.json
-rwxr-xr-x  1 gpmacario AROL+Group(513)   1034 29 ott 09.46 README.md
drwxr-xr-x+ 1 gpmacario AROL+Group(513)      0 29 ott 09.46 src
-rwxr-xr-x  1 gpmacario AROL+Group(513)    408 29 ott 09.46 tsconfig.json
-rwxr-xr-x  1 gpmacario AROL+Group(513)   2837 29 ott 09.46 tslint.json
gpmacario@HW2457:~/github/gmacario/my-first-angular-app (master)$
```

This is the right time to backup your local git repository to a remote server - in my case, I used [GitHub](https://github.com).

Login to <https://github.com> and create a new repository under your user profile - for instance I did the following:

* Owner: `gmacario`
* Repository name: `my-first-angular-app`
* Description: `My first Angular.js application`
* Visibility: Public
* Initialize this repository with a README: No

then click "Create repository".
If everything is OK, GitHub will show the next steps to publish the project. In my case:

```shell
cd ~/github/gmacario/my-first-angular-app
git remote add origin git@github.com:gmacario/my-first-angular-app.git
git push -u origin master
```

If you now browse <https://github.com/gmacario/my-first-angular-app> you will find your project files

![github-01](/assets/imgs/2018-10-27-my-first-angular-app/github-01.png "GitHub-01")


### Step 3: Serve the application

<!-- 2018-10-29 09:53 CET -->

The following command will build the Angular project and preview the result on your default browser:

```shell
cd ~/github/gmacario/my-first-angular-app
ng serve --open
```

Result:

```
gpmacario@HW2457:~/github/gmacario/my-first-angular-app (master)$ ng serve --open
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **

Date: 2018-10-29T08:54:50.162Z
Hash: 84d242463fc62558305a
Time: 20669ms
chunk {main} main.js, main.js.map (main) 10.9 kB [initial] [rendered]
chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 228 kB [initial] [rendered]
chunk {runtime} runtime.js, runtime.js.map (runtime) 6.22 kB [entry] [rendered]
chunk {styles} styles.js, styles.js.map (styles) 16.6 kB [initial] [rendered]
chunk {vendor} vendor.js, vendor.js.map (vendor) 3.46 MB [initial] [rendered]
i ｢wdm｣: Compiled successfully.
```

Your default browser will then open the page <http://localhost:4200/>

![angular-01](/assets/imgs/2018-10-27-my-first-angular-app/angular-01.png "Angular-01")

As soon as you edit one of the project files and save it to the local filesystem, your browser will display the updated page. For instance, open

TODO

<!-- EOF -->
