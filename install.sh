#!/bin/sh
set -eu

#region logging setup
if [ "${MISE_DEBUG-}" = "true" ] || [ "${MISE_DEBUG-}" = "1" ]; then
  debug() {
    echo "$@" >&2
  }
else
  debug() {
    :
  }
fi

if [ "${MISE_QUIET-}" = "1" ] || [ "${MISE_QUIET-}" = "true" ]; then
  info() {
    :
  }
else
  info() {
    echo "$@" >&2
  }
fi

error() {
  echo "$@" >&2
  exit 1
}

warn() {
  echo "$@" >&2
}
#endregion

#region environment setup
get_os() {
  case "$(uname -s)" in
  Darwin) echo "macos" ;;
  Linux) echo "linux" ;;
  *) error "unsupported OS: $(uname -s)" ;;
  esac
}

get_arch() {
  os_libc=""
  if type ldd >/dev/null 2>/dev/null; then
    case "${MISE_INSTALL_MUSL-}" in
    1 | true) os_libc="-musl" ;;
    *)
      case "$(uname -o 2>/dev/null)" in
      Android) os_libc="-musl" ;;
      *)
        if ldd /bin/ls 2>/dev/null | grep -q 'musl'; then
          os_libc="-musl"
        fi
        ;;
      esac
      ;;
    esac
  fi

  hw_arch="$(uname -m)"
  case "$hw_arch" in
  x86_64) echo "x64$os_libc" ;;
  aarch64 | arm64) echo "arm64$os_libc" ;;
  armv7l) echo "armv7$os_libc" ;;
  *) error "unsupported architecture: $hw_arch" ;;
  esac
}

get_ext() {
  if [ -n "${MISE_INSTALL_EXT:-}" ]; then
    echo "$MISE_INSTALL_EXT"
  elif [ -n "${MISE_VERSION:-}" ] && echo "$MISE_VERSION" | grep -q '^v2024'; then
    # 2024 versions don't have zstd tarballs
    echo "tar.gz"
  elif tar_supports_zstd; then
    echo "tar.zst"
  elif command -v zstd >/dev/null 2>&1; then
    echo "tar.zst"
  else
    echo "tar.gz"
  fi
}

tar_supports_zstd() {
  # tar is bsdtar or version is >= 1.31
  if tar --version | grep -q 'bsdtar' && command -v zstd >/dev/null 2>&1; then
    true
  elif tar --version | grep -q '1\.(3[1-9]|[4-9][0-9]'; then
    true
  else
    false
  fi
}

shasum_bin() {
  if command -v shasum >/dev/null 2>&1; then
    echo "shasum"
  elif command -v sha256sum >/dev/null 2>&1; then
    echo "sha256sum"
  else
    error "mise install requires shasum or sha256sum but neither is installed. Aborting."
  fi
}

