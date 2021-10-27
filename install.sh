echo "Installing OhMyZSH..."
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

echo "Installing OhMyZSH plugins..."

echo "mcfly"
curl -LSfs https://raw.githubusercontent.com/cantino/mcfly/master/ci/install.sh | sh -s -- --git cantino/mcfly
echo 'eval "$(mcfly init zsh)"' >> ~/.zshrc


echo "starship"
sh -c "$(curl -fsSL https://starship.rs/install.sh)"
echo 'eval "$(starship init zsh)"' >> ~/.zshrc
