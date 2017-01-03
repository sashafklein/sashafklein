An experiment with **Express** and **React**, to get a better sense for both technologies.

I built out three React components -- a *Gallery*, a *GalleryLoader*, and a *GallerySearch* component -- and created a straightforward responsive image carousel from them. The Gallery component is self-standing (and can be used with a simple array of images), but draws added functionality from the other two.

The images are pulled from the Pixabay API, and the GallerySearch component allows users to update the carousel images by performing a new image keyword search through the API.

![gallery](https://dl.dropboxusercontent.com/s/6qq89s7pkye7ory/node-gallery.gif?dl=0)

Going forward, I want to improve the project by

- Allowing for jump-to-image functionality, by displaying a subset of prior and future images below the shown image,

- Passing the API call through the backend, to obscure the (free) API key,

- Rewriting the `.jsx` files as CoffeeScript, and have Gulp compile the `.coffee`,

- Separating the Gallery component into its own file or package, included here (and elsewhere) as an external dependency.