get_checksum() {
  version=$1
  os=$2
  arch=$3
  ext=$4
  url="https://github.com/jdx/mise/releases/download/v${version}/SHASUMS256.txt"

  # For current version use static checksum otherwise
  # use checksum from releases
  if [ "$version" = "v2026.2.22" ]; then
    checksum_linux_x86_64="1db50c032ecad08a4715218e8b5d4a3346e239061533d9b7cac14e24f3cd9f16  ./mise-v2026.2.22-linux-x64.tar.gz"
    checksum_linux_x86_64_musl="48ceb360cf3008b0f6014f48ae2a88d3b3516a872a050dd953798c21aa0d9412  ./mise-v2026.2.22-linux-x64-musl.tar.gz"
    checksum_linux_arm64="d416771380c5c2bc11314d934794eb7c98991d31d8984d0ce8fbb95ccccf0e55  ./mise-v2026.2.22-linux-arm64.tar.gz"
    checksum_linux_arm64_musl="129230e12adc03286f2e39140a6a7d554a4f373489e979542d1f3eaca1f2d1c6  ./mise-v2026.2.22-linux-arm64-musl.tar.gz"
    checksum_linux_armv7="c688f36886175d9b60c4aa0bb1bdab342eaa0826f0ece2aa8af70ef527de6af1  ./mise-v2026.2.22-linux-armv7.tar.gz"
    checksum_linux_armv7_musl="0f21155c06261bee62887b713b5166e7b2537fe46d47bb1b8163dce328afa82c  ./mise-v2026.2.22-linux-armv7-musl.tar.gz"
    checksum_macos_x86_64="3f8a18ba49e7b0a4da6003ee5615b98063819d0aa148970f9eb17a72d14b2404  ./mise-v2026.2.22-macos-x64.tar.gz"
    checksum_macos_arm64="6921e11490743a50b54b035a0d0cb5749e1e96bb11d3bbc95994aef4425f2244  ./mise-v2026.2.22-macos-arm64.tar.gz"
    checksum_linux_x86_64_zstd="ef25f79576ca7c650c2e9a94570bea141451aa2edf32d647020fa7376b701929  ./mise-v2026.2.22-linux-x64.tar.zst"
    checksum_linux_x86_64_musl_zstd="77e069e8161b94ffbcf83bd2ee8e8e9a56ec647f3a3f3ca8de52860eb8ad943f  ./mise-v2026.2.22-linux-x64-musl.tar.zst"
    checksum_linux_arm64_zstd="07c7c7a5ad72cd2e3962826883111df532d9f582518f643c7b8f8bebf74b125d  ./mise-v2026.2.22-linux-arm64.tar.zst"
    checksum_linux_arm64_musl_zstd="5f70c98584f1748fa9bfc19e8c103c4f3af7613f04387daa61cea22d761792e1  ./mise-v2026.2.22-linux-arm64-musl.tar.zst"
    checksum_linux_armv7_zstd="020772dcdbd53c6f94ffcdb37e57197a4d1ab9a74471037ebf8a4ed8830032c3  ./mise-v2026.2.22-linux-armv7.tar.zst"
    checksum_linux_armv7_musl_zstd="90cde91e0646eaabc65125ac303bb64d6cd7658e4b3bcc2d58d5271eb98900fb  ./mise-v2026.2.22-linux-armv7-musl.tar.zst"
    checksum_macos_x86_64_zstd="56d0623ec38cb84f95fcaaf0ac7398f30178481d0ed553adc88e7f088d0f05bb  ./mise-v2026.2.22-macos-x64.tar.zst"
    checksum_macos_arm64_zstd="b76ba794144ccc8ce64b5fb848845c470eb739b5202cfd7d12c32d5326b6c91f  ./mise-v2026.2.22-macos-arm64.tar.zst"

    case "$os-$arch-$ext" in
    linux-x64-tar.zst) echo "$checksum_linux_x86_64_zstd" ;;
    linux-x64-musl-tar.zst) echo "$checksum_linux_x86_64_musl_zstd" ;;
    linux-arm64-tar.zst) echo "$checksum_linux_arm64_zstd" ;;
    linux-arm64-musl-tar.zst) echo "$checksum_linux_arm64_musl_zstd" ;;
    linux-armv7-tar.zst) echo "$checksum_linux_armv7_zstd" ;;
    linux-armv7-musl-tar.zst) echo "$checksum_linux_armv7_musl_zstd" ;;
    macos-x64-tar.zst) echo "$checksum_macos_x86_64_zstd" ;;
    macos-arm64-tar.zst) echo "$checksum_macos_arm64_zstd" ;;
    linux-x64-tar.gz) echo "$checksum_linux_x86_64" ;;
    linux-x64-musl-tar.gz) echo "$checksum_linux_x86_64_musl" ;;
    linux-arm64-tar.gz) echo "$checksum_linux_arm64" ;;
    linux-arm64-musl-tar.gz) echo "$checksum_linux_arm64_musl" ;;
    linux-armv7-tar.gz) echo "$checksum_linux_armv7" ;;
    linux-armv7-musl-tar.gz) echo "$checksum_linux_armv7_musl" ;;
    macos-x64-tar.gz) echo "$checksum_macos_x86_64" ;;
    macos-arm64-tar.gz) echo "$checksum_macos_arm64" ;;
    *) warn "no checksum for $os-$arch" ;;
    esac
  else
    if command -v curl >/dev/null 2>&1; then
      debug ">" curl -fsSL "$url"
      checksums="$(curl --compressed -fsSL "$url")"
    else
      if command -v wget >/dev/null 2>&1; then
        debug ">" wget -qO - "$url"
        checksums="$(wget -qO - "$url")"
      else
        error "mise standalone install specific version requires curl or wget but neither is installed. Aborting."
      fi
    fi
    # TODO: verify with minisign or gpg if available

    checksum="$(echo "$checksums" | grep "$os-$arch.$ext")"
    if ! echo "$checksum" | grep -Eq "^([0-9a-f]{32}|[0-9a-f]{64})"; then
      warn "no checksum for mise $version and $os-$arch"
    else
      echo "$checksum"
    fi
  fi
}

