# release_assist
## update-topics

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
To use this action you need a file in your repository at the path `.github/workflows/update-topics.yaml`. Following the `steps` that the file should contain:

## Adding topics via text files 
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
       uses: telegraph/release_assist@update-topics
       with:
        repo-token: "${{ secrets.WRITING }}"
        paths: ./file1.txt ./file2.txt ./file3.txt
```

## Adding topics via poms
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
       uses: telegraph/release_assist@update-topics
       with:
        repo-token: "${{ secrets.WRITING }}"
        paths: ./pom.xml ./service-module/pom.xml ./client-module/pom.xml
        is-pom: true
```

## Adding via pom(s) and text file(s)
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
        uses: telegraph/release_assist@update-topics
        with:
          repo-token: "${{ secrets.WRITING }}"
          paths: ./topics.txt
      - name: Update Topics from POM
        uses: telegraph/release_assist@update-topics
        with:
          repo-token: "${{ secrets.WRITING }}"
          paths: ./pom.xml ./poms-for-testing/pom-1.xml
          is-pom: true
          replace: false
```

## Inputs

| NAME | REQUIRED | DEFAULT | DESCRIPTION
| ---: | :---: | :---: | ---
| repo-token | YES | - | Github token used to access github api with writing permissions. Should be `${{ secrets.WRITING }}`. It should be stored by the repository in the "secretes" section. The token itself should be generated by an admin of the company
| paths | YES | - | path(s) to topics file (.txt or .xml)
| replace | NO | true | Boolean to replace the current topics. If set on true the old topics will be removed.
| is-pom | NO | false | Has to be true if the file sent are poms

# NOTE: this is a public repository
