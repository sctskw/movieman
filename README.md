MovieMan
========

A simple app to manage and maintain your favorite movie collection.

Read the [Specification Document](https://github.com/sctskw/movieman/wiki/Spec-Doc)


### Installation
```
git clone https://github.com/sctskw/movieman.git && cd movieman
npm install
npm start
```

### Demo

You may log into the application with any username/password combination. Once logged in, the user you chose, will be able to add favorites. Next time you log in as this user, your collection will be available. We have also pre-populated a user to help you get started:

Username/Password: demo/demo

### Testing
```
npm test
```

### Browser Support
- Chrome [_best viewing experience_]
- Firefox
- Safari

### Known Issues
- Authentication [#1](../../issues/1):
    - Currently, authentication does not check against a user database. You can enter any username/password combination and you will be logged in as that user. Passwords are not saved or stored anywhere.

- Search Page Not Remembering Favorites [#2](../../issues/2):
    - Currently, the search page does not show you if you have already favorited a movie. This feature will be added in a future release.

- Minification of Static Files [#3](../../issues/3):
    - Currently, the Javascript and CSS Stylesheets are not minimized for debugging purposes
