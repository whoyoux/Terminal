import { useState, useRef } from 'react';

import { commandsList } from './commands';

const TERMINAL_PREFIX = '<br /> <span class="green"><<</span> ';
const USER_PREFIX = '<br /> <span class="green">>></span> ';

type Command = {
    name: string;
    params: string[];
};

function App() {
    const output = useRef<HTMLDivElement>(null);
    const [command, setCommand] = useState<string>('');
    const [history, setHistory] = useState<Command[]>([]);

    const addToOutput = (str: string) => (output!.current!.innerHTML += str);

    const evalCommand = (comm: Command) => {
        if (!!!output) return;

        addToOutput(
            USER_PREFIX +
                `<span class="blue">${comm.name}</span> ${comm.params.join(
                    ' '
                )}`
        );

        const foundCommand = commandsList.filter(
            (_comm) => _comm.slug === comm.name
        );
        if (foundCommand[0] && foundCommand[0].output) {
            addToOutput(TERMINAL_PREFIX + foundCommand[0].output);

            return;
        }

        if (foundCommand[0] && foundCommand[0].callback) {
            addToOutput(
                TERMINAL_PREFIX + foundCommand[0].callback(comm.params)
            );

            return;
        }

        addToOutput(
            TERMINAL_PREFIX +
                "Command not found! Please type 'help' to see list of commands."
        );
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (command.length < 1) return;

        const commandsArray = command
            .split(/(\s+)/)
            .filter((e) => e.trim().length > 0);

        const [, ...onlyParams] = commandsArray;

        const commandsObject: Command = {
            name: commandsArray[0],
            params: onlyParams ? [...onlyParams] : []
        };

        setHistory([...history, commandsObject]);

        if (command === 'clear') {
            output!.current!.innerText = '';
            setCommand('');
            return;
        }

        evalCommand(commandsObject);

        setCommand('');
    };

    return (
        <main>
            <div id="terminal__output" ref={output}>
                Terminal <br />
                <br />
                Please type <span className="blue">'help'</span> to show list of
                commands
            </div>
            <form id="terminal__prompt" onSubmit={onSubmit}>
                <p className="green">[user]</p>
                <input
                    type="text"
                    id="terminal__input"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    autoComplete="off"
                ></input>
            </form>
        </main>
    );
}

export default App;
