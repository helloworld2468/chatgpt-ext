(function(Scratch) {
  'use strict';
  let cache = {};
  let conf = {
    apikey: '',
    model: '',
    temp: 70,
    token: 128,
  };
  let lastAnswer = ''; // New variable to store the last answer

  const completions = [
    'text-davinci-003',
    'text-davinci-002',
    'text-curie-001',
    'text-babbage-001',
    'text-ada-001'
  ];
  const chat_completions = [
    'gpt-3.5-turbo-0301',
    'gpt-3.5-turbo',
    'gpt-4-32k-0314',
    'gpt-4-32k',
    'gpt-4-0314',
    'gpt-4'
  ];
  const all_completions = [...completions, ...chat_completions];

  // ... (existing code)

  class ChatGPT {
    getInfo() {
      return {
        id: 'openai',
        name: 'ChatGPT',
        color1: '#0e0e0e',
        blocks: [
          {
            opcode: 'ask',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ask chatgpt [text]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hi'
              }
            },
            disableMonitor: true,
          },
          {
            opcode: 'answer',
            blockType: Scratch.BlockType.REPORTER, // New reporter block
            text: 'ChatGPT answer',
          },
          {
            opcode: 'customize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'customize the apikey [apikey] model [model] max tokens [token] temperature [temp] (0-100) (risky)',
            arguments: {
              // ... (existing code)
            },
          },
          {
            func: 'donate',
            blockType: Scratch.BlockType.BUTTON,
            text: 'donate'
          },
        ],
        menus: {
          models: all_completions,
        }
      };
    }

    async ask({ text }) {
      const content = text.trim();
      if (!content) return 'Please enter the content!';
      if (cache[text]) return cache[text];
      try {
        lastAnswer = await request(text); // Store the answer in the lastAnswer variable
        return lastAnswer; // Return the answer
      } catch (e) {
        console.error(e);
        return e.message;
      }
    }

    answer() {
      return lastAnswer; // Return the last stored answer
    }

    customize(args) {
      conf = args;
      return 'The openai apikey has been set. Note that customizing the apikey is risky!';
    }

    donate() {
      Scratch.openWindow('https://afdian.net/@zmh-program');
    }
  }

  Scratch.extensions.register(new ChatGPT());
})(Scratch);
