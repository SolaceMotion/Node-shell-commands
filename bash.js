const commands = require('./commands');

//Parse command line arguments
let args = process.argv.slice(2);

process.stdout.write('prompt > ');

if (args.length === 2) {
  commands.evaluateCmd(args.join(' '));
} else {
  process.stdout.write('too many arguments.\n');
}

process.stdin.on('data', userInput => {
  userInput = userInput.toString().trim();
  commands.evaluateCmd(userInput);
});