#endregion

download_file() {
  url="$1"
  download_dir="$2"
  filename="$(basename "$url")"
  file="$download_dir/$filename"

  info "mise: installing mise..."

  if command -v curl >/dev/null 2>&1; then
    debug ">" curl -#fLo "$file" "$url"
    curl -#fLo "$file" "$url"
  else
    if command -v wget >/dev/null 2>&1; then
      debug ">" wget -qO "$file" "$url"
      stderr=$(mktemp)
      wget -O "$file" "$url" >"$stderr" 2>&1 || error "wget failed: $(cat "$stderr")"
      rm "$stderr"
    else
      error "mise standalone install requires curl or wget but neither is installed. Aborting."
    fi
  fi

  echo "$file"
}

install_mise() {
  version="${MISE_VERSION:-v2026.2.22}"
  version="${version#v}"
  os="${MISE_INSTALL_OS:-$(get_os)}"
  arch="${MISE_INSTALL_ARCH:-$(get_arch)}"
  ext="${MISE_INSTALL_EXT:-$(get_ext)}"
  install_path="${MISE_INSTALL_PATH:-$HOME/.local/bin/mise}"
  install_dir="$(dirname "$install_path")"
  install_from_github="${MISE_INSTALL_FROM_GITHUB:-}"
  if [ "$version" != "v2026.2.22" ] || [ "$install_from_github" = "1" ] || [ "$install_from_github" = "true" ]; then
    tarball_url="https://github.com/jdx/mise/releases/download/v${version}/mise-v${version}-${os}-${arch}.${ext}"
  elif [ -n "${MISE_TARBALL_URL-}" ]; then
    tarball_url="$MISE_TARBALL_URL"
  else
    tarball_url="https://mise.jdx.dev/v${version}/mise-v${version}-${os}-${arch}.${ext}"
  fi

  download_dir="$(mktemp -d)"
  cache_file=$(download_file "$tarball_url" "$download_dir")
  debug "mise-setup: tarball=$cache_file"

  debug "validating checksum"
  cd "$(dirname "$cache_file")" && get_checksum "$version" "$os" "$arch" "$ext" | "$(shasum_bin)" -c >/dev/null

  # extract tarball
  mkdir -p "$install_dir"
  rm -rf "$install_path"
  extract_dir="$(mktemp -d)"
  cd "$extract_dir"
  if [ "$ext" = "tar.zst" ] && ! tar_supports_zstd; then
    zstd -d -c "$cache_file" | tar -xf -
  else
    tar -xf "$cache_file"
  fi
  mv mise/bin/mise "$install_path"

  # cleanup
  cd / # Move out of $extract_dir before removing it
  rm -rf "$download_dir"
  rm -rf "$extract_dir"

  info "mise: installed successfully to $install_path"
}

after_finish_help() {
  case "${SHELL:-}" in
  */zsh)
    info "mise: run the following to activate mise in your shell:"
    info "echo \"eval \\\"\\\$($install_path activate zsh)\\\"\" >> \"${ZDOTDIR-$HOME}/.zshrc\""
    info ""
    info "mise: run \`mise doctor\` to verify this is set up correctly"
    ;;
  */bash)
    info "mise: run the following to activate mise in your shell:"
    info "echo \"eval \\\"\\\$($install_path activate bash)\\\"\" >> ~/.bashrc"
    info ""
    info "mise: run \`mise doctor\` to verify this is set up correctly"
    ;;
  */fish)
    info "mise: run the following to activate mise in your shell:"
    info "echo \"$install_path activate fish | source\" >> ~/.config/fish/config.fish"
    info ""
    info "mise: run \`mise doctor\` to verify this is set up correctly"
    ;;
  *)
    info "mise: run \`$install_path --help\` to get started"
    ;;
  esac
}

install_mise
if [ "${MISE_INSTALL_HELP-}" != 0 ]; then
  after_finish_help
fi
