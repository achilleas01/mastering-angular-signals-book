// collect-chapter-routes.mjs
import fs from 'fs/promises';
import path from 'path';

const appsDir = 'apps';
const chapters = [
  'chapter-01',
  'chapter-02',
  'chapter-03',
  'chapter-04',
  'chapter-05',
  'chapter-06',
  'chapter-07',
  'chapter-08',
];

const results = {};

// Regex to find routes with lazy-loaded components
// Example: { path: 'signal', loadComponent: () => import('./signal/signal.component').then(m => m.SignalComponent) },
// Example: { path: 'signal', loadComponent: () => { return import('./signal/signal.component').then(m => m.SignalComponent); } },
// Example: { path: 'effect', loadComponent: () => import('./effect/effect.component') },
// Example: { path: 'computed', loadComponent: () => import('@modern-angular-signals-book/common-pages').then(m => m.ComputedComponent) },
// Captures: 1=route path, 2=relative import base (optional), 3=library import path (optional), 4=library component name (optional)
const routeRegex =
  /{\s*path:\s*['"]([^'"]+)['"][^}]*?loadComponent:\s*\(\)\s*=>\s*(?:{\s*return\s*)?import\(['"](?:(\.\/[^'"]+)\.component|(@modern-angular-signals-book\/common-pages))['"]\)(?:\.then\(\(m\)\s*=>\s*m\.(\w+Component)\))?/gs;

async function processChapter(chapter) {
  const chapterPath = path.join(appsDir, chapter);
  const routesPath = path.join(chapterPath, 'src', 'app', 'app.routes.ts');
  results[chapter] = [];

  try {
    const content = await fs.readFile(routesPath, 'utf-8');
    let match;
    // Reset regex lastIndex before each execution on new content
    routeRegex.lastIndex = 0;
    while ((match = routeRegex.exec(content)) !== null) {
      const routePath = match[1];
      const relativeImportPathBase = match[2];
      const libraryImportPath = match[3];
      // const libraryComponentName = match[4]; // We don't strictly need the component name, just the path

      let examplePath = '';
      let isLibraryComponent = false;

      if (relativeImportPathBase) {
        // Handle relative path within the chapter app
        const exampleDirName = path
          .dirname(relativeImportPathBase)
          .substring(2) // Remove './'
          .split('/')
          .shift(); // Get first directory component
        if (exampleDirName) {
          examplePath = path
            .join(chapterPath, 'src', 'app', exampleDirName)
            .replace(/\\/g, '/');
        }
      } else if (libraryImportPath) {
        // Handle library path (@modern-angular-signals-book/common-pages)
        isLibraryComponent = true;
        // Assume the source directory in the library matches the route path
        examplePath = path
          .join('libs', 'common-pages', 'src', 'lib', routePath)
          .replace(/\\/g, '/');
      }

      if (examplePath) {
        results[chapter].push({
          route: routePath,
          examplePath: examplePath,
          isLibrary: isLibraryComponent, // Store whether it's from the library
        });
        // console.log(`[${chapter}] Found route: ${routePath} -> ${examplePath} (Library: ${isLibraryComponent})`);
      } else {
        // Warn if path couldn't be determined (should be rare with updated regex)
        console.warn(
          `[${chapter}] Could not determine path for route '${routePath}'. Skipping.`
        );
      }
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // It's okay if a chapter doesn't have a routes file, just skip it.
      // console.warn(`[${chapter}] app.routes.ts not found at ${routesPath}`);
    } else {
      console.error(
        `[${chapter}] Error reading or parsing ${routesPath}:`,
        error
      );
    }
  }
}

async function main() {
  // console.log('Collecting chapter routes and example paths...'); // Verbose logging
  for (const chapter of chapters) {
    await processChapter(chapter);
  }

  // Filter out chapters with no routes found
  const finalResults = Object.entries(results)
    .filter(([, routes]) => routes.length > 0)
    .reduce((acc, [chapter, routes]) => {
      // Sort routes alphabetically within each chapter
      acc[chapter] = routes.sort((a, b) => a.route.localeCompare(b.route));
      return acc;
    }, {});

  // Generate Markdown output
  console.log('# Chapter Example Paths\n');

  for (const chapter in finalResults) {
    const chapterNum = chapter.split('-')[1]; // Extract number like '01'
    console.log(`## Chapter ${parseInt(chapterNum, 10)}\n`); // Convert '01' to 1

    finalResults[chapter].forEach((item) => {
      const chapterName = chapter;
      const routePath = item.route;
      const examplePath = item.examplePath;
      const isLibrary = item.isLibrary;

      const locationText = isLibrary
        ? `This example uses a shared component located in the library at \`${examplePath}\`.`
        : `You can find the code of this example at \`${examplePath}\`.`;

      console.log(
        `${locationText} You can follow these commands to see the project:`
      );
      console.log(`From the code repository root, run the following:`);
      console.log('```bash');
      console.log(`nx serve ${chapterName}`);
      console.log(`# or npx nx serve ${chapterName}`);
      console.log('```'); // Removed extra newline
      console.log(
        `Then, navigate to http://localhost:4200/${routePath} to see the example\n`
      ); // Added "to see the example"
    });
  }

  // Optional: Print just the paths for easy copying (commented out)
  // console.log('\n--- Example Paths Only ---'); // Header for paths
  // Object.values(finalResults).flat().forEach(item => console.log(item.examplePath));
  // console.log('--------------------------'); // Footer for paths
}

main();
