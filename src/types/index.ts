import { Client, Collection, Message, VoiceConnection } from 'discord.js';

interface Queue {
    songs: Array<any>
    dispatcher: any
    connection: VoiceConnection
    volume: number,
}

interface CustomClient extends Client {
    commands?: Collection<string, any>
    queues?: Map<string, Queue>
    searches?: Map<string, any>
}

interface Command {
    help: string,
    name: string,
    execute(bot: CustomClient, msg: Message, args: Array<string>): any
}
export { CustomClient, Command }