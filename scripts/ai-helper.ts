import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * 使用 Ollama 本地 AI 生成或优化代码
 * prompt: 提示文本
 * outputFile: 可选，生成代码写入文件
 */
export function runAI(prompt: string, outputFile?: string) {
  try {
    const result = execSync(`ollama run qwen2.5-coder:7b -p "${prompt}"`);
    const code = result.toString();

    if (outputFile) {
      const filePath = path.resolve(outputFile);
      fs.writeFileSync(filePath, code, { encoding: 'utf-8' });
      console.log(`✅ 已生成到 ${filePath}`);
    } else {
      console.log(code);
    }

    return code;
  } catch (err) {
    console.error("❌ AI 生成失败:", err);
    return null;
  }
}
