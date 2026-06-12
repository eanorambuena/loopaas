const fs = require('fs');
const handlerPath = '.open-next/server-functions/default/handler.mjs';
let content = fs.readFileSync(handlerPath, 'utf-8');

const nodeBuiltinsToMock = ['fs', 'vm', 'http', 'https', 'child_process', 'worker_threads', 'net', 'tls', 'dns', 'cluster', 'module'];
for (const mod of nodeBuiltinsToMock) {
  const regex = new RegExp('require\\("' + mod + '"\\)', 'g');
  content = content.replace(regex, '({})');
  const regex2 = new RegExp('require\\("node:' + mod + '"\\)', 'g');
  content = content.replace(regex2, '({})');
}

for (const mod of nodeBuiltinsToMock) {
  const regex = new RegExp("require\\('" + mod + "'\\)", 'g');
  content = content.replace(regex, '({})');
  const regex2 = new RegExp("require\\('node:" + mod + "'\\)", 'g');
  content = content.replace(regex2, '({})');
}

fs.writeFileSync(handlerPath, content);
console.log('Patched handler.mjs');

for (const mod of nodeBuiltinsToMock) {
  const count1 = (content.match(new RegExp('require\\("' + mod + '"', 'g')) || []).length;
  const count2 = (content.match(new RegExp("require\\('" + mod, 'g')) || []).length;
  if (count1 + count2 > 0) console.log('  ' + mod + ': ' + (count1 + count2));
}

const extraBuiltins = ['path', 'util', 'crypto', 'stream', 'buffer', 'url', 'zlib', 'assert', 'events', 'os', 'constants', 'string_decoder', 'async_hooks'];
for (const mod of extraBuiltins) {
  const count1 = (content.match(new RegExp('require\\("' + mod + '"', 'g')) || []).length;
  const count2 = (content.match(new RegExp("require\\('" + mod + "'", 'g')) || []).length;
  if (count1 + count2 > 0) console.log('  ' + mod + ': ' + (count1 + count2));
}
