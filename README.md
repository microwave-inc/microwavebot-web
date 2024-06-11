# Microwave Bot Website

Welcome to the Microwave Bot Website repository! This is the source code for the Microwave Bot website, this contains the documentation to turn this website into your own!

## Initial Setup

To get started, you will need to install the following:

```txt
Node.JS
Git
```

Now once you have both of those installed, you will need to clone this repository, to do this, run the following command:

```bash
git clone microwave-inc/microwavebot-web
cd microwavebot-web
```

Now you will need to install the dependencies, to do this, run the following command:

```bash
npm install
```

That should install all needed dependencies, now you can run the website, to do this, run the following command:

```bash
linux:
    sudo nodemon #Linux only (sudo is required to run on port 80)
windows:
    nodemon # NOTE: Is not tested on windows, if you have any issues, please open an issue on the repository
```

Now you should be able to access the website on `http://localhost`!

## Additional Setup

If you wish to setup an .env file for the website, you can do so by creating a file called `.env` in the root directory of the repository, and adding the following:

```env
PORT = 80 # The port to run the website on // Has ability to utilize https granted both key and privatekey are there
STATUS = DEVELOPMENT # The status of the website, can be either DEVELOPMENT or PRODUCTION will be used for things later on
```

## Contributing

If you wish to contribute to this repository, you can do so by forking this repository, making your changes, and then opening a pull request to this repository, once you have done that, we will review your pull request and merge it if it is good!

## License

This repo and all others in the Microwave Inc. organization are licensed under the GNU GPLv3 license, you can view the license [here](https://github.com/microwave-inc/microwavebot-web/blob/main/LICENSE)
