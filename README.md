# SDP1 Table Reservation App

## commit structure: 

write what that specific commit does in place of what you did. 

- added login file [wrong way]
- adds login file [correct way]

## Branching convention

### main branch 
- This branch contains the stable and production-ready code.
- All releases should be made from this branch.

### dev branch 
- This branch is for active development and integration of feature branches.
- All the feature and bugfix branches should be made from this branch. 

### release branch 
- These branch is created for preparing code for a new release.
- naming should be: release/v1 

### feature branch 
- These branches should be created for developing new features.
- naming should be: feature/fe_feature-name (use prifix before the feature name. if it is a frontend used "fe"  as a prefix and if it a backend use "be" as a prefix)
- entire name should be in the lowecase. 
- e.x. feature/fe_user-login-signup or feature/be_user-registration

### bugfix branch
- These branches are specifically for fixing bugs and issues.
- naming should be: bugfix/fix-name 
- entire name should be in the lowecase. 
- e.x. bugfix/login-error or bugfix/login-ui

### hotfix branch 
- Can be use to fix the patch release from the release branch. 
- naming should be: hotfix/version-name_issue-number
- entire name should be in the lowecase. 
- e.x. hotfix/v1_issue-login-1 or hotfix/v3_issue-user-name-string-1 

## Getting started

To make it easy for you to get started with GitLab, here's a list of recommended next steps.

Already a pro? Just edit this README.md and make it your own. Want to make it easy? [Use the template at the bottom](#editing-this-readme)!

## Add your files

- [ ] [Create](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#create-a-file) or [upload](https://docs.gitlab.com/ee/user/project/repository/web_editor.html#upload-a-file) files
- [ ] [Add files using the command line](https://docs.gitlab.com/ee/gitlab-basics/add-file.html#add-a-file-using-the-command-line) or push an existing Git repository with the following command:

```
cd existing_repo
git remote add origin https://git.cs.dal.ca/abhishekb/SDP1_Table_Reservation_App.git
git branch -M main
git push -uf origin main
```

## Integrate with your tools

- [ ] [Set up project integrations](https://git.cs.dal.ca/abhishekb/SDP1_Table_Reservation_App/-/settings/integrations)

## Collaborate with your team

- [ ] [Invite team members and collaborators](https://docs.gitlab.com/ee/user/project/members/)
- [ ] [Create a new merge request](https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html)
- [ ] [Automatically close issues from merge requests](https://docs.gitlab.com/ee/user/project/issues/managing_issues.html#closing-issues-automatically)
- [ ] [Enable merge request approvals](https://docs.gitlab.com/ee/user/project/merge_requests/approvals/)
- [ ] [Set auto-merge](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

## Test and Deploy

Use the built-in continuous integration in GitLab.

- [ ] [Get started with GitLab CI/CD](https://docs.gitlab.com/ee/ci/quick_start/index.html)
- [ ] [Analyze your code for known vulnerabilities with Static Application Security Testing(SAST)](https://docs.gitlab.com/ee/user/application_security/sast/)
- [ ] [Deploy to Kubernetes, Amazon EC2, or Amazon ECS using Auto Deploy](https://docs.gitlab.com/ee/topics/autodevops/requirements.html)
- [ ] [Use pull-based deployments for improved Kubernetes management](https://docs.gitlab.com/ee/user/clusters/agent/)
- [ ] [Set up protected environments](https://docs.gitlab.com/ee/ci/environments/protected_environments.html)

***

## Name

## Description

## Authors and acknowledgment
Show your appreciation to those who have contributed to the project.

## License
For open source projects, say how it is licensed.

## Project status
