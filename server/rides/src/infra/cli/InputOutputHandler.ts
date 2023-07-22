type Commands = { [key: string]: any }

export abstract class InputOutputHandler {
  commands: Commands = {}

  on(command: string, callback: Function) {
    this.commands[command] = callback
  }

  async type(text: string) {
    const [command] = text.split(' ')
    if (!this.commands[command]) return
    const params = text.replace(command, '').trim()
    return this.commands[command](params)
  }

  abstract write(text: string): void
}