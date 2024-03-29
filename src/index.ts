import path from 'path';
import fs from 'fs';
import { DSLController } from '@nxapi/nxapi';
import { extractRoutes } from './route';
import { convertJoi } from './convert-joi';

const saveJoi = (content: string, savePath: string) => {
  const targetPath = path.resolve(process.cwd(), savePath);
  const exists = fs.existsSync(targetPath);
  if (!exists) {
    fs.mkdirSync(targetPath);
  }
  fs.writeFileSync(path.resolve(targetPath, 'joi.js'), content, 'utf8');
};

export default (controllerDsls: DSLController[], tmpRelativePath: string) => {
  const routes = extractRoutes(controllerDsls);
  let output = `const Joi = require('@hapi/joi');\nmodule.exports = {\n`;
  routes.forEach(route => {
    const routeJoi = convertJoi(route);
    output += `'${routeJoi['code']}': {
  path: '${routeJoi['path']}',
  request: ${routeJoi['request']},
  response: ${routeJoi['response']}
},\n`;
  });
  output += '}';
  saveJoi(output, tmpRelativePath);
  console.log('nxapi-dsl-joi success!');
};
