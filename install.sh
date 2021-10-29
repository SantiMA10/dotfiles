echo "Installing brew..."
yes '' | /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/codespace/.profile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

echo "Installing OhMyZSH..."
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "Installing OhMyZSH plugins..."

echo "mcfly"
brew tap cantino/mcfly
brew install mcfly
echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc


echo "starship"
brew install starship
echo 'eval "$(starship init zsh)"' >> ~/.zshrc

# echo "Installing fonts..."
# brew tap homebrew/cask-fonts
# brew install font-jetbrains-mono-nerd-font