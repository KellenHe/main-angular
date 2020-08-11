import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getJSON } from '../utils/json';
import * as process from 'child_process';

export function ngAdd(_options: any): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const pkg = getJSON(host, `package.json`);
    let ngCoreVersion = pkg.dependencies['@angular/core'] as string;
    if (/^[\^|\~]/g.test(ngCoreVersion)) {
      ngCoreVersion = ngCoreVersion.substr(1);
    }
    if (!ngCoreVersion.startsWith('9.')) {
      throw new Error(
        `Sorry, the current version only supports angular 9.x, pls downgrade the global Anguar-cli version: [yarn global add @angular/cli@9.x] (or via npm: [npm install -g @angular/cli@9.x])`,
      );
    }

    // install ng-alain
    const cmd = 'ng add ng-alain';
    process.exec(cmd, (error, stdout, stderr) => {
      console.log(`errors: ${error}`);
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  };
}
