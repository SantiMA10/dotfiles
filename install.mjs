#!/usr/bin/env zx

const installBrew = async () => {
  const { exitCode } = await nothrow($`brew help >> /dev/null`);

  if (exitCode === 0) {
    console.log("😉 skipping brew, since it is already installed");
    return;
  }

  console.log("🏋️‍♀️ installing homebrew...");
  console.log("✅ homebrew installed!");
};

await installBrew();
