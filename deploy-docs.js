/* eslint-disable no-console */
const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { existsSync } from "fs";

(async () => {
  try {
    await exec("git checkout --orphan gh-pages");
    console.log("Checked out gh-pages")
    await exec("npm run build");
    console.log("Built docs")
    const folderName = existsSync("docs/.vitepress/dist") ? "docs/.vitepress/dist" : "build";
    await exec(`git --work-tree ${folderName} add --all`);
    await exec(`git --work-tree ${folderName} commit -m gh-pages`);
    await exec(`git push origin HEAD:gh-pages --force`);
    console.log("Docs built, tidying up")
    await exec(`rm -r ${folderName}`);
    await exec("git checkout -f main");
    await exec("git branch -D gh-pages");
    console.log("Doc publish complete")
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();