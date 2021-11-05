import "zx/globals";

const installBrew = async () => {
  const { exitCode } = await nothrow(
    $`eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" && brew help >> /dev/null`
  );

  if (exitCode === 0) {
    console.log("😉 skipping installing brew, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing homebrew...");

  await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;
  await $`echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.zshrc`;
  await $`echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> ~/.profile`;

  console.log("✅ homebrew installed!");
};

const installBrewfile = async () => {
  const { exitCode } = await nothrow(
    $`eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" && brew help >> /dev/null`
  );

  if (exitCode !== 0) {
    console.log("🙃 without brew, skipping brewfile");
    return;
  }

  console.log("🏋️‍♀️ installing from brewfile...");
  await $`eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)" && brew bundle`;
  console.log("✅ brewfile installed!");

  await $`echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc`;
  await $`echo 'eval "$(starship init zsh)"' >> ~/.zshrc`;
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
