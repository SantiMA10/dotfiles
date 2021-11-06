import "zx/globals";

const isConfigured = async (config, file = ".zshrc") => {
  const filepath = `${os.homedir()}/${file}`;

  const content = await fs.readFile(filepath);
  const configured = content.toString().includes(config);

  console.log(
    `${
      configured ? "✅" : "❌"
    } checking if ${filepath} is configured: ${config}`
  );

  return configured;
};

const getHomebrewPath = () => {
  if (os.platform() === "darwin") {
    return "/usr/local/bin/brew";
  }

  if (os.platform() === "linux") {
    return "/home/linuxbrew/.linuxbrew/bin/brew";
  }

  throw new Error(`unsupported platform: ${os.platform()}`);
};

const installBrew = async () => {
  const { exitCode } = await nothrow(
    $`eval "$(${getHomebrewPath()} shellenv)" && brew help >> /dev/null`
  );

  if (exitCode === 0) {
    console.log("😉 skipping installing brew, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing homebrew...");

  await $`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`;

  if (!(await isConfigured('eval "$(${getHomebrewPath()} shellenv)"'))) {
    console.log("📝 adding brew to .zshrc");
    await $`echo 'eval "$(${getHomebrewPath()} shellenv)"' >> ~/.zshrc`;
  }

  if (
    !(await isConfigured('eval "$(${getHomebrewPath()} shellenv)"', ".profile"))
  ) {
    console.log("📝 adding brew to .profile");
    await $`echo 'eval "$(${getHomebrewPath()} shellenv)"' >> ~/.profile`;
  }

  console.log("✅ homebrew installed!");
};

const installBrewfile = async () => {
  const { exitCode } = await nothrow(
    $`eval "$(${getHomebrewPath()} shellenv)" && brew help >> /dev/null`
  );

  if (exitCode !== 0) {
    console.log("🙃 without brew, skipping brewfile");
    return;
  }

  console.log("🏋️‍♀️ installing from brewfile...");
  await $`eval "$(${getHomebrewPath()} shellenv)" && brew bundle`;
  console.log("✅ brewfile installed!");

  if (!(await isConfigured('eval "$(mcfly init zsh)"'))) {
    console.log("📝 adding mcfly to .zshrc");
    await $`echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc`;
  }

  if (!(await isConfigured('eval "$(starship init zsh)"'))) {
    console.log("📝 adding starship to .zshrc");
    await $`echo 'eval "$(starship init zsh)"' >> ~/.zshrc`;
  }
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
  await $`curl https://sdk.cloud.google.com > install-gcloud.sh`;
  await $`bash install-gcloud.sh --disable-prompts`;
  await $`rm install-gcloud.sh `;
  console.log("✅ gcloud installed!");

  if (!(await isConfigured('source "$HOME/google-cloud-sdk/path.zsh.inc"'))) {
    console.log("📝 adding gcloud path to .zshrc");
    await $`echo 'source "$HOME/google-cloud-sdk/path.zsh.inc"' >> ~/.zshrc`;
  }

  if (
    !(await isConfigured('source "$HOME/google-cloud-sdk/completion.zsh.inc"'))
  ) {
    console.log("📝 adding gcloud completion to .zshrc");
    await $`echo 'source "$HOME/google-cloud-sdk/completion.zsh.inc"' >> ~/.zshrc`;
  }
};

try {
  await installBrew();
  await installBrewfile();
} catch (e) {
  console.log("😢 something goes wrong during the homebrew installation");
}

await installGcloudSDK();
