'use strict'

const http = requier('http');
const fs = requier('fs');
const path = requier('path');
const url = requier('url');


const contentTypes = {
  '.html' : 'text/html',
  '.css' : 'text/css',
  '.js' : 'application/javascript',
  '.json' : 'application/json',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.gif' : 'image/gif'
};


