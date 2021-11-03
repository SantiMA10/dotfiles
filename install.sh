#!/bin/bash

# Check for Homebrew.
if [ ! -x "$(command -v brew 2>/dev/null)" ]; then
  echo "Installing brew..."
  yes '' | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  /bin/bash -c "$(echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/codespace/.profile)"
  /bin/bash -c "$(eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)")"
fi

echo "Installing OhMyZSH..."
/bin/bash -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "Installing OhMyZSH plugins..."

echo "mcfly"
brew tap cantino/mcfly
brew install mcfly
echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc


echo "starship"
brew install starship
echo 'eval "$(starship init zsh)"' >> ~/.zshrc

if [ "$(uname -s)" != "Darwin" ]; then
  echo 'Skiping fonts, since it only works on macOS!' >&2
  exit 1
else
  echo "Installing fonts..."
  brew tap homebrew/cask-fonts
  brew install font-jetbrains-mono-nerd-font
fi

source ~/.zshrc
