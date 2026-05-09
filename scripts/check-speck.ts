import fs from 'fs';
import path from 'path';

/**
 * 对照开发规范 Markdown 文档
 * 标记不符合规范的组件 / 页面
 */
const specFile = path.resolve('docs/development-spec.md');
const projectDir = path.resolve('src');

function checkSpec() {
  const spec = fs.readFileSync(specFile, 'utf-8');
  const components = fs.readdirSync(path.join(projectDir, 'components'));

  components.forEach(c => {
    if (!spec.includes(c)) {
      console.warn(`⚠️ 组件 ${c} 未在规范文档中声明`);
    }
  });

  console.log("✅ 规范检查完成");
}

checkSpec();
