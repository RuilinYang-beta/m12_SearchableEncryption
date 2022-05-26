# About
This app is part of [my Bachelor Thesis](https://ruilinyang-beta.github.io/pdf/m12_thesis.pdf) at University of Twente. 

This app is for visualization of Searchable Encryption schemes to make it easier to understand the working mechanism of them. 
It is intended for interested students and researchers. 

Currently there is only one scheme implemented based on [Song et al (2000)](https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=848445&casa_token=Cc_UaOMrpjkAAAAA:Rwo-f1UYjeYxBLGbdvcT-qHldwY7QBw4xVgaPh_lOZNO4dsBGXmybVOioGfhCDaNQPpKITEp) (see reference). 

# Start the app from an executable
Currently there is no release for OSX (because I haven't figure out how to sign it yet), but OSX users can start the app from source code (see below). 

For Windows and Linux users, please go to the [release page](https://github.com/RuilinYang-beta/SearchableEncryption/releases/tag/v1.0.0) and download the release that suits your computer. 
The naming for the releases is:  
`SEVis-<Operating System>-<CPU architecture>`

"SEVis" is short for "Searchable Encryption Visualization".

# Start the app from code
You can downloade the source code by:  

```git clone https://github.com/RuilinYang-beta/SearchableEncryption.git```

If you do not have it installed on your computer yet, you need to: 
* First, install [node.js runtime](https://nodejs.org/en/download/)
* Then, go to the folder that containts the cloned files, start a terminal and install `electron` by the command `npm install electron --save-dev`
* Finally, start the application by running `npm start`.

# References
Song, D. X., Wagner, D., & Perrig, A. (2000, May). Practical techniques for searches on encrypted data. In Proceeding 2000 IEEE Symposium on Security and Privacy. S&P 2000 (pp. 44-55). IEEE.
