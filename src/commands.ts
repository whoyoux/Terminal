type ICommand = {
    slug: string;
    name: string;
    description?: string;
    callback?: Function;
    output?: string;
};

const commandsList: ICommand[] = [
    {
        slug: 'help',
        name: 'Help',
        output: `List of commands: <br />
        - help<br />
        - sqrt (number) -> number<br/>
        - clear<br/>
        - details (command)<br/>
        - binary (number)
        `
    },
    {
        slug: 'clear',
        name: 'Clear',
        description: 'Clear the terminal'
    },
    {
        slug: 'sqrt',
        name: 'Square root',
        callback: (args: string[]) => {
            if (!Number(args[0])) return 'Argument must be a number!';
            return `Square root of ${args[0]} is ${Number(args[0]) ** 2}`;
        }
    },
    {
        slug: 'say',
        name: 'Say',
        callback: (args: string[]) => {
            return `${args.join(' ')}`;
        }
    },
    {
        slug: 'details',
        name: 'Details',
        callback: (args: string[]) => {
            const comm = commandsList.find((c) => c.slug === args[0]);

            if (args.length <= 0)
                return 'Please provide a command to show details';

            return comm?.description
                ? comm?.description
                : 'No description found';
        }
    },
    {
        slug: 'binary',
        name: 'Binary',
        description: 'Change a number to binary system',
        callback: (args: string[]) => {
            if (!Number(args[0])) return 'Argument must be a number!';
            return `${Number(args[0]).toString(2)}`;
        }
    }
];

export { commandsList };
