#!/usr/bin/env node

const fs = require('fs');

const content = fs.readFileSync('history', 'utf8');
const data = [];
content.split('\n').forEach(line => {
  // 只考虑 win stable
  if (!line.startsWith('win,stable,')) return;
  var parts = line.split(',');
  data.push({
    version: parts[2],
    date: parts[3]
  });
});

const list = data.map(item => {
  return `<li>
  <a href="https://sm.myapp.com/original/Browser/${item.version}_chrome_installer.exe">
    ${item.version}
  </a>
  ${item.date}
  </li>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <style>
    li > a {
      display: inline-block;
      width: 120px;
    }
  </style>
</head>
<body>
  <ul>
    ${list}
  </ul>
</body>
</html>`;

fs.writeFileSync('history.html', html);
