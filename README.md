# Sample React Application
View latest React comments on Reddit (with React/Redux)

## Run

View via Github Pages at [https://samvincent.github.io/react-sample-app/](https://samvincent.github.io/react-sample-app/)

**NOTE:** Github Pages does not allow us to enable CORS for Reddit, so Safari will not retrieve the comments. Chrome seems to be happy to allow the requests.

Build with `npm run build`

## Goal

Implement the comment section of Reddit threads via its official API.

Features

* Single page application (no refreshes).
* Render Reddit’s "reactjs" thread (http://www.reddit.com/r/reactjs.json).
* Clicking an item should render its discussion thread.
* Render a item’s discussion thread (Reddit comment trees) (http://www.reddit.com/r/reactjs/{thread ID}.json, ex: http://www.reddit.com/r/reactjs/4m16ud.json).
* Allow sorting of comments by upvotes, time, and upvote/downvote ratio.

## Rational

#### Data
Use `fetch` to asynchronously retrieve data which is then passed to the `reducer` for addition to the applications state.

Sorting functionality is processed recursively through comment depth at the container level using the stores global sort key and the thread's comment list to avoid unnecessarily updating the state tree.

#### Styling
Use `Radium` inline styling for components so styles are declared and scoped with a component. Reduces cluttering of the css folder and makes it trivial to delete a component and have the no longer necessary styles removed at the same time.

Use `CSS modules` where `scss` provides a development speed improvement.

React logo was just a quick experiment to see how css 3D translations perform.

#### Potential improvements
* Media queries implementation so UI works across mobile devices
* Removal of development only logger middleware
* Testing actions (potentially with redux-saga implementation)
* Testing of components, containers, reducers
* Network connection error message when disconnected
* Loading message while fetching
* Navigating through additional pages of threads and comments
* Use `ReactCSSTransitionGroup` for re-ordering on sort key change
* Allow for selection of alternate subreddits of interest

## Develop

Uses `react-hot-loader` for immediate feedback while developing

    npm install
    npm start
