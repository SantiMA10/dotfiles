#!/usr/bin/env zx

const installBrew = async () => {
  const { exitCode } = await nothrow($`brew help >> /dev/null`);

  if (exitCode === 0) {
    console.log("😉 skipping brew, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing homebrew...");
  const brewInstaller = $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
  brewInstaller.stdin.write("\n");
  await brewInstaller;
  await $`echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc`;
  await $`eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"`;
  console.log("✅ homebrew installed!");
};

const installMcFly = async () => {
  const { exitCode } = await nothrow($`brew upgrade mcfly >> /dev/null`);

  if (exitCode === 0) {
    console.log("😉 skipping McFly, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing McFly...");
  await $`brew tap cantino/mcfly`;
  await $`brew install mcfly`;
  await $`echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc`;
  console.log("✅ McFly installed!");
};

const installStarship = async () => {
  const { exitCode } = await nothrow($`brew upgrade starship >> /dev/null`);

  if (exitCode === 0) {
    console.log("😉 skipping Starship, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing Starship...");
  await $`brew install starship`;
  await $`echo 'eval "$(starship init zsh)"' >> ~/.zshrc`;
  console.log("✅ Starship installed!");
};

await installBrew();
await installMcFly();
await installStarship();
