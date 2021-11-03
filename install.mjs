#!/usr/bin/env zx

const installBrew = async () => {
  const { exitCode } = await $`brew help >> /dev/null`;

  if (exitCode === 0) {
    console.log(`skipping brew, since it is already installed`);
    return;
  }

  const brew = $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
  brew.stdin.write("\n");
  await brew;

  await $`echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/codespace/.profile`;
  await $`eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"`;
  await $`source /home/codespace/.profile`;
};

await installBrew();
