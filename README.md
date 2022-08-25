# release_assist
## update_topics

# Build
```
$ npm i -g @vercel/ncc
$ npm install
$ ncc build index.js --license licenses.txt
```

# Test
```
$ npm test
```
N.B.: The tests are in the folder `/test`

# Description

This action adds topics on a repo reading from one or more files.
- Those files can be .txt and the content will be considered as topics to add (considering spaces and the new lines as separators)
- Those files can be pom.xml(s), and the dependencies that belong to "uk.co.telegraph" will be added as topics

# Usage
To use this action you need a file in your repository at the path `.github/workflows/update_topics.yaml`. Following the `steps` that the file should contain:

### Adding topics via text files 
```
name: Update Topics
on:
  push:
    branches:
      - main
jobs:
  add_topics:
    runs-on: ubuntu-latest
    name: Update topics from File
    steps:
     - name: Checkout source code
       uses: actions/checkout@v2
     - name: Update Topics from txt File
       uses: telegraph/release_assist@update_topics
       with:
        repo-token: "${{ secrets.ACTIONS_READING_AND_WRITING }}"
        paths: ./file1.txt ./file2.txt ./file3.txt
```

### Adding topics via poms
```
name: Update Topics
on:
  push:
    branches:
      - main
jobs:
  add_topics:
    runs-on: ubuntu-latest
    name: Update topics from File
    steps:
     - name: Checkout source code
       uses: actions/checkout@v2
     - name: Update Topics from POMs
       uses: telegraph/release_assist@update_topics
       with:
        repo-token: "${{ secrets.ACTIONS_READING_AND_WRITING }}"
        paths: ./pom.xml ./api-module/pom.xml ./service-module/pom.xml ./client-module/pom.xml
        is-pom: true
```

### Adding via pom(s) and text file(s)
```
name: Update Topics
on:
  push:
    branches:
      - main
jobs:
  add_topics:
    runs-on: ubuntu-latest
    name: Update topics from File(s)
    steps:
      - name: Checkout source code
        uses: actions/checkout@v2
      - name: Update Topics from txt File
        uses: telegraph/release_assist@update_topics
        with:
          repo-token: "${{ secrets.ACTIONS_READING_AND_WRITING }}"
          paths: ./topics.txt
      - name: Update Topics from POM
        uses: telegraph/release_assist@update_topics
        with:
          repo-token: "${{ secrets.ACTIONS_READING_AND_WRITING }}"
          paths: ./pom.xml ./api-module/pom.xml ./service-module/pom.xml ./client-module/pom.xml
          is-pom: true
          replace: false
```

## Inputs

| NAME | REQUIRED | DEFAULT | DESCRIPTION
| ---: | :---: | :---: | ---
| repo-token | YES | - | Github token used to access github api with writing permissions. Use `${{ secrets.ACTIONS_READING_AND_WRITING }}`, which is an organiazation secret
| paths | YES | - | path(s) to topics file (.txt or .xml)
| replace | NO | true | Boolean to replace the current topics. If set on true the old topics will be removed.
| is-pom | NO | false | Has to be true if the file sent are poms

# GUIDE TO USE THIS FOR A TELEGRAPH REPO 

To maintain the Telegraph repositories, and to make the research via dependencies and team quick and efficient, we want to use a combination of topics extracted from added files and poms.
Therefore, the correct `.github/workflows/update_topics.yaml` should look like the following:

```
name: Update Topics
on:
  push:
    branches:
      - main
jobs:
  add_topics:
    runs-on: ubuntu-latest
    name: Update topics from File(s)
    steps:
      - name: Checkout source code
        uses: actions/checkout@v2
      - name: Update Topics from txt File
        uses: telegraph/release_assist@update_topics
        with:
          repo-token: "${{ secrets.ACTIONS_READING_AND_WRITING }}"
          paths: ./topics.txt
      - name: Update Topics from POM
        uses: telegraph/release_assist@update_topics
        with:
          repo-token: "${{ secrets.ACTIONS_READING_AND_WRITING }}"
          paths: ./pom.xml ./api-module/pom.xml ./service-module/pom.xml ./client-module/pom.xml
          is-pom: true
          replace: false
```

As you can see, in the second step we don't have `replace`, which is `true` by default because we want all the old topics to be automatically removed.
The topics that we want to keep, should then be stored in the file `topics.txt`. We recommend to have in this file the name of the repository's team
and other topics that can be useful for the research, p.i. `downstream` if the repo is used for a downstream client.

Following an example of `topics.txt`
```
platforms
downstream
```

### ⚠ ATTENTION!!!

* The maximum number of topics that a repo can contain is 20
* Only the `-` is allowed as special character for topics

# NOTE: this is a public repository
