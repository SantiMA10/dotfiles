import "zx/globals";

const installBrew = async () => {
  const { exitCode } = await nothrow($`brew help >> /dev/null`);

  if (exitCode === 0) {
    console.log("😉 skipping installing brew, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing homebrew...");

  const brewInstaller = $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
  brewInstaller.stdin.write("\n");
  await brewInstaller;

  await $`echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc`;
  await $`echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.profile`;

  await $`eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"`;
  await $`exec -l $SHELL`;

  console.log("✅ homebrew installed!");
};

const installBrewfile = async () => {
  const { exitCode } = await nothrow($`brew help >> /dev/null`);

  if (exitCode !== 0) {
    console.log("🙃 without brew, skipping brew file");
    return;
  }

  console.log("🏋️‍♀️ installing from brewfile...");
  await $`brew bundle`;
  console.log("✅ brewfile installed!");

  await $`echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc`;
  await $`echo 'eval "$(starship init zsh)"' >> ~/.zshrc`;
};

const installFonts = async () => {
  if (os.platform() !== "darwin") {
    console.log("😞 skipping font installation, since it is only for macOS");
    return;
  }

  const { exitCode } = await nothrow(
    $`brew upgrade font-jetbrains-mono-nerd-font >> /dev/null`
  );

  if (exitCode === 0) {
    console.log("😉 skipping fonts, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing fonts...");
  await $`brew tap homebrew/cask-fonts`;
  await $`brew install font-jetbrains-mono-nerd-font`;
  console.log("✅ Fonts installed!");
};

const installGcloudSDK = async () => {
  if (!["darwin", "linux"].includes(os.platform())) {
    console.log(
      "😞 skipping gcloud installation, since it is only for macOS/Linux"
    );
    return;
  }

  const { exitCode: exitCodePython } = await nothrow($`python -V >> /dev/null`);

  if (exitCodePython !== 0) {
    console.log("😉 skipping gcloud, since it needs python");
    return;
  }

  const { exitCode } = await nothrow($`gcloud -v >> /dev/null`);

  if (exitCode === 0) {
    console.log("😉 skipping gcloud, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing gcloud...");
  // https://github.com/google/zx/blob/main/examples/interactive.mjs 👀

  let { stdin, stdout } = $`curl https://sdk.cloud.google.com | bash`;
  // stdin.write("\n");
  // stdin.write("N\n");

  console.log("✅ gcloud installed!");
};

try {
  await installBrew();
  await installBrewfile();
} catch (e) {
  console.log("😢 something goes wrong during the homebrew installation");
}

// await installGcloudSDK();
