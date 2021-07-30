const fs = require('fs');

function print(output) {
  process.stdout.write(output); //Write buffer to stdout
  process.stdout.write('\n\nprompt > ');
}

const commandHandler = {
  echo: function (userInput) {
    print(userInput);
  },
  cat: function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;

      const text = data.toString('utf-8');
      const buffer = Buffer.from(text, 'utf-8');
      print(buffer);
    });
  },
  tac: function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;

      const text = data.toString('utf-8');
      const slicedText = text.split('\n');

      const reversed = new Array();
      for (let i = slicedText.length; i >= 0; i--) {
        reversed.push(slicedText[i]);
      }

      const buffer = Buffer.from(reversed.join('\n'), 'utf-8');
      print(buffer);
    });
  },
  head: function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;

      const text = data.toString('utf-8');
      const slicedText = text.split('\n').slice(0, 10).join('\n');
      const bufferText = Buffer.from(slicedText, 'utf-8');

      print(bufferText);
    });
  },
  tail: function (fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) {
        throw err;
      }

      const text = data.toString('utf-8');
      const slicedText = text.split('\n').slice(-10, text.length).join('\n');
      const bufferText = Buffer.from(slicedText, 'utf-8');

      print(bufferText);
    });
  },
};

function evaluateCmd(userInput = '') {
  const userInputArray = userInput.split(' ');
  const command = userInputArray[0]; //select command name

  switch (command) {
    case 'echo':
      commandHandler.echo(userInputArray.slice(1).join(' '));
      break;
    case 'cat':
      commandHandler.cat(userInputArray.slice(1));
      break;
    case 'tac':
      commandHandler.tac(userInputArray.slice(1));
      break;
    case 'head':
      commandHandler.head(userInputArray.slice(1));
      break;
    case 'tail':
      commandHandler.tail(userInputArray.slice(1));
      break;
    default:
      process.stdout.write(`command not found: ${command}`);
  }
}

module.exports = { evaluateCmd };
