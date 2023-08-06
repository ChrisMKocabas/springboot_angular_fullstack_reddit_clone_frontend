# Reddit Springboot Angular Remake Documentation

### Hosted at : https://zealous-wave-027e5c910.3.azurestaticapps.net

Welcome to the documentation for the Reddit Springboot Angular Remake! This document provides an overview of the application's frontend components, along with their functionality and interactions.

## Table of Contents
1. [Frontend](#frontend)
   - [Components](#components)
   - [Authentication and Token Handling](#authentication-and-token-handling)
   - [Services](#services)
   - [Additional Dependencies](#additional-dependencies)
   - [CI/CD](#ci-cd)
  
<img width="1721" alt="Screenshot 2023-08-06 at 12 25 17 AM" src="https://github.com/ChrisMKocabas/springboot_angular_fullstack_reddit_clone_frontend/assets/75855099/77d26573-fada-49be-b9ef-8edfb22f5b30">
Backend code: https://github.com/ChrisMKocabas/springboot_angular_fullstack_reddit_clone

## Frontend

The frontend of the Reddit Springboot Angular Remake is built using the Angular framework (version 14). It includes several components and services to provide a user-friendly interface for interacting with the application.

### Components

- [HeaderComponent](#headercomponent)
- [HomeComponent](#homecomponent)
- [CreatePostComponent](#createpostcomponent)
- [ViewPostComponent](#viewpostcomponent)
- [SideBarComponent](#sidebarcomponent)
- [SubredditSideBarComponent](#subredditsidebarcomponent)
- [PostTileComponent](#posttilecomponent)
- [VoteButtonComponent](#votebuttoncomponent)

#### HeaderComponent:

Responsible for displaying the header navigation bar.
Allows users to access their user profile and perform logout.
Imports icons and services from @fortawesome/free-solid-svg-icons, AuthService, and Router.
Template: header.component.html
Styles: header.component.css
Controller: HeaderComponent

#### HomeComponent:

Displays the homepage of the application.
Fetches and displays all posts using the PostService.
Uses the PostTileComponent to display individual posts in a tile format.
Imports the PostService.
Template: home.component.html
Styles: home.component.css
Controller: HomeComponent

#### CreatePostComponent:

Provides a form to create a new post.
Uses the PostService to create and save the post.
Imports form-related modules and services from @angular/forms, and other required services.
Template: create-post.component.html
Styles: create-post.component.css
Controller: CreatePostComponent

#### ViewPostComponent:

Displays a single post and its details, including comments.
Provides the ability to comment on the post.
Imports the PostService, CommentService, AuthService, and ToastrService.
Uses the CommentPayload model for comment data.
Template: view-post.component.html
Styles: view-post.component.css
Controller: ViewPostComponent

#### SideBarComponent:

Displays a sidebar with navigation options.
Allows users to navigate to create a new post or subreddit.
Uses Router for navigation.
Template: sidebar.component.html
Styles: sidebar.component.css
Controller: SideBarComponent

#### SubredditSideBarComponent:

Displays a sidebar with a list of subreddit links.
Fetches and displays subreddits using the SubredditService.
Imports the SubredditService and the SubredditModel model.
Template: subreddit-sidebar.component.html
Styles: subreddit-sidebar.component.css
Controller: SubredditSideBarComponent

#### PostTileComponent:

Displays individual posts in a tile format with votes, post details, and voting functionality.
Imports icons and services from @fortawesome/free-solid-svg-icons, AuthService, PostService, and ToastrService.
Provides the ability to toggle long descriptions using the isExpanded property.
Template: post-tile.component.html
Styles: post-tile.component.css
Controller: PostTileComponent

#### VoteButtonComponent:

Handles upvote and downvote functionality for posts.
Uses the VoteService to submit votes and the AuthService to check login status.
Imports icons and services from @fortawesome/free-solid-svg-icons.
Template: vote-button.component.html
Styles: vote-button.component.css
Controller: VoteButtonComponent

### Authentication and Token Handling

#### AuthService:

The AuthService is responsible for user authentication and login status management. It provides the following functionality:

- User Login: The AuthService handles user login by sending credentials to the backend for verification. Upon successful login, it stores the authentication token in the browser's local storage to maintain the user's session.

- User Logout: The AuthService allows users to log out of the application, clearing the authentication token from local storage and redirecting them to the login page.

- Token Handling: The AuthService manages the JWT token obtained during login and uses it to authenticate HTTP requests by adding the token to the `Authorization` header through the `TokenInterceptor`.

- Session Management: The AuthService tracks the user's login status using observables. Other components can subscribe to these observables to be notified of changes in the user's login status.

#### TokenInterceptor:

The TokenInterceptor is an HTTP interceptor that intercepts outgoing HTTP requests and ensures that valid JWT tokens are included in the `Authorization` header. It provides the following functionality:

- Token Refresh: When an HTTP request returns a 401 or 403 error (indicating an unauthorized access) and the JWT token is expired, the TokenInterceptor initiates a token refresh process. It obtains a new JWT token using the refresh token provided by the AuthService.

- Retry Mechanism: While the token refresh process is ongoing, the TokenInterceptor ensures that any other HTTP requests wait for the updated token. It uses a `BehaviorSubject` to track the status of the token refresh and waits for the new token to be available.

- Error Handling: The TokenInterceptor handles errors that might occur during the token refresh process. If the refresh token request fails, the user is logged out, and any subsequent HTTP requests are prevented from being executed.

### Services

#### PostService:

Responsible for making HTTP requests related to posts.
Provides methods to fetch all posts, create a new post, get a post by ID, get all posts by a specific user, and toggle post notifications.
Uses HttpClient for API requests.
File: post.service.ts

#### CommentService:

Handles HTTP requests related to comments.
Provides methods to fetch all comments for a post and all comments by a specific user.
Uses HttpClient for API requests.
File: comment.service.ts

#### SubredditService:

Handles HTTP requests related to subreddits.
Provides methods to fetch all subreddits and create a new subreddit.
Uses HttpClient for API requests.
File: subreddit.service.ts

#### VoteService:

Responsible for making HTTP requests related to votes.
Provides a method to submit votes for a post.
Uses HttpClient for API requests.
File: vote.service.ts

### Additional Dependencies

The Reddit Springboot Angular Remake frontend uses the following additional dependencies:

- Angular version 14
- ngx-toastr for displaying toast notifications
- Bootstrap for styling

## CI CD

The frontend application is deployed using GitHub Actions for continuous integration and continuous deployment (CI/CD) to Azure Static Web Apps.

Set github actions variables: 
- name: Set Environment Variables
run: echo "API_BASE_URL=https://your-backend-api.com/api" >> $GITHUB_ENV

## Conclusion

With this comprehensive documentation, developers can understand the structure and functionality of the Reddit Springboot Angular Remake frontend, including user authentication, token handling, and session management provided by the AuthService and TokenInterceptor. The user-friendly interface, along with secure user authentication and token handling, ensures a modern and efficient user experience. By following this guide, developers can extend the application and add new features to meet specific requirements.


