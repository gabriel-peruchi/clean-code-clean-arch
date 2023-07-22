import { InputOutputHandler } from "./InputOutputHandler";

export class NodeInputOutputHandler extends InputOutputHandler {
  constructor() {
    super()
    process.stdin.on('data', async (chunk) => {
      const command = chunk.toString().replace(/\n/g, '')
      await this.type(command)
    })
  }

  write(text: string) {
    process.stdout.write(text + '\n')
  }
}